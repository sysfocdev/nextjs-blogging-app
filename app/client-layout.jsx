"use client";

import { usePathname } from "next/navigation";
import Header from "@/app/(public)/components/Header";
import Footer from "@/app/(public)/components/Footer";

export default function ClientLayout({ children }) {
  const pathname = usePathname();
  const isDashboard = pathname.startsWith("/dashboard");

  return (
    <>
      {!isDashboard && <Header />}
      {children}
      {!isDashboard && <Footer />}
    </>
  );
}
