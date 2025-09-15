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
