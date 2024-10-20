import bcrypt from "bcrypt";
import z from "zod";

import { IUser } from "../models/user.model";
import UserRepository from "../repositories/user.repository";

const UserSchema = z.object({
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

const UserServices = {
  getAllUsers: async () => {
    return await UserRepository.getAll();
  },

  getByEmail: async (email: string): Promise<IUser | null> => {
    return await UserRepository.getByEmail(email);
  },

  createUser: async (userData: IUser) => {
    const dataValidated = UserSchema.safeParse(userData);

    if (!dataValidated.success) {
      return {
        status: "error",
        errors: dataValidated.error?.flatten().fieldErrors,
      };
    }

    const existedUser = await UserRepository.getByEmail(userData.email);

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
};

export default UserServices;
