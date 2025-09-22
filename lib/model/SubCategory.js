
import mongoose from "mongoose";

const subCategorySchema = new mongoose.Schema({
  subCategoryName: { type: String, required: true },
  category: { type: mongoose.Schema.Types.ObjectId, ref: "Category", required: true },
  metaTitle: String,
  metaDescription: String,
  h1Title: String,
  
},

{timestamps:true});

export const SubCategory =
  mongoose.models.SubCategory || mongoose.model("SubCategory", subCategorySchema);

  
