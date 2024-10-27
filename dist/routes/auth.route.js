"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_controller_1 = __importDefault(require("../controllers/auth.controller"));
const AuthRouter = express_1.default.Router();
AuthRouter.get("/", auth_controller_1.default.handleGetAllUsers);
AuthRouter.post("/create", auth_controller_1.default.handleCreateUser);
AuthRouter.delete("/delete/:id", auth_controller_1.default.handleDeleteUser);
AuthRouter.post("/login", auth_controller_1.default.handleLoginUser);
AuthRouter.get("/protected", auth_controller_1.default.handleProtectedRoute);
AuthRouter.get("/:email", auth_controller_1.default.handleGetUserByEmail);
exports.default = AuthRouter;
