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

export async function GET(request, {params}){
    const blogId= params.id;
    const filter = {_id: blogId}
    await mongoose.connect(connectionStr);
    const result= await Blog.findOne(filter);
    return NextResponse.json({result, success: true })
}