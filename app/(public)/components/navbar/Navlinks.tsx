"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

const Navlinks = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch("/api/categories-with-sub") // API must return categories + subcategories
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setCategories(data.categories);
      });
  }, []);

  return (
    <nav>
      <ul className="hidden md:flex items-center gap-x-8 relative">
        <Link href="/" className="text-sm">
          Home
        </Link>

        <Link href="/categories" className="text-sm">
          Categories
        </Link>

       

          
        

        <Link href="/" className="text-sm">
          Best Wishes
        </Link>
        <Link href="/" className="text-sm">
          About Us
        </Link>
      </ul>
    </nav>
  );
};

export default Navlinks;
