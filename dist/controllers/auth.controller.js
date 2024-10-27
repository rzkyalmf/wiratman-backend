"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth_services_1 = __importDefault(require("../services/auth.services"));
const AuthController = {
    handleGetAllUsers: (_, res) => __awaiter(void 0, void 0, void 0, function* () {
        const users = yield auth_services_1.default.getAllUsers();
        res.status(200).json(users);
        return;
    }),
    handleGetUserByEmail: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { email } = req.params;
        const user = yield auth_services_1.default.getByEmail(email);
        res.status(200).json(user);
        return;
    }),
    handleCreateUser: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const userData = req.body;
        const createdUser = yield auth_services_1.default.createUser(userData);
        if (createdUser.errors) {
            res.status(403).json({ message: createdUser.errors });
            return;
        }
        res
            .status(201)
            .json({ data: createdUser, message: "User created successfully" });
        return;
    }),
    handleDeleteUser: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { id } = req.params;
        yield auth_services_1.default.deleteUser(id);
        res.status(200).json({ message: "User deleted successfully" });
        return;
    }),
    handleLoginUser: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { email, password } = req.body;
        const data = yield auth_services_1.default.loginUser({ email, password });
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
    }),
    handleProtectedRoute: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        // Gunakan Cookie Parser supaya bisa menerima token dari cookie langsung
        const token = req.cookies.token;
        if (!token) {
            res.status(401).json({ message: "Unauthorized" });
            return;
        }
        try {
            const data = yield auth_services_1.default.protectRoute(token);
            res.status(200).json(data);
            return;
        }
        catch (error) {
            res.status(401).json({ message: "Invalid Token", error: error });
            return;
        }
    }),
};
exports.default = AuthController;
