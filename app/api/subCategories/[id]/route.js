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
