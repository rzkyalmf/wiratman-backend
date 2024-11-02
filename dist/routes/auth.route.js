"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_controller_1 = __importDefault(require("../controllers/auth.controller"));
const AuthRouter = express_1.default.Router();
// Users
AuthRouter.get("/users", auth_controller_1.default.handleGetAllUsers);
AuthRouter.get("/users/:email", auth_controller_1.default.handleGetUserByEmail);
AuthRouter.post("/users", auth_controller_1.default.handleCreateUser);
AuthRouter.delete("/users/:id", auth_controller_1.default.handleDeleteUser);
// Authentication
AuthRouter.post("/login", auth_controller_1.default.handleLoginUser);
// Authorization
AuthRouter.get("/me", auth_controller_1.default.handleProtectedRoute);
exports.default = AuthRouter;
