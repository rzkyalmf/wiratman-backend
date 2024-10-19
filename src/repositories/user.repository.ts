import { IUser, User } from "../models/user.model";

const UserRepository = {
  getByEmail: async (email: string) => {
    return await User.findOne({ email });
  },

  create: async (userData: IUser) => {
    const newUser = new User(userData);
    console.log(newUser);

    return await newUser.save();
  },

  delete: async (id: string) => {
    return await User.findByIdAndDelete(id);
  },
};

export default UserRepository;
