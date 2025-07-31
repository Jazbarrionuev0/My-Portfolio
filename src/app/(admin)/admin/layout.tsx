import { jost } from "@/src/fonts/fonts";
import "../../globals.css";
import { Toaster } from "@/src/components/ui/sonner";
import Link from "next/link";
import { getAuthPayload } from "@/src/lib/auth";
import LogoutButton from "./components/LogoutButton";
import Nav from "./blog/components/Nav";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const authPayload = await getAuthPayload();

  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/devicons/devicon@v2.15.1/devicon.min.css" />
      </head>

      <body className={`${jost.className} bg-gray-50 min-h-screen`}>
        {/* <Nav /> */}
        <div className="max-w-6xl mx-auto">
          <main className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">{children}</main>
        </div>
        <Toaster richColors position="top-right" expand={true} duration={4000} />
      </body>
    </html>
  );
}
