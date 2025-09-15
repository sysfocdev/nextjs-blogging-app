"use client";
import { useEffect, useState } from "react";
import Sidebar from "@/app/(public)/components/dashoard/Sidebar";
import DashboardNavbar from "@/app/(public)/components/dashoard/DashboardNavbar";
import toast from "react-hot-toast";

export default function AddCategoryPage() {
  const [user, setUser] = useState(null);
  const [form, setForm] = useState({
    categoryName: "",
    metaTitle: "",
    metaDescription: "",
    h1Title: "",
  });

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, user }), // 👈 send logged-in user too
      });

      const data = await res.json();
      if (data.success) {
        toast.success("Category added successfully!");
        setForm({
          categoryName: "",
          metaTitle: "",
          metaDescription: "",
          h1Title: "",
        });
      } else {
        toast.error(data.error || "Failed to add category");
      }
    } catch (err) {
      toast.error("Something went wrong");
    }
  };

  if (!user) {
    return <p className="text-center mt-10">Loading...</p>;
  }

  return (
    <div className="flex min-h-screen">
      <div className="w-64 h-screen sticky top-0 border-r border-gray-200 dark:border-gray-700">
        <Sidebar />
      </div>

      <div className="flex-1">
        <DashboardNavbar />

        {/* ✅ Only show if user is admin */}
        {user.role === "admin" ? (
          <div className="max-w-2xl mx-auto p-6 overflow-y-auto shadow-md rounded-2xl mt-10">
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
                className="w-full p-2 border rounded"
                rows={3}
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
                className="w-full py-2 cursor-pointer bg-gradient-to-r from-indigo-500 to-purple-500 text-white"
              >
                Add Category
              </button>
            </form>
          </div>
        ) : (
          <p className="text-red-500 text-center mt-10 font-semibold">
            🚫 You are not authorized to add categories.
          </p>
        )}
      </div>
    </div>
  );
}
