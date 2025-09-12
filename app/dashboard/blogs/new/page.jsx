"use client";
import { Suspense, useState } from "react";
import DashboardNavbar from "../../../(public)/components/dashoard/DashboardNavbar";
import Sidebar from "../../../(public)/components/dashoard/Sidebar";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import toast from "react-hot-toast";
import dynamic from "next/dynamic";


const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });

// 🟢 Step 2: editorConfig yahan rakho
const editorConfig = {
  placeholder: "Start typing your blog...",
  height: 500,
  uploader: {
    insertImageAsBase64URI: true,
  },
  askBeforePasteHTML: false,
  askBeforePasteFromWord: false,
  processPasteHTML: true,
};  
export default function NewBlogForm() {
  const [form, setForm] = useState({
    title: "",
    slug: "",
    content: "",
    category: "",
    tags: "",
    coverImg: "",
    isPublished: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    let newForm = {
      ...form,
      [name]: type === "checkbox" ? checked : value,
    };

    // Auto-generate slug from title
    if (name === "title") {
      newForm.slug = value
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "")
        .trim()
        .replace(/\s+/g, "-");
    }

    setForm(newForm);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const user = JSON.parse(localStorage.getItem("user")); // 👈 get logged-in user
      const blogData = { ...form, author: user?.fName || "Unknown" };
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
      <Sidebar />

      <div className="flex-1">
        <div>
          <DashboardNavbar />
        </div>

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
              placeholder="Slug (auto-generated)"
              value={form.slug}
              onChange={handleChange}
              className="w-full p-2 border rounded "
              required
            />

<div className="border rounded">
    <Suspense fallback={<p>Loading editor...</p>}>
      <JoditEditor
        value={form.content}
        config={editorConfig}
        tabIndex={1}
        onBlur={(newContent) =>
          setForm({ ...form, content: newContent })
        }
      />
    </Suspense>
  </div>

            <div className="flex items-center gap-3">
              <input
                type="text"
                name="category"
                placeholder="Category (e.g. Tech, Lifestyle)"
                value={form.category}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              />

              <input
                type="text"
                name="tags"
                placeholder="Tags (comma separated)"
                value={form.tags}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />
            </div>

            <input
              type="text"
              name="coverImg"
              placeholder="Cover Image URL"
              value={form.coverImg}
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
              className="w-full py-2 cursor-pointer bg-gradient-to-r from-indigo-500 to-purple-500 text-white"
            >
              Create Blog
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
