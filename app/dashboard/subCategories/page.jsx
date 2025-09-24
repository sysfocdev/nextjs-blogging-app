import Link from "next/link";
import DashboardNavbar from "../../(public)/components/dashoard/DashboardNavbar";
import Sidebar from "../../(public)/components/dashoard/Sidebar";
import { ArrowLeft, Plus } from "lucide-react";
import ShowSubCategory from "../../(public)/components/dashoard/ShowSubCategory";






export default function Page() {
  return (
    <div className="flex h-screen">
      {/* Sidebar fixed */}
      <div className="w-64 h-screen sticky top-0 border-r border-gray-200 dark:border-gray-700">
      <Sidebar/>
      </div>

      {/* Main dashboard content - scrollable */}
      <div className="flex-1 flex flex-col overflow-y-auto h-screen">
        {/* Navbar fixed at top */}
        <div className="sticky top-0 z-10 bg-white dark:bg-gray-900 shadow">
          <DashboardNavbar/>
        </div>

        {/* Back button + Add button */}
        <div className="mt-6 mx-8 w-[90%] flex items-center justify-between">
          <Link
            href="/dashboard/blogs"
            className="bg-gradient-to-r from-[#d397fa] to-[#8364e8] px-4 py-2 rounded-sm cursor-pointer text-white"
          >
            <ArrowLeft className="transition-transform duration-700 hover:rotate-[360deg]" />
          </Link>

          <Link
            href="/dashboard/addSubcategory"
            className="flex items-center gap-2 bg-gradient-to-r from-[#d397fa] to-[#8364e8] px-4 py-2 rounded-sm cursor-pointer text-white"
          >
            <Plus className="transition-transform duration-700 hover:rotate-[360deg]" />
            Add Sub Category
          </Link>
        </div>

        {/* Subcategory Table */}
        <div className="mt-10 px-6">
      <ShowSubCategory/>
        </div>
      </div>
    </div>
  );
}
