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
