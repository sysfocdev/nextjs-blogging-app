import mongoose from "mongoose";
import { connectionStr } from "../../../../lib/db";
import { Blog } from "../../../../lib/model/blog";
import { NextResponse } from "next/server";


export async function PUT(request, {params}){
   
        const blogId= params.id;
        const filter= {_id:blogId};
      const  payload= await request.json()
        await mongoose.connect(connectionStr)
        const result= await Blog.findOneAndUpdate(filter, payload)
        return NextResponse.json({result, success:true})
}



export async function GET(request, ctx) {
  try {
    // ✅ unwrap params
    const { id } = await ctx.params;

    await mongoose.connect(connectionStr);
    const result = await Blog.findOne({ _id: id });

    if (!result) {
      return NextResponse.json({ success: false, message: "Blog not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, result });
  } catch (err) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const blogId = params.id; // ✅ correct
    await mongoose.connect(connectionStr);

    const result = await Blog.findOneAndDelete({ _id: blogId }); // ✅ filter only

    if (!result) {
      return NextResponse.json(
        { success: false, message: "Blog not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Blog deleted successfully",
      result,
    });
  } catch (error) {
    console.error("Delete category error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to delete category", error: error.message },
      { status: 500 }
    );
  }
}