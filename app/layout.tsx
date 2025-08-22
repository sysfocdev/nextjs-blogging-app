"use client";

import { usePathname } from "next/navigation";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/app/(public)/components/ThemeProvider";
import Header from "@/app/(public)/components/Header";
import Footer from "@/app/(public)/components/Footer";
import { Toaster } from "react-hot-toast";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

export default function RootLayout({ children }) {
  const pathname = usePathname();

  // check if current path starts with "/dashboard"
  const isDashboard = pathname.startsWith("/dashboard");

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${montserrat.className} antialiased max-w-[1680px] mx-auto`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {!isDashboard && <Header />}
          {children}
          {!isDashboard && <Footer />}

          <Toaster
            reverseOrder={false}
            toastOptions={{
              duration: 2000,
            }}
          />
        </ThemeProvider>
      </body>
    </html>
  );
}
