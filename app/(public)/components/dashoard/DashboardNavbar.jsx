import {
  Search,
  LayoutDashboard,
  BellPlus,
  Scan,
  Settings,
} from "lucide-react";
import Image from "next/image";
import Darkmode from "@/app/(public)/components/navbar/Darkmode";
export default function DashboardNavbar() {
  return (
    <div className="flex-1 px-6 py-2  h-12">
      <div className="flex items-center justify-between">
        <div className="flex items-center px-3 py-2 gap-2 w-1/2  rounded-lg border border-gray-300">
          <input
            placeholder="Search Here"
            className=" flex-1 outline-none border-none"
          />
          <Search cursor={"pointer"} />
        </div>
        <div className="flex items-center gap-5 cursor-pointer">
          <div className="w-8 h-8 rounded-xl">
            <Image
              src="/flag.png"
              width={100}
              height={100}
              alt="flag"
              className="w-[100%] h-[100%] rounded-xl  object-fill cursor-pointer"
            />
          </div>
          <LayoutDashboard className=" transition-transform duration-700 hover:rotate-[360deg]" />
          <Scan className=" transition-transform duration-700 hover:rotate-[360deg]" />
          <BellPlus className=" transition-transform duration-700 hover:rotate-[360deg]" />

          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full">
              <Image
                src="/nasir.jpg"
                width={1200}
                height={800}
                alt="nasir"
                className="w-[100%] h-[100%] rounded-full object-cover"
              />
            </div>
            <div className="leading">
              <h2 className="font-semiboldlight:text-gray-700 text-sm">
                Nasir
              </h2>
              <p className=" light:text-gray-500 text-sm italic">Web Developer</p>
            </div>
          </div>
          <Settings className=" transition-transform duration-700 hover:rotate-[360deg]" />
          <Darkmode />
        </div>
      </div>
    </div>
  );
}
