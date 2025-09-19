"use client";
import { Trash2Icon } from "lucide-react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function DeleteCategory({ id }) {
  const router = useRouter();

  const deleteRecord = async () => {
    if (!window.confirm("Are you sure you want to delete this Category?")) return;

    try {
      const res = await fetch(`/api/categories/${id}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (data.success) {
        toast.success("Category Deleted");
        router.push("/dashboard/showCategories"); // ✅ revalidate server component
      } else {
        toast.error(data.error || "Delete failed");
      }
    } catch (err) {
      toast.error("Something went wrong");
    }
  };

  return (
    <button onClick={deleteRecord} className="px-3 py-1 cursor-pointer bg-red-500 text-white rounded">
    Delete
  </button>
  );
}
