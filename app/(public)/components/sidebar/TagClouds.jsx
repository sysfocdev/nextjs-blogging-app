import Link from "next/link";
import { FaFireFlameCurved } from "react-icons/fa6";

export default  function TagClouds(){
    return(
        <div className='px-4 border border-gray-200 rounded-xl'>
        <div className='mt-4 flex flex-col items-center justify-center'>
          <div className='flex items-center'>
            <FaFireFlameCurved size={20} className='mr-2 text-[#FE4F70]' />
            <h2 className='text-xl font-bold'>Tag Clouds</h2>
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
        <div className="my-6" >
         <div className="flex flex-wrap gap-3">
         <p className="text-xs text-gray-400 px-2 py-1 border-gray-400 border-1 w-fit rounded-full">#Audio</p>
          <p className="text-xs text-gray-400 px-2 py-1 border-gray-400 border-1 w-fit rounded-full">#Content</p>
          <p className="text-xs text-gray-400 px-2 py-1 border-gray-400 border-1 w-fit rounded-full">#Featured</p>
          <p className="text-xs text-gray-400 px-2 py-1 border-gray-400 border-1 w-fit rounded-full">#Image</p>
          <p className="text-xs text-gray-400 px-2 py-1 border-gray-400 border-1 w-fit rounded-full">#Inpiration</p>
          <p className="text-xs text-gray-400 px-2 py-1 border-gray-400 border-1 w-fit rounded-full">#Lifestyle</p>
          <p className="text-xs text-gray-400 px-2 py-1 border-gray-400 border-1 w-fit rounded-full">#Photo</p>
          <p className="text-xs text-gray-400 px-2 py-1 border-gray-400 border-1 w-fit rounded-full">#Pick</p>
          <p className="text-xs text-gray-400 px-2 py-1 border-gray-400 border-1 w-fit rounded-full">#Slide</p>
          <p className="text-xs text-gray-400 px-2 py-1 border-gray-400 border-1 w-fit rounded-full">#Trending</p>
         </div>
        </div>
      </div>
    )
}