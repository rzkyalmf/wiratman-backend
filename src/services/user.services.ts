import { IUser } from "../models/user.model";
import UserRepository from "../repositories/user.repository";

const UserServices = {
  getByEmail: async (email: string) => {
    return await UserRepository.getByEmail(email);
  },

  createUser: async (userData: IUser) => {
    return await UserRepository.create(userData);
  },

  deleteUser: async (id: string) => {
    return await UserRepository.delete(id);
  },
};

export default UserServices;
