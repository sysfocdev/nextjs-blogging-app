import { Search, LayoutDashboard ,BellPlus, Scan, Settings} from "lucide-react";
import  Image  from 'next/image';



export default function DashboardNavbar(){
    return (
        <div className="flex-1 p-6 bg-gray-50 h-10">
          <div className="flex items-center justify-between">
          <div className="flex items-center px-3 py-2 gap-2 w-1/2  border border-gray-300">
            <input placeholder="Search Here" className=" flex-1 outline-none border-none" />
            <Search color="gray" cursor={"pointer"} />
           </div>
           <div className="flex items-center gap-5 cursor-pointer">
            <div className="w-8 h-8 rounded-full">
                <Image src="/flag.png"
                width={100}
                height={100}
                alt="flag" className="w-[100%] h-[100%] rounded-full cursor-pointer"/>
                </div>
           <LayoutDashboard className="text-gray-700 transition-transform duration-700 hover:rotate-[360deg]"/>
           <Scan className="text-gray-700 transition-transform duration-700 hover:rotate-[360deg]"/>
           <BellPlus className="text-gray-700 transition-transform duration-700 hover:rotate-[360deg]"/>

           <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full">
                <Image src="/google.jpg"
                width={1200}
                height={800}
                alt="flag"
                className="w-[100%] h-[100%] rounded-full"/>
            </div>
            <div className="leading">
            <h2 className="font-semibold text-gray-700 text-sm">Nasir</h2>
            <p className=" text-gray-500 text-sm">Web Developer</p>
            </div>
           </div>
           <Settings className="text-gray-700 transition-transform duration-700 hover:rotate-[360deg]" />

           </div>
          </div>
        </div>
    )
}