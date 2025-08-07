import React from "react";
import Link from "next/link";
const Navlinks = () => {
  return (
    <nav>
      <ul className='hidden md:flex items-center gap-x-8'>
        <Link href='/' className='text-sm'>
          Home
        </Link>
        <Link href='/' className='text-sm'>
          Categories
        </Link>
        <Link href='/' className='text-sm'>
          Best Wishes
        </Link>
        <Link href='/' className='text-sm'>
          About Us
        </Link>
      </ul>
    </nav>
  );
};

export default Navlinks;
