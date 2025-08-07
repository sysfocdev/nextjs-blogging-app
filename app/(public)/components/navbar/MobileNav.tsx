import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import Link from "next/link";
const MobileNav = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='outline' size='icon' className='cursor-pointer'>
          <Menu className='h-6 w-6' />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end'>
        <DropdownMenuItem>
          <Link href='/'>Home</Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link href='/'>Blog</Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link href='/'>About</Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link href='/'>Help</Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default MobileNav;
