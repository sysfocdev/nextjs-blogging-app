"use client";
import { Suspense, useState, useEffect } from "react";
import dynamic from "next/dynamic";
import toast from "react-hot-toast";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Sidebar from "@/app/(public)/components/dashoard/Sidebar";
import DashboardNavbar from "@/app/(public)/components/dashoard/DashboardNavbar";

const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });

const editorConfig = {
  placeholder: "Start typing your blog...",
  height: 400,
};

export default function NewBlogForm() {
  const [form, setForm] = useState({
    title: "",
    slug: "",
    content: "",
    category: "",
    subcategory: "",
    tags: "",
    coverImg: "",
    isPublished: false,
  });

  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);

  // Fetch categories
  useEffect(() => {
    fetch("/api/categories")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setCategories(data.categories);
      });
  }, []);

  // Fetch subcategories when category changes
  useEffect(() => {
    if (form.category) {
      fetch(`/api/subcategories?categoryId=${form.category}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.success) setSubcategories(data.subcategories);
        });
    } else {
      setSubcategories([]);
    }
  }, [form.category]);

  // Handle input change
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    let newForm = { ...form, [name]: type === "checkbox" ? checked : value };

    if (name === "title") {
      newForm.slug = value
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "")
        .trim()
        .replace(/\s+/g, "-");
    }
    setForm(newForm);
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = JSON.parse(localStorage.getItem("user"));
  
      // Convert tags to array
      const tagsArray =
        typeof form.tags === "string"
          ? form.tags.split(",").map((t) => t.trim()).filter(Boolean)
          : form.tags;
  
      const blogData = {
        ...form,
        tags: tagsArray,
        author: user?.fName || "Unknown",
        subcategory: form.subcategory || null, // ✅ fix
      };
  
      const res = await fetch("/api/blogs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(blogData),
      });
  
      const data = await res.json();
      if (data.success) {
        toast.success("Blog created successfully!");
        setForm({
          title: "",
          slug: "",
          content: "",
          category: "",
          subcategory: "",
          tags: "",
          coverImg: "",
          isPublished: false,
        });
      } else {
        toast.error(data.error || "Something went wrong");
      }
    } catch (err) {
      toast.error("Failed to create blog");
    }
  };
  

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="w-64 h-screen sticky top-0 border-r border-gray-200 dark:border-gray-700">
        <Sidebar />
      </div>

      {/* Main content */}
      <div className="flex-1">
        <DashboardNavbar />

        {/* Back button */}
        <div className="mt-5 mx-8 w-fit px-4 py-2 rounded-sm cursor-pointer bg-gradient-to-r from-indigo-500 to-purple-500 text-white">
          <Link href={"/dashboard/blogs"}>
            <ArrowLeft className="transition-transform duration-700 hover:rotate-[360deg]" />
          </Link>
        </div>

        {/* Blog Form */}
        <div className="max-w-2xl mx-auto p-6 overflow-y-auto shadow-md rounded-2xl">
          <h2 className="text-xl font-semibold mb-4">Create New Blog</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="title"
              placeholder="Title"
              value={form.title}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />

            <input
              type="text"
              name="slug"
              placeholder="Slug"
              value={form.slug}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />

            <Suspense fallback={<p>Loading editor...</p>}>
              <JoditEditor
                value={form.content}
                config={editorConfig}
                onChange={(newContent) =>
                  setForm((prev) => ({ ...prev, content: newContent }))
                }
              />
            </Suspense>

            {/* Category Dropdown */}
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            >
              <option value="">-- Select Category --</option>
              {categories.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.categoryName}
                </option>
              ))}
            </select>

            {/* Subcategory Dropdown */}
            <select
              name="subcategory"
              value={form.subcategory}
              onChange={handleChange}
              className="w-full p-2 border rounded "
              disabled={!form.category}
            >
              <option value="">-- Select Subcategory --</option>
              {subcategories.map((sub) => (
                <option key={sub._id} value={sub._id}>
                  {sub.subCategoryName} 
                </option>
              ))}
            </select>
            

            <input
              type="text"
              name="tags"
              placeholder="Tags (comma separated)"
              value={form.tags}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />

            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                name="isPublished"
                checked={form.isPublished}
                onChange={handleChange}
              />
              <span>Publish now</span>
            </label>

            <button
              type="submit"
              className="w-full py-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white cursor-pointer font-semibold rounded"
            >
              Create Blog
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
