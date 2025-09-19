import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    categoryName: {
      type: String,
      required: true,
      trim: true,
      unique: true
    },
    metaTitle: {
      type: String,
      required: true,
      trim: true,
    },
    metaDescription: {
      type: String,
      required: true,
      trim: true,
    },
    h1Title: {
      type: String,
      required: true,
      trim: true,
    },
    
  },
  { timestamps: true }
);

export const Category =
  mongoose.models.categories || mongoose.model("categories", categorySchema);
