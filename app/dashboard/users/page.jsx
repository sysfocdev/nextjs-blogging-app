
import { ArrowLeft } from "lucide-react";
import DashboardNavbar from "../../(public)/components/dashoard/DashboardNavbar";
import DashboardUserTable from "../../(public)/components/dashoard/DashboardUserTable";
import Sidebar from "../../(public)/components/dashoard/Sidebar";
import Link from "next/link";

export default function Page() {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <Sidebar />
      {/* Main dashboard content */}
      <div className="flex-1">
        <div>
          <DashboardNavbar />
        </div>
        <div  className="mt-6 mx-8 w-fit px-4 py-2 rounded-sm cursor-pointer bg-gradient-to-r from-pink-500 to-red-500 text-white  " >
        <Link href={"/dashboard/blogs"} > <ArrowLeft className="transition-transform duration-700 hover:rotate-[360deg]"/></Link>
        </div>
        <div className="mt-10">
        
          <DashboardUserTable/>
        </div>
      </div>
    </div>
  );
}
