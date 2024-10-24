import { Request, Response } from "express";

import AuthServices from "../services/auth.services";

const ProtectedController = {
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

export default ProtectedController;
