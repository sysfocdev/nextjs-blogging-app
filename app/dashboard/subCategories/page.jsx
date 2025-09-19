"use client";

import { useEffect, useState } from "react";
import Sidebar from "../../(public)/components/dashoard/Sidebar";
import DashboardNavbar from "@/app/(public)/components/dashoard/DashboardNavbar";

export default function Page() {
  const [subcategories, setSubcategories] = useState([]);

  useEffect(() => {
    const fetchSubCategories = async () => {
      try {
        const res = await fetch("/api/subcategories");
        const data = await res.json();
        if (data.success) {
          setSubcategories(data.subcategories);
        }
      } catch (err) {
        console.error("Error fetching subcategories", err);
      }
    };
    fetchSubCategories();
  }, []);

  return (
    <div className="flex min-h-screen">
      <div className="w-64 h-screen sticky top-0 border-r border-gray-200 dark:border-gray-700">
        <Sidebar />
      </div>

      <div className="flex-1">
        <DashboardNavbar />
        <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow rounded">
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
              {subcategories.length > 0 ? (
                subcategories.map((sub) => (
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
                      <button className="px-3 py-1 bg-red-500 text-white rounded">
                        Delete
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
      </div>
    </div>
  );
}
