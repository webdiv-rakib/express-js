import dotenv from 'dotenv'
import path from 'path'
dotenv.config({
    path: path.join(process.cwd(), '.env')
})

const config = {
    connection_String: process.env.CONNECTIONSTRING as string,
    port: process.env.PORT,
    secret: process.env.JWT_SECRET,
    refresh_token: process.env.JWT_REFRESH_SECRET,
    expiresIn: process.env.JWT_EXPIRES_IN
};

export default config;