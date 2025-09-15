"use client";

import toast from "react-hot-toast";
import Sidebar from "../../(public)/components/dashoard/Sidebar";
import DashboardNavbar from "../../(public)/components/dashoard/DashboardNavbar";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";


export default function NewCategoryPage() {
  const [form, setForm] = useState({
    categoryName: "",
    metaTitle: "",
    metaDescription: "",
    h1Title: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (data.success) {
        toast.success("Category created successfully!");
        setForm({
          categoryName: "",
          metaTitle: "",
          metaDescription: "",
          h1Title: "",
        });
      } else {
        toast.error(data.error || "Something went wrong");
      }
    } catch (err) {
      toast.error("Failed to create category");
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="w-64 h-screen sticky top-0 border-r border-gray-200 dark:border-gray-700">
        <Sidebar />
      </div>

      {/* Main Area */}
      <div className="flex-1">
        <DashboardNavbar />

        {/* Back button */}
        <div className="mt-5 mx-8 w-fit px-4 py-2 rounded-sm cursor-pointer bg-gradient-to-r from-indigo-500 to-purple-500 text-white">
          <Link href={"/dashboard/blogs"}>
            <ArrowLeft className="transition-transform duration-700 hover:rotate-[360deg]" />
          </Link>
        </div>

        {/* Category Form */}
        <div className="max-w-2xl mx-auto p-6 overflow-y-auto shadow-md rounded-2xl mt-6">
          <h2 className="text-xl font-semibold mb-4">Add New Category</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="categoryName"
              placeholder="Category Name"
              value={form.categoryName}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />

            <input
              type="text"
              name="metaTitle"
              placeholder="Meta Title"
              value={form.metaTitle}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />

            <textarea
              name="metaDescription"
              placeholder="Meta Description"
              value={form.metaDescription}
              onChange={handleChange}
              className="w-full p-2 border rounded min-h-[100px]"
              required
            />

            <input
              type="text"
              name="h1Title"
              placeholder="H1 Title"
              value={form.h1Title}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />

            <button
              type="submit"
              className="w-full py-2 cursor-pointer bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded"
            >
              Create Category
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
