// app/api/subcategories/route.js
import mongoose from "mongoose";
import { NextResponse } from "next/server";
import { connectionStr } from "@/lib/db";
import { Category } from "@/lib/model/Category";

export async function GET() {
  try {
    await mongoose.connect(connectionStr);

    // ✅ Sirf subcategories get karo (jinke parent null nahi hai)
    const subcategories = await Category.find({ parent: { $ne: null } })
      .populate("parent", "categoryName") // 👈 parent category ka naam bhi lao
      .sort({ createdAt: -1 });

    return NextResponse.json({ success: true, subcategories });
  } catch (err) {
    return NextResponse.json({ success: false, error: err.message });
  }
}
