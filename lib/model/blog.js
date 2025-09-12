import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, unique: true },
    slug: { type: String, required: true, unique: true },
    content: { type: String, required: true },
    category: { type: String, required: true },
    tags: { type: [String], default: [] },
    coverImg: { type: String, default: "" },
    isPublished: { type: Boolean, default: false },
    author: { type: String, required: true }
  },
  { timestamps: true }
);

export const Blog = mongoose.models.blogs || mongoose.model("blogs", blogSchema);
