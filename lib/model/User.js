import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    fName: { type: String, required: true },
    lName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profileImg: {
      type: String,
    },
    country: { type: String, required: true },
    role: { type: String, enum: ["admin", "user"], default: "user" },
    verified: { type: Boolean, default: false },
  },
  { timestamps: true }
);

// 👇 yahan hash kar rahe hain password ko save hone se pehle
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next(); // agar password change nahi hua to skip karo
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

export const User =
  mongoose.models.users || mongoose.model("users", userSchema);
