import Link from "next/link";
import DashboardNavbar from "../../(public)/components/dashoard/DashboardNavbar";
import Sidebar from "../../(public)/components/dashoard/Sidebar";
import { ArrowLeft } from "lucide-react";
import ShowCategories from "../../(public)/components/dashoard/ShowCategories";


export default function Page() {
  return (
    <div className="flex h-screen">
      {/* Sidebar fixed */}
      <div className="w-64 h-screen sticky top-0 border-r border-gray-200 dark:border-gray-700">
        <Sidebar />
      </div>

      {/* Main dashboard content - scrollable */}
      <div className="flex-1 flex flex-col overflow-y-auto h-screen">
        {/* Navbar fixed at top */}
        <div className="sticky top-0 z-10 bg-white dark:bg-gray-900 shadow">
          <DashboardNavbar />
        </div>

        {/* Back button */}
        <div className="mt-6 mx-8 w-fit px-4 py-2 rounded-sm cursor-pointer bg-gradient-to-r from-pink-500 to-red-500 text-white">
          <Link href={"/dashboard/blogs"}>
            <ArrowLeft className="transition-transform duration-700 hover:rotate-[360deg]" />
          </Link>
        </div>

        {/* User Table - scrollable area */}
        <div className="mt-10 px-6">
          <ShowCategories />
        </div>
      </div>
    </div>
  );
}
