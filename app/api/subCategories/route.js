import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { connectionStr } from "@/lib/db";
import { SubCategory } from "@/lib/model/SubCategory";
import { Category } from "@/lib/model/Category"; // ✅ import Category

export async function GET(req) {
  try {
    await mongoose.connect(connectionStr);

    const { searchParams } = new URL(req.url);
    const categoryId = searchParams.get("categoryId");

    const filter = categoryId ? { category: categoryId } : {};
    const subcategories = await SubCategory.find(filter).populate("category");

    return NextResponse.json({ success: true, subcategories });
  } catch (err) {
    return NextResponse.json({ success: false, error: err.message });
  }
}


// POST new subcategory
export async function POST(req) {
    try {
      await mongoose.connect(connectionStr);
      const body = await req.json();
  
      // Create subcategory with all required fields
      const sub = new SubCategory({
        category: body.category,
        subCategoryName: body.subCategoryName,
        metaTitle: body.metaTitle,
        metaDescription: body.metaDescription,
        h1Title: body.h1Title,
      });
  
      await sub.save();
  
      return NextResponse.json({ success: true, subcategory: sub });
    } catch (err) {
      return NextResponse.json({ success: false, error: err.message });
    }
  }
