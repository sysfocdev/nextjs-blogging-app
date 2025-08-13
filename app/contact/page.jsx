import { FaPhoneAlt } from "react-icons/fa";

import { IoLocationOutline } from "react-icons/io5";
import { MdOutlineEmail } from "react-icons/md";

export default function Link() {
  return (
    <>
      <section className="mt-10 px-10 w-full pb-10">
        <div className="w-full h-auto grid grid-cols-1 md:grid-cols-3 gap-3 p-4">
          <div className="border border-gray-400 flex items-center gap-2 p-4 rounded-lg">
            <FaPhoneAlt
              size={40}
              className="text-white p-2 w-12 h-12 rounded-lg bg-gradient-to-r from-[#FE4F70] to-[#FFA387]"
            />
            <div>
              <h3 className="font-bold">Phone</h3>
              <p>+92 302332323</p>
            </div>
          </div>

          <div className="border border-gray-400 flex items-center gap-2 p-4 rounded-lg">
            <MdOutlineEmail
              size={40}
              className="text-white p-2 w-12 h-12 rounded-lg bg-gradient-to-r from-[#FE4F70] to-[#FFA387]"
            />
            <div>
              <h3 className="font-bold">Email</h3>
              <p>Sys@testing.com</p>
            </div>
          </div>

          <div className="border border-gray-400 flex items-center gap-2 p-4 rounded-lg">
            <IoLocationOutline
              size={40}
              className="text-white p-2 w-12 h-12 rounded-lg bg-gradient-to-r from-[#FE4F70] to-[#FFA387]"
            />
            <div>
              <h3 className="font-bold">Location</h3>
              <p>Sydney, AUS</p>
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
        <div className="mt-8">
          <form className="w-full">
            <div className="flex flex-col md:flex-row items-center gap-4 w-full">
              <input
                className="flex-1 px-3 py-2 border rounded-full w-full"
                type="text"
                placeholder="Your Name"
              />
              <input
                className="md:w-[350px] w-full px-3 py-2 border rounded-full"
                type="email"
                placeholder="Email Address"
              />
            </div>

            <input
              className="border px-3 py-2 rounded-full w-full md:mt-5 mt-4"
              type="text"
              placeholder="Subject"
            />

            <textarea
              className="border px-3 py-2 rounded-lg w-full md:mt-5 mt-4"
              placeholder="Your Message Here"
              rows="5"
            ></textarea>

            <button className="w-fit mt-3 py-2 px-4 bg-gradient-to-r from-[#FE4F70] to-[#FFA387] text-white rounded-full text-sm font-semibold cursor-pointer">
              Submit Message
            </button>
          </form>
        </div>
      </section>
    </>
  );
}
