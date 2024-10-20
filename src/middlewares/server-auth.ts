import { NextFunction, Request, Response } from "express";

async function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const { token } = req.cookies;

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  next();
}

export default authMiddleware;
