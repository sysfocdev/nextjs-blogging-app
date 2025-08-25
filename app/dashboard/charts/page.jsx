
import Link from "next/link";
import DashboardNavbar from "../../(public)/components/dashoard/DashboardNavbar";
import DashboardUserTable from "../../(public)/components/dashoard/DashboardUserTable";
import PieChartComponent from "../../(public)/components/dashoard/PieChartComponent";
import Sidebar from "../../(public)/components/dashoard/Sidebar";
import { ArrowLeft } from "lucide-react";

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
        <div  className="mt-6 mx-8 w-fit px-4 py-2 rounded-sm cursor-pointer bg-gradient-to-r from-green-400 to-blue-500 text-white  " >
        <Link href={"/dashboard/blogs"} > <ArrowLeft className="transition-transform duration-700 hover:rotate-[360deg]"/></Link>
        </div>
        <div className="mt-10">
        
          <PieChartComponent/>
        </div>
      </div>
    </div>
  );
}
