"use client"
import { Trash2Icon } from "lucide-react";
import { useRouter } from "next/navigation";

import toast from "react-hot-toast";



export default function DeleteUser(props){
    const router= useRouter()
  
    const deleteRecord=async()=>{
        const confirmDelete = window.confirm("Are you sure you want to delete this User?");
        if (!confirmDelete) return;
        let response= await fetch(`/api/users/${props.id}`,{
            method:"DELETE",
            })
            response= await response.json();
            if(response.success){
                if (response.success) {
                    toast.success("User Deleted");
                    router.refresh();   // ✅ force refresh of server components
                  }
                
            }
    }
    return(
        <button onClick={deleteRecord} className="px-3 py-1 cursor-pointer bg-red-500 text-white rounded">
        Delete
      </button>
    )   
}