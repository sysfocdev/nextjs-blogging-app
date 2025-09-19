import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    categoryName: {
      type: String,
      required: true,
      trim: true,
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
    parent: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "categories",
      default: null, // null → main category, otherwise subcategory
    },
  },
  { timestamps: true }
);

export const Category =
  mongoose.models.categories || mongoose.model("categories", categorySchema);
