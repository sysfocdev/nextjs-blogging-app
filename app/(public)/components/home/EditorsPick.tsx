import Image from "next/image";
import Link from "next/link";
import React from "react";
const data = [
  {
    id: 1,
    title: "What Can You Do About Fashion Right Now",
    date: "August 17, 2022",
  },
  {
    id: 2,
    title: "3 Easy Ways To Make Your iPhone Faster",
    date: "August 17, 2022",
  },
  {
    id: 3,
    title: "Facts About Business That Will Help You Success",
    date: "August 17, 2022",
  },
  {
    id: 4,
    title: "Your Light Is About To Stop Being Relevant",
    date: "August 17, 2022",
  },
];
const EditorsPick = () => {
  return (
    <section className='mt-12'>
      <div className='my-4'>
        <div className='flex items-center'>
          <h3 className='text-2xl font-bold'>Editor&apos;s Pick</h3>
        </div>
        <div className='mt-2'>
          <svg width='33' height='6' xmlns='http://www.w3.org/2000/svg'>
            <defs>
              <linearGradient id='gradient' x1='0%' y1='0%' x2='100%' y2='0%'>
                <stop offset='0%' stopColor='#FE4F70'></stop>
                <stop offset='100%' stopColor='#FFA387'></stop>
              </linearGradient>
            </defs>
            <path
              d='M33 1c-3.3 0-3.3 4-6.598 4C23.1 5 23.1 1 19.8 1c-3.3 0-3.3 4-6.599 4-3.3 0-3.3-4-6.6-4S3.303 5 0 5'
              stroke='url(#gradient)'
              strokeWidth='2'
              fill='none'
            ></path>
          </svg>
        </div>
      </div>
      <div className='border border-gray-200/70 rounded-xl'>
        <div className='p-4'>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-5'>
            <div className='relative'>
              <div className='absolute top-4 left-4'>
                <button className='w-fit py-2 px-4 bg-gradient-to-r from-[#FE4F70] to-[#FFA387] text-white rounded-full text-sm'>
                  Fashion
                </button>
              </div>
              <div>
                <Image
                  src='/banner.webp'
                  alt='image'
                  width={300}
                  height={300}
                  className='size-full rounded-xl'
                />
              </div>
              <div className='my-3 flex items-center gap-x-5'>
                <div className='flex items-center gap-x-3'>
                  <div className='relative w-8 h-8'>
                    <Image
                      src='/blog-img.jpg'
                      alt='profile'
                      fill
                      className='object-cover rounded-full'
                    />
                  </div>
                  <p className='text-sm font-semibold'>Hamza Ilyas</p>
                </div>
                <div className='w-1 h-1 rounded-full bg-[#FE4F70]' />
                <p className='text-sm'>March 23, 2023</p>
              </div>
              <div>
                <h4 className='font-bold text-xl'>
                  3 Easy Ways To Make Your iPhone Faster
                </h4>
                <p className='mt-2 text-gray-500'>
                  The European languages are members of the same family. Their
                  separate existence is a myth. For science, music, sport,
                  etc...
                </p>
              </div>
            </div>
            <div className='flex flex-col'>
              {data?.map((post, index) => (
                <div
                  key={post?.id}
                  className={`flex items-center gap-x-5 pb-4 ${
                    index !== 0 ? "pt-4 border-t border-gray-200/70" : ""
                  }`}
                >
                  <div className='w-[100px] h-[80px] rounded-md overflow-hidden relative shrink-0'>
                    <Image
                      src='/blog-img.jpg'
                      alt='blog-image'
                      fill
                      className='object-cover'
                      fetchPriority='high'
                      priority
                    />
                  </div>
                  <div>
                    <Link href='/'>
                      <h3 className='font-bold'>{post?.title}</h3>
                    </Link>
                    <p className='text-xs text-gray-400 mt-1'>{post?.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EditorsPick;
