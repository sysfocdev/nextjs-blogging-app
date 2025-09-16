import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import { connectionStr } from "../../../../lib/db";
import { User } from "../../../../lib/model/User";
import { cookies } from "next/headers";

const JWT_SECRET = process.env.JWT_SECRET || "your_secret_key"; // ⚠️ put this in .env.local

export async function POST(req) {
  try {
    await mongoose.connect(connectionStr);
    const { email, password } = await req.json();

    // find user
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ success: false, message: "User not found" });
    }

    // compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json({ success: false, message: "Invalid password" });
    }

    // ✅ Generate JWT
    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: "1d" }
    );

    // ✅ Clear old "auth" cookie if exists
    const cookieStore = cookies();
    cookieStore.delete("auth");   // 🔥 remove old cookie

    // ✅ Set only "auth_token"
    cookieStore.set("auth_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 24, // 1 day
    });

    return NextResponse.json({
      success: true,
      message: "Login successful",
      user: {
        id: user._id,
        email: user.email,
        role: user.role,
        fName: user.fName,
        profileImg: user.profileImg,
      },
    });
  } catch (err) {
    return NextResponse.json({ success: false, message: err.message });
  }
}
