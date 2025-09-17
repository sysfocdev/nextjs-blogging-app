import Link from "next/link";
import DashboardGrid from "../../(public)/components/dashoard/DashboardGrid";
import DashboardNavbar from "../../(public)/components/dashoard/DashboardNavbar";
import Sidebar from "../../(public)/components/dashoard/Sidebar";
import { ArrowLeft, Plus } from "lucide-react";

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
        
        <div className="mt-10">
          <DashboardGrid />
          
        </div>
      </div>
    </div>
  );
}
