import type { Metadata } from "next";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react"
import { Poppins } from "next/font/google";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import Image from "next/image";
import { jost } from "../fonts/fonts";
import Link from "next/link";
const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});
export const metadata: Metadata = {
  title: "Jazmin Barrionuevo",
  description: "Jazmin Barrionuevo Website",

};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/devicons/devicon@v2.15.1/devicon.min.css" />
      </head>

      <body className={`${jost.className} bg-[#F6F6EF] max-w-6xl mx-auto `}>
        <Header />

        {children}
        <Analytics />

        <Footer />
      </body>
    </html>
  );
}
