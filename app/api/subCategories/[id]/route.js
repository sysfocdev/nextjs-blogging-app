import mongoose from "mongoose";
import { connectionStr } from "../../../../lib/db";

import { NextResponse } from "next/server";

import { SubCategory } from '@/lib/model/SubCategory';


export async function DELETE(request, { params }) {
  try {
    const catId = params.id; // ✅ correct
    await mongoose.connect(connectionStr);

    const result = await SubCategory.findOneAndDelete({ _id: catId }); // ✅ filter only

    if (!result) {
      return NextResponse.json(
        { success: false, message: "Sub Category not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, message: "Sub Category deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Error deleting subcategory", error: error.message },
      { status: 500 }
    );
  }
}

export async function PUT(request, {params}){
   
  const catId= params.id;
  const filter= {_id:catId};
const  payload= await request.json()
  await mongoose.connect(connectionStr)
  const result= await SubCategory.findOneAndUpdate(filter, payload)
  return NextResponse.json({result, success:true})
}

export async function GET(request, { params }) {
  try {
    const catId = params.id;

    // connect DB
    await mongoose.connect(connectionStr);

    // fetch category
    const result = await SubCategory.findById(catId);

    if (!result) {
      return NextResponse.json(
        { success: false, error: "Sub Category not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, category: result });
  } catch (error) {
    console.error("GET /subcategories/[id] error:", error);
    return NextResponse.json(
      { success: false, error: "Server error while fetching sub category" },
      { status: 500 }
    );
  }
}