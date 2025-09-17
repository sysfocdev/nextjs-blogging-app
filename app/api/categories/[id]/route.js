import mongoose from "mongoose";
import { connectionStr } from "@/lib/db";
import { Category } from "../../../../lib/model/Category";
import { NextResponse } from "next/server";

export async function DELETE(request, { params }) {
  try {
    const catId = params.id; // ✅ correct
    await mongoose.connect(connectionStr);

    const result = await Category.findOneAndDelete({ _id: catId }); // ✅ filter only

    if (!result) {
      return NextResponse.json(
        { success: false, message: "Category not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Category deleted successfully",
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
export async function PUT(request, {params}){
   
  const catId= params.id;
  const filter= {_id:catId};
const  payload= await request.json()
  await mongoose.connect(connectionStr)
  const result= await Category.findOneAndUpdate(filter, payload)
  return NextResponse.json({result, success:true})
}

export async function GET(request, { params }) {
  try {
    const catId = params.id;

    // connect DB
    await mongoose.connect(connectionStr);

    // fetch category
    const result = await Category.findById(catId);

    if (!result) {
      return NextResponse.json(
        { success: false, error: "Category not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, category: result });
  } catch (error) {
    console.error("GET /categories/[id] error:", error);
    return NextResponse.json(
      { success: false, error: "Server error while fetching category" },
      { status: 500 }
    );
  }
}