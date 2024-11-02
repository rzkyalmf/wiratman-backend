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
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const zod_1 = __importDefault(require("zod"));
const user_repository_1 = __importDefault(require("../repositories/user.repository"));
const CreateUserSchema = zod_1.default.object({
    name: zod_1.default
        .string()
        .min(3, { message: "Nama terlalu pendek" })
        .max(16, { message: "Nama terlalu panjang" })
        .regex(/^[a-zA-Z ]+$/),
    email: zod_1.default.string().email({ message: "Email tidak valid" }),
    password: zod_1.default
        .string()
        .min(6, { message: "Password terlalu pendek" })
        .max(24, { message: "Password terlalu panjang" }),
});
const LoginUserSchema = zod_1.default.object({
    email: zod_1.default.string().email({ message: "Email tidak valid" }),
    password: zod_1.default.string(),
});
const AuthServices = {
    getAllUsers: () => __awaiter(void 0, void 0, void 0, function* () {
        return yield user_repository_1.default.getAll();
    }),
    getByEmail: (email) => __awaiter(void 0, void 0, void 0, function* () {
        return yield user_repository_1.default.getByEmail(email);
    }),
    createUser: (userData) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        const dataValidated = CreateUserSchema.safeParse(userData);
        if (!dataValidated.success) {
            return {
                status: "error",
                errors: (_a = dataValidated.error) === null || _a === void 0 ? void 0 : _a.flatten().fieldErrors,
            };
        }
        const existedUser = yield user_repository_1.default.getByEmail(dataValidated.data.email);
        if (dataValidated.data.email === (existedUser === null || existedUser === void 0 ? void 0 : existedUser.email)) {
            return {
                status: "error",
                errors: "User already exists",
            };
        }
        const hashedPassword = yield bcrypt_1.default.hash(dataValidated.data.password, 13);
        const newUser = yield user_repository_1.default.create({
            name: dataValidated.data.name,
            email: dataValidated.data.email,
            password: hashedPassword,
        });
        return newUser;
    }),
    deleteUser: (id) => __awaiter(void 0, void 0, void 0, function* () {
        return yield user_repository_1.default.delete(id);
    }),
    loginUser: (data) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        const dataValidated = LoginUserSchema.safeParse(data);
        if (!dataValidated.success) {
            return {
                status: "error",
                errors: (_a = dataValidated.error) === null || _a === void 0 ? void 0 : _a.flatten().fieldErrors,
                message: dataValidated.error.issues[0].message,
            };
        }
        const user = yield user_repository_1.default.getByEmail(dataValidated.data.email);
        if (!user) {
            return {
                status: "error",
                message: "User not found",
            };
        }
        const isMatch = yield bcrypt_1.default.compare(dataValidated.data.password, user.password);
        if (!isMatch) {
            return {
                status: "error",
                message: "Wrong password",
            };
        }
        const payload = {
            id: user._id,
            name: user.name,
            email: user.email,
        };
        const token = jsonwebtoken_1.default.sign(payload, process.env.JWT_SECRET, {
            expiresIn: "1d",
        });
        // console.log(token);
        return { user, token };
    }),
    protectRoute: (token) => __awaiter(void 0, void 0, void 0, function* () {
        const decode = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        return decode;
    }),
};
exports.default = AuthServices;
