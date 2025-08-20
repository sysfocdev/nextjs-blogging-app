import HeroSection from "@/app/(public)/components/home/HeroSection";
import EditorsPick from "@/app/(public)/components/home/EditorsPick";
import Trending from "@/app/(public)/components/home/Trending";
import LatestPosts from "@/app/(public)/components/home/LatestPosts";
import Sidebar from "@/app/(public)/components/home/Sidebar";
import Conclusion from "@/app/(public)/components/home/Conclusion";
export default function Home() {
  return (
    <section className='flex justify-between gap-x-6 gap-y-5'>
      <div className='w-full md:w-[68%]'>
        <HeroSection />
        <EditorsPick />
        <Trending />
        <LatestPosts />
        <Conclusion/>
        
      </div>
      <Sidebar />
    </section>
  );
}
