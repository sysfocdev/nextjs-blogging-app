"use client";
import { useEffect, useState } from "react";

export default function ShowSubCategories() {
  const [subCat, setSubCat] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    const fetchCategories = async () => {
      try {
        setLoading(true);
        setError("");

        const res = await fetch("/api/subcategories", {
          cache: "no-cache",
          signal: controller.signal,
        });

        if (!res.ok) {
          const text = await res.text();
          throw new Error(`HTTP ${res.status}: ${text || res.statusText}`);
        }

        const data = await res.json();

        // safe assignment (handles cases where API shape changes)
        if (data && data.success) {
          setSubCat(Array.isArray(data.subcategories) ? data.subcategories : []);
        } else {
          throw new Error(data?.error || "API returned success:false");
        }
      } catch (err) {
        if (err.name !== "AbortError") {
          console.error("Fetch subcategories error:", err);
          setError(err.message || "Failed to fetch subcategories");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
    return () => controller.abort();
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center h-40">
        <p className="text-gray-600">Loading categories...</p>
      </div>
    );

  if (error)
    return (
      <div className="max-w-4xl mx-auto mt-10 p-6 shadow rounded text-red-600">
        Error: {error}
      </div>
    );

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 shadow rounded">
      <h2 className="text-xl font-bold mb-4">All Subcategories</h2>

      <table className="w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 border">Subcategory Name</th>
            <th className="p-2 border">Parent Category</th>
            <th className="p-2 border">Meta Title</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>

        <tbody>
          {Array.isArray(subCat) && subCat.length > 0 ? (
            subCat.map((sub) => (
              <tr key={sub._id} className="text-center">
                <td className="p-2 border">{sub?.subCategoryName ?? "—"}</td>
                <td className="p-2 border">
                  {sub?.category?.categoryName ?? "—"}
                </td>
                <td className="p-2 border">{sub?.metaTitle ?? "—"}</td>
                <td className="p-2 border flex justify-center gap-2">
                  <button className="px-3 py-1 bg-blue-500 text-white rounded">
                    Edit
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="p-4 text-center text-gray-500">
                No subcategories found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
