import express from "express";

import AuthController from "../controllers/auth.controller";

const AuthRouter = express.Router();

// Users
AuthRouter.get("/users", AuthController.handleGetAllUsers);
AuthRouter.get("/users/:email", AuthController.handleGetUserByEmail);
AuthRouter.post("/users", AuthController.handleCreateUser);
AuthRouter.delete("/users/:id", AuthController.handleDeleteUser);

// Authentication
AuthRouter.post("/login", AuthController.handleLoginUser);

// Authorization
AuthRouter.get("/me", AuthController.handleProtectedRoute);

export default AuthRouter;
