import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { connectionStr } from "@/lib/db";
import { User } from "@/lib/model/User";

export async function GET() {
  try {
    await mongoose.connect(connectionStr);

    // find start of week (Monday 00:00)
    const today = new Date();
    const firstDayOfWeek = new Date(today.setDate(today.getDate() - today.getDay() + 1)); 
    firstDayOfWeek.setHours(0, 0, 0, 0);

    // find users created after start of week
    const users = await User.aggregate([
      {
        $match: {
          createdAt: { $gte: firstDayOfWeek },
        },
      },
      {
        $group: {
          _id: { $dayOfWeek: "$createdAt" }, // group by day
          count: { $sum: 1 },
        },
      },
    ]);

    return NextResponse.json({ success: true, data: users });
  } catch (err) {
    return NextResponse.json({ success: false, message: err.message });
  }
}
