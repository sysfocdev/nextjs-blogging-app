import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import { connectionStr } from "../../../../lib/db";
import { User } from "../../../../lib/model/User";
import { cookies } from "next/headers";  // ✅ import here

export async function POST(req) {
  try {
    await mongoose.connect(connectionStr);
    const { email, password ,  } = await req.json();

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

    // ✅ get cookie store
    const cookieStore = cookies();
cookieStore.set("auth", JSON.stringify({
  id: user._id,
  email: user.email,
  role: user.role,
  

}), {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "strict",
  path: "/",
  maxAge: 60 * 60 * 24, // 1 day
});

    return NextResponse.json({
      success: true,
      message: "Login successful",
      user: { id: user._id, email: user.email, role: user.role, fName: user.fName,  profileImg: user.profileImg },
    });
  } catch (err) {
    return NextResponse.json({ success: false, message: err.message });
  }
}
