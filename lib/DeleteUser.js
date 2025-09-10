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
                router.push("/dashboard/users")
               setTimeout(() => {
                toast.success("User Deleted")
               }, 1000);
                
            }
    }
    return(
        <button 
          
            
            onClick={deleteRecord}> <Trash2Icon     cursor={"pointer"} color="red"/></button>
    )
}