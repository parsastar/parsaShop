import { Schema, model, models } from "mongoose";
import { IUser } from "src/types/users/TUser";

// create schema for user model
const userSchema = new Schema<IUser>(
  {
    role: {
      type: String,
      enum: ["USER", "ADMIN"],
      default: "USER",
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      unique: true,
      required: true,
    },
    pocket: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const User = models.User || model<IUser>("User", userSchema);

export default User;
