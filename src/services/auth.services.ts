import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import z from "zod";

import { IUser } from "../models/user.model";
import UserRepository from "../repositories/user.repository";

const CreateUserSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Nama terlalu pendek" })
    .max(16, { message: "Nama terlalu panjang" })
    .regex(/^[a-zA-Z ]+$/),
  email: z.string().email({ message: "Email tidak valid" }),
  password: z
    .string()
    .min(6, { message: "Password terlalu pendek" })
    .max(24, { message: "Password terlalu panjang" }),
});

const LoginUserSchema = z.object({
  email: z.string().email({ message: "Email tidak valid" }),
  password: z.string(),
});

const AuthServices = {
  getAllUsers: async () => {
    return await UserRepository.getAll();
  },

  getByEmail: async (email: string): Promise<IUser | null> => {
    return await UserRepository.getByEmail(email);
  },

  createUser: async (userData: IUser) => {
    const dataValidated = CreateUserSchema.safeParse(userData);

    if (!dataValidated.success) {
      return {
        status: "error",
        errors: dataValidated.error?.flatten().fieldErrors,
      };
    }

    const existedUser = await UserRepository.getByEmail(
      dataValidated.data.email
    );

    if (dataValidated.data.email === existedUser?.email) {
      return {
        status: "error",
        errors: "User already exists",
      };
    }

    const hashedPassword = await bcrypt.hash(dataValidated.data.password, 13);
    const newUser = await UserRepository.create({
      name: dataValidated.data.name,
      email: dataValidated.data.email,
      password: hashedPassword,
    });

    return newUser;
  },

  deleteUser: async (id: string) => {
    return await UserRepository.delete(id);
  },

  loginUser: async (data: { email: string; password: string }) => {
    const dataValidated = LoginUserSchema.safeParse(data);

    if (!dataValidated.success) {
      return {
        status: "error",
        errors: dataValidated.error?.flatten().fieldErrors,
        message: dataValidated.error.issues[0].message,
      };
    }

    const user = await UserRepository.getByEmail(dataValidated.data.email);

    if (!user) {
      return {
        status: "error",
        message: "User not found",
      };
    }

    const isMatch = await bcrypt.compare(
      dataValidated.data.password,
      user.password
    );

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

    const token = jwt.sign(payload, process.env.JWT_SECRET as string, {
      expiresIn: "1d",
    });

    // console.log(token);

    return { user, token };
  },

  protectRoute: async (token: string) => {
    const decode = jwt.verify(token, process.env.JWT_SECRET as string);

    return decode;
  },
};

export default AuthServices;
