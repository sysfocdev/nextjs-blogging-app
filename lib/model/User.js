import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    fName: { type: String, required: true },
    lName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profileImg: { type: String , default:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8BSDMyxsc8n91H1uoyEn9gpZLhzWGelzhUA&s" },
    country: { type: String, required: true },
    role: { type: String, enum: ["admin", "user"], default: "user" },
    verified: {type:Boolean, default:false}
  },
  { timestamps: true }
);

export const User = mongoose.models.users || mongoose.model("users", userSchema);
