"use client";
import { Suspense, useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import DashboardNavbar from "../../../../(public)/components/dashoard/DashboardNavbar";
import Sidebar from "../../../../(public)/components/dashoard/Sidebar";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import toast from "react-hot-toast";
import dynamic from "next/dynamic";

const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });

const editorConfig = {
  placeholder: "Edit your blog...",
  height: 500,
  uploader: {
    insertImageAsBase64URI: true,
  },
  askBeforePasteHTML: false,
  askBeforePasteFromWord: false,
  processPasteHTML: true,
};

export default function EditBlogForm() {
  const params = useParams();
  const router = useRouter();
  const id = params.id;

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

  // 🟢 Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("/api/categories");
        const data = await res.json();
        if (data.success) setCategories(data.categories);
      } catch (err) {
        console.error("Failed to fetch categories:", err);
      }
    };
    fetchCategories();
  }, []);

  // 🟢 Fetch subcategories
  useEffect(() => {
    const fetchSubcategories = async () => {
      try {
        const res = await fetch("/api/subcategories");
        const data = await res.json();
        if (data.success) setSubcategories(data.subcategories);
      } catch (err) {
        console.error("Failed to fetch subcategories:", err);
      }
    };
    fetchSubcategories();
  }, []);

  // 🟢 Fetch blog data to pre-fill form
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

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setForm((prev) => ({ ...prev, coverImg: reader.result }));
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const blogData = { ...form, author: user?.fName || "Unknown" };

      const res = await fetch(`/api/blogs/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(blogData),
      });

      const data = await res.json();
      if (data.success) {
        toast.success("Blog updated successfully!");
        router.push("/dashboard");
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
        <Sidebar />
      </div>

      <div className="flex-1">
        <DashboardNavbar />

        <div className="mt-5 mx-8 w-fit px-4 py-2 rounded-sm cursor-pointer bg-gradient-to-r from-indigo-500 to-purple-500 text-white">
          <Link href={"/dashboard/blogs"}>
            <ArrowLeft className="transition-transform duration-700 hover:rotate-[360deg]" />
          </Link>
        </div>

        <div className="max-w-2xl mx-auto p-6 overflow-y-auto shadow-md rounded-2xl">
          <h2 className="text-xl font-semibold mb-4">Edit Blog</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Title */}
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              placeholder="Title"
              required
            />

            {/* Slug */}
            <input
              type="text"
              name="slug"
              value={form.slug}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              placeholder="Slug"
              required
            />

            {/* Editor */}
            <div className="border rounded dark:text-black bg-black">
              <Suspense fallback={<p>Loading editor...</p>}>
                <JoditEditor
                  value={form.content}
                  config={editorConfig}
                  tabIndex={1}
                  onChange={(newContent) => setForm((p) => ({ ...p, content: newContent }))}
                />
              </Suspense>
            </div>

            {/* Category + Subcategory */}
            <div className="flex gap-3">
              <select
                name="category"
                value={form.category}
                onChange={handleChange}
                className="w-full p-2 border rounded dark:bg-black"
                required
              >
                <option value="">-- Select Category --</option>
                {categories.map((cat) => (
                  <option key={cat._id} value={cat._id}>
                    {cat.categoryName}
                  </option>
                ))}
              </select>

              <select
                name="subcategory"
                value={form.subcategory}
                onChange={handleChange}
                className="w-full p-2 border rounded dark:bg-black"
                disabled={!form.category}
                required
              >
                <option value="">-- Select Subcategory --</option>
                {subcategories
  .filter((sub) => String(sub.category?._id) === String(form.category))
  .map((sub) => (
    <option key={sub._id} value={sub._id}>
      {sub.subCategoryName}
    </option>
  ))}

              </select>
            </div>

            {/* Tags */}
            <input
              type="text"
              name="tags"
              value={form.tags}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              placeholder="Tags (comma separated)"
            />

            {/* File input */}
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full p-2 border rounded"
            />

            {/* Publish */}
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
