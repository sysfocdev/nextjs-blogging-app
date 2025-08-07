import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaFacebook, FaGithub, FaInstagram, FaPinterest } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className='shadow-sm'>
      <div className='mx-4 md:mx-12'>
        <div className='flex items-center justify-between flex-wrap gap-x-6 gap-y-5 py-6'>
          <div>
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
          <div className='flex items-center gap-x-6'>
            <Link href='/' className='text-sm text-gray-500'>
              About
            </Link>
            <Link href='/' className='text-sm text-gray-500'>
              Contact
            </Link>
            <Link href='/' className='text-sm text-gray-500'>
              Terms
            </Link>
            <Link href='/' className='text-sm text-gray-500'>
              Privacy Policy
            </Link>
            <Link href='/' className='text-sm text-gray-500'>
              Cookie Policy
            </Link>
          </div>
        </div>
        <div className='border-t' />
        <div className='py-6 flex items-center justify-between gap-5 flex-wrap'>
          <div>
            <p className='text-sm text-gray-500'>
              © 2025 All rights reserved. Powered by{" "}
              <Link href='/' target='_blank'>
                SYSFOC
              </Link>
            </p>
          </div>
          <div className='flex items-center gap-x-6'>
            <div>
              <Link href='/' target='_blank'>
                <FaFacebook size={20} className='text-gray-500' />
              </Link>
            </div>
            <div>
              <Link href='/' target='_blank'>
                <FaInstagram size={20} className='text-gray-500' />
              </Link>
            </div>
            <div>
              <Link href='/' target='_blank'>
                <FaXTwitter size={20} className='text-gray-500' />
              </Link>
            </div>
            <div>
              <Link href='/' target='_blank'>
                <FaPinterest size={20} className='text-gray-500' />
              </Link>
            </div>
            <div>
              <Link href='/' target='_blank'>
                <FaGithub size={20} className='text-gray-500' />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
