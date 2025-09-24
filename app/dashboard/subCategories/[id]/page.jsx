"use client";
import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Sidebar from "@/app/(public)/components/dashoard/Sidebar";
import DashboardNavbar from "@/app/(public)/components/dashoard/DashboardNavbar";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import toast from "react-hot-toast";

export default function UpdateSubCategoryPage() {
  const router = useRouter();
  const { id } = useParams(); // subcategory id from URL
  const [form, setForm] = useState({
    category: "",
    subCategoryName: "",
    metaTitle: "",
    metaDescription: "",
    h1Title: "",
  });
  const [categories, setCategories] = useState([]);
  const [user, setUser] = useState({ role: "admin" }); // replace with your auth system

  // ✅ Fetch categories for dropdown
  useEffect(() => {
    fetch("/api/categories")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setCategories(data.categories);
      });
  }, []);

  // ✅ Fetch existing subcategory
  useEffect(() => {
    if (id) {
      fetch(`/api/subcategories/${id}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            setForm({
              category: data.category.category || "",
              subCategoryName: data.category.subCategoryName || "",
              metaTitle: data.category.metaTitle || "",
              metaDescription: data.category.metaDescription || "",
              h1Title: data.category.h1Title || "",
            });
          } else {
            toast.error("Failed to fetch subcategory");
          }
        });
    }
  }, [id]);

  // ✅ Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // ✅ Handle form submit (PUT request)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`/api/subcategories/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (data.success) {
        toast.success("Subcategory updated successfully!");
        router.push("/dashboard/subcategories");
      } else {
        toast.error(data.error || "Failed to update");
      }
    } catch (err) {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="flex min-h-screen">
      <div className="w-64 h-screen sticky top-0 border-r border-gray-200 dark:border-gray-700">
        <Sidebar />
      </div>

      <div className="flex-1">
        <DashboardNavbar />
        <div className="mt-6 mx-8 w-[80%] flex items-center justify-between">
          <Link
            href={"/dashboard/subcategories"}
            className="bg-gradient-to-r from-[#d397fa] to-[#8364e8] px-4 py-2 rounded-sm cursor-pointer text-white "
          >
            <ArrowLeft className="transition-transform duration-700 hover:rotate-[360deg]" />
          </Link>
        </div>

        {/* ✅ Only show if user is admin */}
        {user.role === "admin" ? (
          <div className="max-w-2xl mx-auto p-6 overflow-y-auto shadow-md rounded-2xl mt-10">
            <h2 className="text-xl font-semibold mb-4">Update Subcategory</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Parent category dropdown */}
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

              <input
                type="text"
                name="subCategoryName"
                placeholder="Subcategory Name"
                value={form.subCategoryName}
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
                Update Subcategory
              </button>
            </form>
          </div>
        ) : (
          <p className="text-red-500 text-center mt-10 font-semibold">
            🚫 You are not authorized to update subcategories.
          </p>
        )}
      </div>
    </div>
  );
}
