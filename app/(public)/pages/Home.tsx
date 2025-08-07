import HeroSection from "@/app/(public)/components/home/HeroSection";
import Sidebar from "@/app/(public)/components/home/Sidebar";
export default function Home() {
    return (
        <section className="flex justify-between gap-x-6 gap-y-5">
            <HeroSection/>
            <Sidebar/>
        </section>
    );
}