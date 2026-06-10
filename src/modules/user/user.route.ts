import { Router } from "express";
import { userController } from "./user.controller";

const router = Router();

// post method
router.post('/', userController.createUser)

export const userRoute = router;