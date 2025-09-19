"use client";
import { useEffect, useState } from "react";
import Sidebar from "@/app/(public)/components/dashoard/Sidebar";
import DashboardNavbar from "@/app/(public)/components/dashoard/DashboardNavbar";
import toast from "react-hot-toast";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function Page() {
  const [user, setUser] = useState(null);
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState({
    subCategoryName: "",
    category: "", // Category ID selected
    metaTitle: "",
    metaDescription: "",
    h1Title: "",
  });

  // get logged in user
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // get all categories for dropdown
  useEffect(() => {
    fetch("/api/categories")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setCategories(data.categories);
      })
      .catch(() => toast.error("Failed to fetch categories"));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/subcategories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.success) {
        toast.success("Subcategory added successfully!");
        setForm({
          subCategoryName: "",
          category: "",
          metaTitle: "",
          metaDescription: "",
          h1Title: "",
        });
      } else {
        toast.error(data.error);
      }
    } catch (err) {
      toast.error("Failed to add subcategory");
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
        <div className="mt-6 mx-8 w-[80%] flex items-center justify-between">
          <Link
            href={"/dashboard/blogs"}
            className="bg-gradient-to-r from-[#d397fa] to-[#8364e8] px-4 py-2 rounded-sm cursor-pointer text-white "
          >
            <ArrowLeft className="transition-transform duration-700 hover:rotate-[360deg]" />
          </Link>
        </div>

        {/* ✅ Only show if user is admin */}
        {user.role === "admin" ? (
          <div className="max-w-2xl mx-auto p-6 overflow-y-auto shadow-md rounded-2xl mt-10">
            <h2 className="text-xl font-semibold mb-4">Add New Subcategory</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Parent category dropdown */}
              {/* Select Category */}
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

              {/* SubCategory Name */}
              <input
                type="text"
                name="subCategoryName"
                placeholder="Subcategory Name"
                value={form.subCategoryName}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              />

              {/* Meta Title */}
              <input
                type="text"
                name="metaTitle"
                placeholder="Meta Title"
                value={form.metaTitle}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              />

              {/* Meta Description */}
              <textarea
                name="metaDescription"
                placeholder="Meta Description"
                value={form.metaDescription}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                rows={3}
                required
              />

              {/* H1 Title */}
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
                Add Subcategory
              </button>
            </form>
          </div>
        ) : (
          <p className="text-red-500 text-center mt-10 font-semibold">
            🚫 You are not authorized to add subcategories.
          </p>
        )}
      </div>
    </div>
  );
}
