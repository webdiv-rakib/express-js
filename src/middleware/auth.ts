import type { NextFunction, Request, Response } from "express";
import jwt, { type JwtPayload } from "jsonwebtoken"
import config from "../config";
import { pool } from "../db";
import type { ROLES } from "../types";

const auth = (...roles: ROLES[]) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        // console.log(roles);
        try {
            // console.log('This is Protected Route')
            // console.log(req.headers.authorization)

            // 1. check if the token exists
            const token = req.headers.authorization;
            // console.log(token)
            if (!token) {
                res.status(401).json({
                    success: false,
                    message: 'Unauthorized Access!',
                });
            };

            // 2. verify the token
            const decoded = jwt.verify(token as string, config.secret as string) as JwtPayload;
            // console.log(decoded);

            // 3. find the user into database
            const userData = await pool.query(`
            SELECT * FROM users WHERE email = $1
            `, [decoded.email]);
            // console.log(userData)
            const user = userData.rows[0];
            // console.log(user)

            // 4.if the user active or not
            if (userData.rows.length === 0) {
                res.status(404).json({
                    success: false,
                    message: 'User Not Found',
                });
            };

            if (!user.is_active) {
                res.status(403).json({
                    success: false,
                    message: 'Forbidden',
                });
            };

            // console.log("Auth Role: ", user.role);
            // roles = ['admin','agent']
            // user.role = 'admin' | 'user' | 'agent'
            if (roles.length && !roles.includes(user.role)) {
                res.status(403).json({
                    success: false,
                    message: 'Forbidden!, This role has no access',
                });
            }
            req.user = decoded
            next();
        } catch (error) {
            next(error)
        }
    }
}
export default auth;