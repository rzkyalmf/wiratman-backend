import { IUser, User } from "../models/user.model";

const UserRepository = {
  getAll: async () => {
    return await User.find();
  },

  getByEmail: async (email: string) => {
    return await User.findOne({ email });
  },

  create: async (userData: IUser) => {
    const user = new User(userData);
    const newUser = await user.save();

    return newUser;
  },

  delete: async (id: string) => {
    return await User.findByIdAndDelete(id);
  },
};

export default UserRepository;
