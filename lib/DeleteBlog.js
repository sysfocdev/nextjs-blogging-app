"use client";
import { Trash2Icon } from "lucide-react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function DeleteBlog({ id }) {
  const router = useRouter();

  const deleteRecord = async () => {
    if (!window.confirm("Are you sure you want to delete this blog?")) return;

    try {
      const res = await fetch(`/api/blogs/${id}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (data.success) {
        toast.success("Blog Deleted");
        router.refresh(); // ✅ revalidate server component
      } else {
        toast.error(data.error || "Delete failed");
      }
    } catch (err) {
      toast.error("Something went wrong");
    }
  };

  return (
    <button onClick={deleteRecord}>
      <Trash2Icon cursor="pointer" color="red" />
    </button>
  );
}
