import Image from "next/image";
import React from "react";
import Navlinks from "@/app/(public)/components/navbar/Navlinks";
import Darkmode from "@/app/(public)/components/navbar/Darkmode";
import MobileNav from "@/app/(public)/components/navbar/MobileNav";
import Search from "@/app/(public)/components/navbar/Search";
;
import { User2Icon } from "lucide-react";
import Link from "next/link";
const Header = () => {
  return (
    <header className='shadow-md'>
      <div className='flex items-center justify-between mx-4 md:mx-12 py-3'>
        <div className='flex items-center gap-x-3'>
          <Image
            src='/logo.png'
            alt='logo'
            width={80}
            height={50}
            className='size-auto'
            fetchPriority='high'
            priority
          />
        </div>
        <Navlinks />
        <div className='flex items-center gap-x-3'>
          <Darkmode />
          <div className='md:hidden'>
            <MobileNav />
          </div>
          <div><Search/></div>
          <div className="p-2 rounded-lg hover:bg-gray-200 cursor-pointer"><Link  href="/login">Login</Link></div>
        </div>
      </div>
    </header>
  );
};

export default Header;
