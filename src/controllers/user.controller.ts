import { Request, Response } from "express";

import UserServices from "../services/user.services";

const UserController = {
  handleGetUserByEmail: async (req: Request, res: Response) => {
    const { email } = req.body;
    const user = await UserServices.getByEmail(email);
    return res.status(200).json(user);
  },

  handleCreateUser: async (req: Request, res: Response) => {
    const userData = req.body;
    const createdUser = await UserServices.createUser(userData);
    return res
      .status(201)
      .json({ data: createdUser, message: "User created successfully" });
  },

  handleDeleteUser: async (req: Request, res: Response) => {
    const { id } = req.params;
    await UserServices.deleteUser(id);
    return res.status(200).json({ message: "User deleted successfully" });
  },
};

export default UserController;
