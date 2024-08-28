import mongoose, { Document, Schema } from "mongoose";

interface IUser extends Document {
  email: string;
  password: string;
  favorites: string[];
  history: string[];
}

const userSchema = new Schema<IUser>({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  favorites: [{ type: String }],
  history: [{ type: String }],
});

const User = mongoose.model<IUser>("User", userSchema);
export default User;
