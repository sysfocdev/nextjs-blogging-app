"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import DashboardNavbar from "@/app/(public)/components/dashoard/DashboardNavbar";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Sidebar from "@/app/(public)/components/dashoard/Sidebar";
import toast from "react-hot-toast";

export default function Page() {
  const [user, setUser] = useState(null);
  const [form, setForm] = useState({
    categoryName: "",
    metaTitle: "",
    metaDescription: "",
    h1Title: "",
  });
  const [loading, setLoading] = useState(true);

  const params = useParams(); // ✅ get id from URL
  const router = useRouter();

  // ✅ Load user from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // ✅ Fetch category details by ID
  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const res = await fetch(`/api/categories/${params.id}`);
        const data = await res.json();

        if (res.ok && data.success) {
          setForm({
            categoryName: data.category.categoryName,
            metaTitle: data.category.metaTitle,
            metaDescription: data.category.metaDescription,
            h1Title: data.category.h1Title,
          });
        } else {
          toast.error(data.error || "Failed to fetch category");
        }
      } catch (err) {
        toast.error("Something went wrong while fetching category");
      } finally {
        setLoading(false);
      }
    };

    if (params.id) fetchCategory();
  }, [params.id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ✅ Update category
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`/api/categories/${params.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, user }), // 👈 also send user info
      });

      const data = await res.json();
      if (data.success) {
        toast.success("Category updated successfully!");
        router.push("/dashboard/showCategories"); // ✅ redirect after update
      } else {
        toast.error(data.error || "Failed to update category");
      }
    } catch (err) {
      toast.error("Something went wrong");
    }
  };

  if (!user || loading) {
    return <p className="text-center mt-10">Loading...</p>;
  }

  return (
    <div className="flex min-h-screen">
      <div className="w-64 h-screen sticky top-0 border-r border-gray-200 dark:border-gray-700">
        <Sidebar />
      </div>

      <div className="flex-1">
        <DashboardNavbar />
        <div className="mt-6 mx-8 w-fit px-4 py-2 rounded-sm cursor-pointer bg-gradient-to-r from-[#d397fa] to-[#8364e8] text-white">
          <Link href={"/dashboard/showCategories"}>
            <ArrowLeft className="transition-transform duration-700 hover:rotate-[360deg]" />
          </Link>
        </div>

        {user.role === "admin" ? (
          <div className="max-w-2xl mx-auto p-6 overflow-y-auto shadow-md rounded-2xl mt-10">
            <h2 className="text-xl font-semibold mb-4">Update Category</h2>
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
                Update Category
              </button>
            </form>
          </div>
        ) : (
          <p className="text-red-500 text-center mt-10 font-semibold">
            🚫 You are not authorized to update categories.
          </p>
        )}
      </div>
    </div>
  );
}
