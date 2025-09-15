"use client";
import { Suspense, useState, useEffect } from "react";

import toast from "react-hot-toast";
import dynamic from "next/dynamic";
import Sidebar from "../../../../(public)/components/dashoard/Sidebar";
import DashboardNavbar from "../../../../(public)/components/dashoard/DashboardNavbar";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });

const editorConfig = {
 
  height: 500,
  uploader: {
    insertImageAsBase64URI: true,
  },
  askBeforePasteHTML: false,
  askBeforePasteFromWord: false,
  processPasteHTML: true,
};

export default function Page({ params }) {
    const {id}= params
  const [form, setForm] = useState({
    title: "",
    slug: "",
    content: "",
    category: "",
    tags: "",
    coverImg: "",
    isPublished: false,
  });

  // 🟢 Pre-fill form when editing
  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await fetch(`/api/blogs/${id}`);
        const data = await res.json();
        if (data.success) setForm(data.result);
      } catch (err) {
        toast.error("Failed to load blog");
      }
    };
    if (id) fetchBlog();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    let newForm = {
      ...form,
      [name]: type === "checkbox" ? checked : value,
    };

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
      const user = JSON.parse(localStorage.getItem("user"));
      const blogData = { ...form, author: user?.fName || "Unknown" };

      const res = await fetch(`/api/blogs/${id}`, {
        method: "PUT", // 🔄 changed POST → PUT
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(blogData),
      });

      const data = await res.json();

      if (data.success) {
        toast.success("Blog updated successfully!");
      } else {
        toast.error(data.error || "Update failed");
      }
    } catch (err) {
      toast.error("Failed to update blog");
    }
  };

  return (
    <div className="flex min-h-screen">
      <div className="w-64 h-screen sticky top-0 border-r border-gray-200 dark:border-gray-700">
       <Sidebar/>
      </div>

      <div className="flex-1">
        <DashboardNavbar/>

        <div className="mt-5 mx-8 w-fit px-4 py-2 rounded-sm cursor-pointer bg-gradient-to-r from-indigo-500 to-purple-500 text-white">
          <Link href={"/dashboard/blogs"}>
            <ArrowLeft className="transition-transform duration-700 hover:rotate-[360deg]" />
          </Link>
        </div>

        <div className="max-w-2xl mx-auto p-6 overflow-y-auto shadow-md rounded-2xl">
          <h2 className="text-xl font-semibold mb-4">Edit Blog</h2>
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
              className="w-full p-2 border rounded"
              required
            />

            <div className="border rounded dark:text-black bg-black">
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
                placeholder="Category"
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
              type="file"
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
              Update Blog
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
