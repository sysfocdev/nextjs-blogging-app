import mongoose from "mongoose";
import { connectionStr } from "../../../../lib/db";
import { User } from "../../../../lib/model/User";
import { NextResponse } from "next/server";

export async function DELETE(request, {params}){
    const userId= params.id;
    const record= {_id: userId};
    await mongoose.connect(connectionStr);
    const result= await User.deleteOne(record);
    return NextResponse.json({result, success: true}) 
}
export async function PUT(request, {params}){
    const userId = params.id;
    const filter = {_id: userId}
   
    const payload= await request.json()
    await mongoose.connect(connectionStr)
    const result= await User.findOneAndUpdate(filter, payload);
    return NextResponse.json({result , success:true})

}
export async function GET(request, {params}){
    const userId =params.id;
    const filter = {_id: userId}
    await mongoose.connect(connectionStr)
    const result= await User.findById(filter);
    return NextResponse.json({result , success:true})

}