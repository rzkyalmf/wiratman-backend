import express from "express";

import AuthController from "../controllers/auth.controller";

const AuthRouter = express.Router();

AuthRouter.get("/", AuthController.handleGetAllUsers);
AuthRouter.post("/create", AuthController.handleCreateUser);
AuthRouter.delete("/delete/:id", AuthController.handleDeleteUser);
AuthRouter.post("/login", AuthController.handleLoginUser);
AuthRouter.get("/protected", AuthController.handleProtectedRoute);

AuthRouter.get("/:email", AuthController.handleGetUserByEmail);

export default AuthRouter;
