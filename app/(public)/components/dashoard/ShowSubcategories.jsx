"use client"
import { useEffect, useState } from "react";

import DeleteSubCategory from "../../../../lib/DeleteSubCategory";

export default function ShowSubCategories() {
  const [subCat, setSubCat] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        let res = await fetch("/api/subcategories", {
          cache: "no-cache",
        });
        let data = await res.json();

        if (data.success) {
          setSubCat(data.subcategories); // ✅ fixed here
        } else {
          console.error("Error fetching categories:", data.error);
        }
      } catch (err) {
        console.error("Failed to fetch categories:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) return <p>Loading Sub categories...</p>;

  return (
    <div className="max-w-4xl mx-auto  p-6 shadow rounded">
      <h2 className="text-xl font-bold mb-4">All Subcategories</h2>

      <table className="w-full border">
        <thead>
          <tr className="dark:bg-black bg-gray-100">
            <th className="p-2 border">Subcategory Name</th>
            <th className="p-2 border">Parent Category</th>
            <th className="p-2 border">Meta Title</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {subCat.length > 0 ? (
            subCat.map((sub) => (
              <tr key={sub._id} className="text-center">
                <td className="p-2 border">{sub.subCategoryName}</td>
                <td className="p-2 border">
                  {sub.category ? sub.category.categoryName : "—"}
                </td>
                <td className="p-2 border">{sub.metaTitle}</td>
                <td className="p-2 border flex justify-center gap-2">
                  <button className="px-3 py-1 bg-blue-500 text-white rounded">
                    Edit
                  </button>
                  <DeleteSubCategory id={sub._id}/>
                
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
