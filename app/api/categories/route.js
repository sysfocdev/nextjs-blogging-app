import mongoose from "mongoose";
import { NextResponse } from "next/server";
import { connectionStr } from "../../../lib/db";
import { Category } from "../../../lib/model/Category";


export async function POST(request) {
  try {
    const body = await request.json();
    const { categoryName, metaTitle, metaDescription, h1Title, user } = body;

    // ✅ Check if user is admin
    if (!user || user.role !== "admin") {
      return NextResponse.json(
        { success: false, error: "Unauthorized. Admins only." },
        { status: 403 }
      );
    }

    await mongoose.connect(connectionStr);

    const category = new Category({
      categoryName,
      metaTitle,
      metaDescription,
      h1Title,
    });

    const savedCategory = await category.save();

    return NextResponse.json({ success: true, data: savedCategory });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

export async function GET() {
    try {
      await mongoose.connect(connectionStr);
      const categories = await Category.find().sort({ createdAt: -1 });
  
      return NextResponse.json({ success: true, categories });
    } catch (err) {
      return NextResponse.json({ success: false, error: err.message });
    }
  }
  