import mongoose from "mongoose";
import { connectionStr } from "../../../../lib/db";
import { User } from "../../../../lib/model/User";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function DELETE(request, { params }) {
  const userId = params.id;
  const record = { _id: userId };
  await mongoose.connect(connectionStr);
  const result = await User.deleteOne(record);
  return NextResponse.json({ result, success: true });
}

export async function PUT(request, { params }) {
  try {
    const userId = params.id;
    const filter = { _id: userId };

    const payload = await request.json();
    await mongoose.connect(connectionStr);

    // ✅ Agar payload me password hai to usse hash karo
    if (payload.password && payload.password.trim() !== "") {
      const hashedPassword = await bcrypt.hash(payload.password, 10);
      payload.password = hashedPassword;
    } else {
      // agar password empty aya hai to usse update na karo
      delete payload.password;
    }

    const result = await User.findOneAndUpdate(filter, payload, {
      new: true, // updated doc return hoga
    });

    return NextResponse.json({ result, success: true });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message });
  }
}

export async function GET(request, { params }) {
  const userId = params.id;
  await mongoose.connect(connectionStr);
  const result = await User.findById(userId);
  return NextResponse.json({ result, success: true });
}
