import mongoose from "mongoose";
import { connectionStr } from "../../../lib/db";
import { Blog } from "../../../lib/model/blog";
import { NextResponse } from "next/server";


export async function POST(request) {
  try {
    await mongoose.connect(connectionStr);

    const body = await request.json();

    // convert tags string -> array if provided
    const tagsArray =
      typeof body.tags === "string"
        ? body.tags.split(",").map((t) => t.trim())
        : [];

    const newBlog = new Blog({
      title: body.title,
      slug: body.slug,
      content: body.content,
      category: body.category,
      subcategory: body.subcategory && body.subcategory !== "" ? body.subcategory : null, // 👈 fix   // 👈 add this
      tags: tagsArray,
      coverImg: body.coverImg,
      isPublished: body.isPublished,
      author: body.author,
    });

    await newBlog.save();

    return NextResponse.json({ success: true, blog: newBlog });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message });
  }
}

export async function GET() {
    try {
      await mongoose.connect(connectionStr);
      const blogs = await Blog.find().sort({ createdAt: -1 });
      return NextResponse.json({ success: true, blogs });
    } catch (error) {
      return NextResponse.json({ success: false, error: error.message });
    }
  }
  