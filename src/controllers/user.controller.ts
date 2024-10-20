/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from "express";
import { IUser } from "src/models/user.model";

import UserServices from "../services/user.services";

const UserController = {
  handleGetAllUsers: async (_: Request, res: Response): Promise<any> => {
    const users = await UserServices.getAllUsers();
    return res.status(200).json(users);
  },

  handleGetUserByEmail: async (req: Request, res: Response): Promise<any> => {
    const { email } = req.params;
    const user = await UserServices.getByEmail(email);
    return res.status(200).json(user);
  },

  handleCreateUser: async (req: Request, res: Response): Promise<any> => {
    const userData: IUser = req.body;
    const createdUser = await UserServices.createUser(userData);

    if (createdUser.errors) {
      return res.status(403).json({ message: createdUser.errors });
    }

    return res
      .status(201)
      .json({ data: createdUser, message: "User created successfully" });
  },

  handleDeleteUser: async (req: Request, res: Response): Promise<any> => {
    const { id } = req.params;
    await UserServices.deleteUser(id);
    return res.status(200).json({ message: "User deleted successfully" });
  },
};

export default UserController;
