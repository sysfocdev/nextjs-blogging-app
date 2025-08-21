"use client";
import { useState, useEffect } from "react";
import { SearchIcon, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";

export default function Search() {
  const [open, setOpen] = useState(false);
  const [searchItem, setSearch ]= useState("")

  // Disable body scroll when overlay is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [open]);

  const handleSearch= ()=>{
    if(!searchItem){
      toast.error("Empty Search Bar")
    }
  }

  return (
    <>
   
      <div className="p-4">
        <button
          onClick={() => setOpen(true)}
          className="p-2 rounded-full hover:bg-gray-200"
        >
          <SearchIcon size={24} />
        </button>
      </div>

    
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-white flex items-center justify-center z-50 overflow-hidden"
          >
         
            <button
              onClick={() => setOpen(false)}
              className="absolute right-6 top-6 p-2 rounded-full hover:bg-gray-200"
            >
              <X size={28} />
            </button>
            

            
            <motion.div
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="w-full max-w-md px-6"
            >
              <h1 className="text-center text-3xl font-bold mb-4">Press Esc To Close</h1>
              <div className="flex items-center gap-2 ">
              <input
                type="text"
                placeholder="Search..."
                className="w-full px-4 py-3 text-lg rounded-full   shadow-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#FE4F70] to-[#FFA387]"
                autoFocus
                value={searchItem}
                onChange={(e)=>setSearch(e.target.value)}
                
              />
              <button onClick={()=>handleSearch()} className='w-fit bg-gradient-to-r from-[#FE4F70] to-[#FFA387] text-white rounded-full text-lg px-4 py-3 cursor-pointer'>
            Search
          </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
