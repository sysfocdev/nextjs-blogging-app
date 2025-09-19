"use client";

import { useState , useEffect} from "react";
import toast from "react-hot-toast";
import Sidebar from "../../(public)/components/dashoard/Sidebar";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import  DashboardNavbar  from '@/app/(public)/components/dashoard/DashboardNavbar';


export default function Page() {
  const [user, setUser] = useState(null);
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState({
    categoryName: "",
    metaTitle: "",
    metaDescription: "",
    h1Title: "",
    parent: "", // 👈 subcategory ke liye required
  });

  // ✅ Load user from localStorage
useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // ✅ Load all main categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("/api/categories");
        const data = await res.json();
        if (data.success) {
          setCategories(data.categories);
        }
      } catch (err) {
        console.error("Failed to fetch categories", err);
      }
    };
    fetchCategories();
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
        body: JSON.stringify({ ...form, user }),
      });

      const data = await res.json();
      if (data.success) {
        toast.success("Subcategory added successfully!");
        setForm({
          categoryName: "",
          metaTitle: "",
          metaDescription: "",
          h1Title: "",
          parent: "",
        });
      } else {
        toast.error(data.error || "Failed to add subcategory");
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
        <div className="mt-6 mx-8 w-[80%] flex items-center justify-between">
          <Link
            href={"/dashboard/categories"}
            className="bg-gradient-to-r from-[#d397fa] to-[#8364e8] px-4 py-2 rounded-sm cursor-pointer text-white"
          >
            <ArrowLeft className="transition-transform duration-700 hover:rotate-[360deg]" />
          </Link>
        </div>

        {/* ✅ Only show if user is admin */}
        {user.role === "admin" ? (
          <div className="max-w-2xl mx-auto p-6 overflow-y-auto shadow-md rounded-2xl mt-10">
            <h2 className="text-xl font-semibold mb-4">Add New Subcategory</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* 👇 Parent category dropdown */}
              <select
                name="parent"
                value={form.parent}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              >
                <option value="">-- Select Main Category --</option>
                {categories.map((cat) => (
                  <option key={cat._id} value={cat._id}>
                    {cat.categoryName}
                  </option>
                ))}
              </select>

              <input
                type="text"
                name="categoryName"
                placeholder="Subcategory Name"
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
