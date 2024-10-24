import express from "express";

import ProtectedController from "../controllers/authz.controller";

const AuthzRouter = express.Router();

AuthzRouter.get("/", ProtectedController.handleProtectedRoute);

export default AuthzRouter;
