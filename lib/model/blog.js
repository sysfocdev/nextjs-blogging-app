import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
  {
    title: String,
    slug: String,
    content: String,
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category", // ✅ must match Category model name
      required: true,
    },
    subcategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SubCategory", // ✅ must match SubCategory model name
      required: false,
    },
    tags: [String],
    coverImg: String,
    isPublished: Boolean,
    author: String,
  },
  { timestamps: true }
);

export const Blog =
  mongoose.models.Blog || mongoose.model("Blog", blogSchema);
