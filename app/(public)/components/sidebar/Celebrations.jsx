"use client";

import Image from "next/image";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { FaFireFlameCurved } from "react-icons/fa6";
import { useState } from "react";


const slides = [
  {
    category: "Fashion",
    image: "/banner.webp",
    author: "Hamza Ilyas",
    profile: "/blog-img.jpg",
    date: "March 23, 2023",
    title: "3 Easy Ways To Make Your iPhone Faster",
  },
  {
    category: "Travel",
    image: "/banner.webp",
    author: "Nasir Akhtar",
    profile: "/blog-img.jpg",
    date: "April 10, 2023",
    title: "Top 10 Places to Visit This Summer",
  },
  {
    category: "Food",
    image: "/banner.webp",
    author: "Muhammad Nasir",
    profile: "/blog-img.jpg",
    date: "May 5, 2023",
    title: "5 Quick Recipes for Busy Evenings",
  },
];

export default function Celebrations() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const currentSlide = slides[currentIndex];

  return (
    <div className="px-4 border border-gray-200 rounded-xl">
     
      <div className="mt-4 flex flex-col items-center justify-center">
        <div className="flex items-center">
          <FaFireFlameCurved size={20} className="mr-2 text-[#FE4F70]" />
          <h2 className="text-xl font-bold">Celebrations</h2>
        </div>
        <div className="mt-2">
          <svg width="33" height="6" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#FE4F70"></stop>
                <stop offset="100%" stopColor="#FFA387"></stop>
              </linearGradient>
            </defs>
            <path
              d="M33 1c-3.3 0-3.3 4-6.598 4C23.1 5 23.1 1 19.8 1c-3.3 0-3.3 4-6.599 4-3.3 0-3.3-4-6.6-4S3.303 5 0 5"
              stroke="url(#gradient)"
              strokeWidth="2"
              fill="none"
            ></path>
          </svg>
        </div>
      </div>

      
      <div className="p-4">
        <div className="grid grid-cols-1 gap-x-8 gap-y-5">
          <div className="relative">
            
            <div className="absolute top-4 left-4">
              <button className="w-fit py-2 px-4 bg-gradient-to-r from-[#FE4F70] to-[#FFA387] text-white rounded-full text-sm">
                {currentSlide.category}
              </button>
            </div>

            
            <div>
              <Image
                src={currentSlide.image}
                alt="slide image"
                width={300}
                height={300}
                className="size-full rounded-xl"
              />
            </div>

            
            <div className="my-3 flex items-center gap-x-5">
              <div className="flex items-center gap-x-3">
                <div className="relative w-8 h-8">
                  <Image
                    src={currentSlide.profile}
                    alt="profile"
                    fill
                    className="object-cover rounded-full"
                  />
                </div>
                <p className="text-sm font-semibold text-gray-500">
                  {currentSlide.author}
                </p>
              </div>
              <div className="w-1 h-1 rounded-full bg-[#FE4F70]" />
              <p className="text-sm text-gray-500">{currentSlide.date}</p>
            </div>

          
            <div>
              <h4 className="font-bold text-lg">{currentSlide.title}</h4>
            </div>

            {/* Arrows */}
            <div className="mt-2 flex items-center justify-center gap-3">
              <FaArrowLeft
                onClick={prevSlide}
                className="cursor-pointer border border-gray-300 text-gray-500 rounded-full p-1 text-xl hover:bg-gray-200"
                size={"25px"}
              />
              <FaArrowRight
                onClick={nextSlide}
                className="cursor-pointer border border-gray-300 text-gray-500 rounded-full p-1 text-xl hover:bg-gray-200"
                size={"25px"}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
