import mongoose from "mongoose";

const subCategorySchema = new mongoose.Schema({
  subCategoryName: { type: String, required: true },
  category: { type: mongoose.Schema.Types.ObjectId, ref: "Category", required: true },
  metaTitle: String,
  metaDescription: String,
  h1Title: String,
});

export const SubCategory =
  mongoose.models.subcategories || mongoose.model("subcategories", subCategorySchema);

  
