import express from "express";

import UserController from "../controllers/user.controller";

const UserRouter = express.Router();

UserRouter.get("/", UserController.handleGetUserByEmail);
UserRouter.post("/", UserController.handleCreateUser);
UserRouter.delete("/:id", UserController.handleDeleteUser);

export default UserRouter;
