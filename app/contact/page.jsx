import { FaPhoneAlt } from "react-icons/fa";


import { IoLocationOutline } from "react-icons/io5";
import { MdOutlineEmail } from "react-icons/md";

export default function Link() {
  return (
    <>
      <section className="mt-12 px-10">
        <div className="w-full h-30 grid grid-cols-1 md:grid-cols-3 gap-3 p-4">
          <div className="border-1 border-gray-500 flex items-center  gap-2 pl-10   rounded-lg">
            <div><FaPhoneAlt size={"40px"} className="bg-red-400 text-white p-2 w-12 h-12 rounded-lg"/></div>
            <div >
                <h3 className="font-bold">Phone</h3>
                <p>+92 302332323</p>
            </div>
          </div>
          <div className="border-1 border-gray-500 flex items-center  gap-2 pl-10   rounded-lg">
            <div><MdOutlineEmail size={"40px"} className="bg-red-400 p-2 w-12 h-12 text-white rounded-lg"/></div>
            <div>
                <h3 className="font-bold">Email</h3>
                <p>Sys@testing.com</p>
            </div>
          </div>
          <div className="border-1 border-gray-500 flex items-center  gap-2 pl-10   rounded-lg">
            <div><IoLocationOutline size={"40px"} className="bg-red-400 text-white p-2 w-12 h-12 rounded-lg"/></div>
            <div >
                <h3 className="font-bold">Location</h3>
                <p className="text-gray-500">Sydney, AUS</p>
            </div>
          </div>
        </div>
        <div className="my-4">
          <div className="flex items-center">
            <h3 className="text-2xl font-bold">Send Message</h3>
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
      </section>
    </>
  );
}
