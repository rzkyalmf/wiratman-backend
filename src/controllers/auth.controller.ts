import { Request, Response } from "express";
// import jwt from "jsonwebtoken";
import { IUser } from "src/models/user.model";

import AuthServices from "../services/auth.services";

const AuthController = {
  handleGetAllUsers: async (req: Request, res: Response) => {
    const users = await AuthServices.getAllUsers();
    const headers = req.headers;

    console.log(headers);

    res.status(200).json(users);
    return;
  },

  handleGetUserByEmail: async (req: Request, res: Response) => {
    const { email } = req.params;
    const user = await AuthServices.getByEmail(email);

    res.status(200).json(user);
    return;
  },

  handleCreateUser: async (req: Request, res: Response) => {
    const userData: IUser = req.body;
    const createdUser = await AuthServices.createUser(userData);

    if (createdUser.errors) {
      res.status(403).json({ message: createdUser.errors });
      return;
    }

    res
      .status(201)
      .json({ data: createdUser, message: "User created successfully" });
    return;
  },

  handleDeleteUser: async (req: Request, res: Response) => {
    const { id } = req.params;
    await AuthServices.deleteUser(id);

    res.status(200).json({ message: "User deleted successfully" });
    return;
  },

  handleLoginUser: async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const data = await AuthServices.loginUser({ email, password });

    if (data.status === "error") {
      res.status(403).json({ message: data.message });
      return;
    }

    const token = data.token;

    res
      .cookie("token", token, { httpOnly: true })
      .status(200)
      .json({ message: "User login successfully", token });
    return;
  },

  handleProtectedRoute: async (req: Request, res: Response) => {
    // Gunakan Cookie Parser supaya bisa menerima token dari cookie langsung
    const token = req.cookies.token;

    if (!token) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    try {
      const data = await AuthServices.protectRoute(token);
      res.status(200).json(data);
      return;
    } catch (error) {
      res.status(401).json({ message: "Invalid Token", error: error });
      return;
    }
  },
};

export default AuthController;
