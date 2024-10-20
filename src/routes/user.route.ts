import express from "express";

import UserController from "../controllers/user.controller";

const UserRouter = express.Router();

UserRouter.get("/", UserController.handleGetAllUsers);
UserRouter.post("/create", UserController.handleCreateUser);
UserRouter.get("/:email", UserController.handleGetUserByEmail);
UserRouter.delete("/delete/:id", UserController.handleDeleteUser);

export default UserRouter;
