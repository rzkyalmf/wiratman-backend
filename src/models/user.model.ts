import { model, Schema } from "mongoose";

export interface IUser {
  name: string;
  email: string;
  password: string;
}

// Schema untuk User
const UserSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

export const User = model<IUser>("User", UserSchema);
