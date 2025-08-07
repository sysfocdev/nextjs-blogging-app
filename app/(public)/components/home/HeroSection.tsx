import Image from "next/image";
import Link from "next/link";
import React from "react";

const HeroSection = () => {
  return (
      <div className='relative w-full h-[400px] md:h-[500px] overflow-hidden rounded-xl group'>
        <Image
          src='/banner.webp'
          alt='hero-img'
          fill
          className='object-cover rounded-xl group-hover:scale-105 transition-all duration-500 ease-in-out'
          priority
          fetchPriority='high'
        />
        <div className='absolute inset-0 bg-black/40 rounded-xl' />
        <div className='absolute inset-0 flex flex-col gap-y-5 justify-end p-5 md:p-10 text-white'>
          <button className='w-fit py-2 px-4 bg-gradient-to-r from-[#FE4F70] to-[#FFA387] text-white rounded-full text-sm'>
            Inspiration
          </button>
          <Link href='/'>
            <h1 className='font-bold text-2xl'>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iusto,
              perspiciatis?
            </h1>
          </Link>
          <div className='flex items-center gap-x-5'>
            <p className='text-sm'>Hamza Ilyas</p>
            <div className='w-1 h-1 rounded-full bg-white' />
            <p className='text-sm'>March 23, 2023</p>
          </div>
        </div>
      </div>
  );
};

export default HeroSection;
