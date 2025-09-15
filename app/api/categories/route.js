import mongoose from "mongoose";
import { connectionStr } from "../../../lib/db";
import { Category } from "../../../lib/model/Category";
import { NextResponse } from "next/server";


export async function POST(request) {
  try {
    const body = await request.json();
    const { categoryName, metaTitle, metaDescription, h1Title } = body;

    if (!categoryName || !metaTitle || !metaDescription || !h1Title) {
      return NextResponse.json(
        { success: false, error: "All fields are required" },
        { status: 400 }
      );
    }

    // ✅ connect to MongoDB
    await mongoose.connect(connectionStr);

    // ✅ create new category
    const category = new Category({
      categoryName,
      metaTitle,
      metaDescription,
      h1Title,
    });

    const savedCategory = await category.save();

    return NextResponse.json({ success: true, data: savedCategory });
  } catch (error) {
    console.error("Error creating category:", error);
    return NextResponse.json(
      { success: false, error: "Internal Server Error" },
      { status: 500 }
    );
  }
}


export async function GET() {
    try {
      await mongoose.connect(connectionStr);
      const categories = await Category.find().sort({ createdAt: -1 });
  
      return NextResponse.json({
        success: true,
        data: categories, // 👈 make sure it's "data"
      });
    } catch (error) {
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 500 }
      );
    }
  }