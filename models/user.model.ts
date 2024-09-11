import mongoose from "mongoose";

interface UserType {
  name: string;
  email: string;
  password: string;
  limit: number;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new mongoose.Schema<UserType>({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  limit: { type: Number, default: 10000 },
});

const User = mongoose.model<UserType>("User", userSchema);
export default User;
