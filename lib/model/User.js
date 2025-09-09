import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    fName: { type: String, required: true },
    lName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profileImg: { type: String },
    country: { type: String, required: true },
    role: { type: String, enum: ["admin", "user"], default: "user" },
  },
  { timestamps: true }
);

export const User = mongoose.models.users || mongoose.model("users", userSchema);
