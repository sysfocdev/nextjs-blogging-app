import { FaPhoneAlt } from "react-icons/fa";
import { IoLocationOutline } from "react-icons/io5";
import { MdOutlineEmail } from "react-icons/md";

export default function ContactSection() {
  return (
    <>
      <section className="mt-10 px-6 md:px-10 w-full pb-10">
        {/* Contact Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="border border-gray-300 flex items-center gap-3 p-4 rounded-lg shadow-sm">
            <FaPhoneAlt
              size={40}
              className="text-white p-2 w-12 h-12 rounded-lg bg-gradient-to-r from-[#FE4F70] to-[#FFA387]"
            />
            <div>
              <h3 className="font-bold">Phone</h3>
              <p className="text-sm text-gray-600">+92 302332323</p>
            </div>
          </div>

          <div className="border border-gray-300 flex items-center gap-3 p-4 rounded-lg shadow-sm">
            <MdOutlineEmail
              size={40}
              className="text-white p-2 w-12 h-12 rounded-lg bg-gradient-to-r from-[#FE4F70] to-[#FFA387]"
            />
            <div>
              <h3 className="font-bold">Email</h3>
              <p className="text-sm text-gray-600">Sys@testing.com</p>
            </div>
          </div>

          <div className="border border-gray-300 flex items-center gap-3 p-4 rounded-lg shadow-sm">
            <IoLocationOutline
              size={40}
              className="text-white p-2 w-12 h-12 rounded-lg bg-gradient-to-r from-[#FE4F70] to-[#FFA387]"
            />
            <div>
              <h3 className="font-bold">Location</h3>
              <p className="text-sm text-gray-600">Sydney, AUS</p>
            </div>
          </div>
        </div>

        {/* Send Message */}
        <div className="mt-10">
          <h3 className="text-2xl font-bold flex items-center gap-2">
            Send Message
          </h3>
          <svg width="33" height="6" className="mt-2" xmlns="http://www.w3.org/2000/svg">
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

          <form className="mt-6 space-y-4">
            <div className="flex flex-col md:flex-row gap-4">
              <input
                className="flex-1 px-4 py-3 border rounded-full focus:outline-none focus:ring-2 focus:ring-[#FE4F70]"
                type="text"
                placeholder="Your Name"
              />
              <input
                className="flex-1 px-4 py-3 border rounded-full focus:outline-none focus:ring-2 focus:ring-[#FE4F70]"
                type="email"
                placeholder="Email Address"
              />
            </div>

            <input
              className="w-full px-4 py-3 border rounded-full focus:outline-none focus:ring-2 focus:ring-[#FE4F70]"
              type="text"
              placeholder="Subject"
            />

            <textarea
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FE4F70]"
              placeholder="Your Message Here"
              rows="5"
            ></textarea>

            <button
              type="submit"
              className="mt-4 py-3 px-6 bg-gradient-to-r from-[#FE4F70] to-[#FFA387] text-white rounded-full text-sm font-semibold shadow-md hover:shadow-lg transition-all duration-200"
            >
              Submit Message
            </button>
          </form>
        </div>
      </section>
    </>
  );
}
