import type { Request, Response } from "express";
import { userService } from "./user.service";
import sendResponse from "../../utility/sendResponse";

// post method function here
const createUser = async (req: Request, res: Response) => {
  // console.log(req.body)
  // const { name, email, password, age } = req.body;

  try {
    const result = await userService.createUserIntoDB(req.body)
    // console.log(result)
    sendResponse(res, {
      statusCode: 201,
      success: true,
      message: "User Created Successfully!",
      data: result.rows[0],
    });
  } catch (error: any) {
    sendResponse(res, {
      statusCode: 500,
      success: false,
      message: error.message,
      error: error,
    })
  }
};

const getAllUsers = async (req: Request, res: Response) => {
  console.log(req.user)
  try {
    const result = await userService.getAllUsersFromDB()
    res.status(200).json({
      success: true,
      message: 'User Retrived Successfully',
      data: result.rows
    })
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      error: error
    })
  }
};

const getSingleUser = async (req: Request, res: Response) => {
  const { id } = req.params
  try {
    const result = await userService.getSingleUserFromDB(id as string)
    if (result.rows.length === 0) {
      res.status(404).json({
        success: false,
        message: 'User Not Found!',
        data: {}
      })
    }
    res.status(200).json({
      success: true,
      message: 'User Retrived Successfully',
      data: result.rows[0]
    })
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      error: error
    })
  }
};

const updateUser = async (req: Request, res: Response) => {
  const { id } = req.params
  //   const { name, password, age, is_active } = req.body
  // console.log("ID: ", id)
  // console.log(name, password, age, is_active)
  try {
    const result = await userService.updateUserFromDB(req.body, id as string)

    if (result.rows.length === 0) {
      res.status(404).json({
        success: false,
        message: 'User Not Found!'
      })
    }
    // console.log(result)
    res.status(200).json({
      success: true,
      message: 'User updated successfully',
      data: result.rows[0]
    })
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      error: error
    })
  }
};

const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params
  try {
    const result = await userService.deleteUserFromDB(id as string)
    if (result.rows.length === 0) {
      res.status(404).json({
        success: false,
        message: 'User Not Found!',
        data: {}
      })
    }
    res.status(200).json({
      success: true,
      message: 'User Deleted Successfully',
      data: {}
    })
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      error: error
    })
  }
}

export const userController = {
  createUser,
  getAllUsers,
  getSingleUser,
  updateUser,
  deleteUser
}

// we lost the world cup
// just a comment.
// working on assignment -3
// thanks to my floor mate.
// birthday finished.
// working
// learning.
// wasting time