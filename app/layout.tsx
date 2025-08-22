import { Montserrat } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/app/(public)/components/ThemeProvider";
import { Toaster } from "react-hot-toast";
import Header from "@/app/(public)/components/Header";
import Footer from "@/app/(public)/components/Footer";
import ClientLayout from "./client-layout";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  weight: ["100","200","300","400","500","600","700","800","900"],
  subsets: ["latin"],
});

export default function RootLayout({ children }) {
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
          <ClientLayout>{children}</ClientLayout>

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
