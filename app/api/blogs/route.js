import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { connectionStr } from "@/lib/db";

// ✅ Import models so Mongoose registers them
import { Blog } from "@/lib/model/Blog";
import { Category } from "@/lib/model/Category";
import { SubCategory } from "@/lib/model/SubCategory";

// ====== CREATE NEW BLOG ======
export async function POST(request) {
  try {
    await mongoose.connect(connectionStr);

    const body = await request.json();

    const tagsArray =
      typeof body.tags === "string"
        ? body.tags.split(",").map((t) => t.trim())
        : [];

    const newBlog = new Blog({
      title: body.title,
      slug: body.slug,
      content: body.content,
      category: body.category,
      subcategory: body.subcategory || null,
      tags: tagsArray,
      coverImg: body.coverImg,
      isPublished: body.isPublished,
      author: body.author,
    });

    await newBlog.save();

    return NextResponse.json({ success: true, blog: newBlog });
  } catch (error) {
    console.error("POST /api/blogs error:", error);
    return NextResponse.json({ success: false, error: error.message });
  }
}

// ====== GET ALL BLOGS ======
export async function GET() {
  try {
    await mongoose.connect(connectionStr);

    const blogs = await Blog.find()
      .populate("category")      // ✅ works now, Category is registered
      .populate("subcategory")   // ✅ works now, SubCategory is registered
      .sort({ createdAt: -1 });

    return NextResponse.json({ success: true, blogs });
  } catch (error) {
    console.error("GET /api/blogs error:", error);
    return NextResponse.json({ success: false, error: error.message });
  }
}
