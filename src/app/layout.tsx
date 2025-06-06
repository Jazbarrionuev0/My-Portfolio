import type { Metadata } from "next";
import "./globals.css";
import "../components/Background/particles.css";
import { Analytics } from "@vercel/analytics/react";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import { jost } from "../fonts/fonts";
import dynamic from "next/dynamic";

export const metadata: Metadata = {
  title: "Jazmin Barrionuevo - Software Developer",
  description:
    "I'm a software developer focused on frontend and artificial intelligence development. Explore my portfolio showcasing web development, AI, computer vision and data science projects.",
  keywords: [
    "Software Developer",
    "Frontend Developer",
    "AI Developer",
    "Computer Vision",
    "Data Science",
    "Portfolio",
    "Next.js",
    "React",
    "Python",
    "TensorFlow",
  ],
  authors: [
    {
      name: "Jazmin Barrionuevo",
      url: "https://github.com/Jazbarrionuev0",
    },
  ],
  openGraph: {
    title: "Jazmin Barrionuevo - Software Developer Portfolio",
    description:
      "I'm a software developer focused on frontend and artificial intelligence development. Explore my portfolio showcasing web development, AI, computer vision and data science projects.",
    url: "https://www.jazminbarrionuevo.tech",
    type: "website",
    siteName: "Jazmin Barrionuevo Portfolio",
    locale: "en_US",
    images: [
      {
        url: "https://www.jazminbarrionuevo.tech/favicon.ico",
        width: 1200,
        height: 630,
        alt: "Jazmin Barrionuevo portfolio preview",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Jazmin Barrionuevo - Software Developer",
    description:
      "I'm a software developer focused on frontend and artificial intelligence development. Explore my portfolio showcasing web development, AI, computer vision and data science projects.",
    images: ["https://www.jazminbarrionuevo.tech/favicon.ico"],
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/favicon.ico",
  },
};

const ParticlesBackground = dynamic(() => import("../components/Background/ParticlesBackground"), {
  ssr: false,
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/devicons/devicon@v2.15.1/devicon.min.css" />
      </head>

      <body className={`${jost.className} bg-background max-w-6xl mx-auto relative`}>
        <ParticlesBackground />
        <div className="relative z-1 flex flex-col min-h-screen">
          <Header />

          <main className="flex-grow">{children}</main>
          <Analytics />

          <Footer />
        </div>
      </body>
    </html>
  );
}
