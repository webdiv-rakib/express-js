import { Router } from "express";
import { userController } from "./user.controller";
import auth from "../../middleware/auth";
import { USER_ROLE } from "../../types";

const router = Router();

// post method
router.post('/', userController.createUser);
// get method (to get all the data at a time)
router.get('/', auth(USER_ROLE.admin, USER_ROLE.agent,USER_ROLE.user), userController.getAllUsers);
// get method (specific id matched data shows)
router.get('/:id', userController.getSingleUser);
// put method
router.put('/:id', userController.updateUser);
// delete method
router.delete('/:id', userController.deleteUser)

export const userRoute = router;