import { Facebook, Linkedin, MailIcon, Twitter } from "lucide-react";
import Image from "next/image";
import { BsTelegram, BsWhatsapp } from "react-icons/bs";

export default function Conclusion() {
  return (
    <section className="mt-12">
      <div className="rounded-xl">
        <div className="w-full flex flex-col md:flex-row items-center justify-between gap-3 h-auto md:h-[350px]">
          <div className="w-full md:w-[50%] h-[200px] md:h-[100%]">
            <Image
              src="/blog-img.jpg"
              alt="blog-image"
              width={1200}
              height={800}
              className="object-cover w-full h-full rounded-lg"
            />
          </div>
          <div className="w-full md:w-[50%] h-[200px] md:h-[100%]">
            <Image
              src="/blog-img.jpg"
              alt="blog-image"
              width={1200}
              height={800}
              className="object-cover w-full h-full rounded-lg"
            />
          </div>
        </div>
      </div>

      <div className="my-4">
        <div className="flex items-center">
          <h3 className="text-2xl font-bold">Conclusion</h3>
        </div>
        <div className="mt-2 ml-6 md:ml-10">
          <ul className="text-gray-400 list-disc">
            <li>How About if I sleep a little bit</li>
            <li>How About if I sleep a little bit</li>
            <li>How About if I sleep a little bit</li>
            <li>How About if I sleep a little bit</li>
            <li>How About if I sleep a little bit</li>
          </ul>
        </div>
        <div className="mt-3 text-gray-500 tracking-tight">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro quis
            ipsum expedita{" "}
            <span className="text-red-500">perspiciatis</span> est et velit quae
            in tenetur harum. Accusamus, aspernatur quos? Incidunt quis earum
            culpa quae voluptas? Rem a nam vel, fugit soluta quis tempore porro?
            Voluptate, dolorum?
          </p>
        </div>
      </div>

      <div className="w-full bg-gray-200 h-0.5"></div>

      <div className="flex flex-col md:flex-row items-center justify-between gap-3 mt-4">
        <div className="flex items-center gap-3 text-[#4b71a9]">
          <Facebook />
          <Twitter />
          <Linkedin />
          <BsWhatsapp />
          <BsTelegram />
          <MailIcon />
        </div>
        <div className="flex flex-wrap items-center gap-2 text-sm text-gray-400 mt-3 md:mt-0">
          <p className="px-2 py-1 rounded-full border">#Audio</p>
          <p className="px-2 py-1 rounded-full border">#Featured</p>
          <p className="px-2 py-1 rounded-full border">#Image</p>
        </div>
      </div>

      <div className="bg-blue-200 w-full mt-5 rounded-lg px-4 md:px-6 py-4 flex flex-col md:flex-row items-center gap-4">
        <div className="w-24 h-24 rounded-full overflow-hidden">
          <Image
            src="/blog-img.jpg"
            alt="blog-image"
            width={1200}
            height={800}
            className="object-cover w-full h-full"
          />
        </div>
        <div className="flex-1 text-center md:text-left">
          <h3 className="font-semibold">Muhammad Nasir</h3>
          <p className="text-sm tracking-tight mt-2">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam
            corrupti laudantium dolores dolor laboriosam aliquam fugiat enim
            alias asperiores atque?
          </p>
          <div className="flex justify-center md:justify-start items-center gap-3 mt-2 text-[#4b71a9]">
            <Facebook />
            <Twitter />
            <Linkedin />
            <BsWhatsapp />
            <BsTelegram />
            <MailIcon />
          </div>
        </div>
      </div>
    </section>
  );
}
