import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
  title: String,
  slug: String,
  content: String,
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  subcategory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "SubCategory",
    required: false,
  },
  tags: [String],
  coverImg: String,
  isPublished: Boolean,
  author: String,
}, { timestamps: true });

export const Blog =
  mongoose.models.blogs || mongoose.model("blogs", blogSchema);
