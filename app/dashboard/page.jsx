import DashboardNavbar from "../(public)/components/dashoard/DashboardNavbar";
import DashboardTable from "../(public)/components/dashoard/DashboardTable";

import Sidebar from "../(public)/components/dashoard/Sidebar";


// app/(dashboard)/page.jsx
export default function Page() {
    return (
        <div className="flex  min-h-screen">
        {/* Sidebar */}
        <Sidebar />
        

        {/* Main dashboard content */}
        <div className="flex-1 dark:text-white">
        <DashboardNavbar/>
       <div className="mt-10">
       <DashboardTable />
       </div>
      
        
        </div>
      </div>
    );
  }
  