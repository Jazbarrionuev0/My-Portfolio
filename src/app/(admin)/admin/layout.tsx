import { jost } from "@/src/fonts/fonts";
import "../../globals.css";
import { Toaster } from "@/src/components/ui/sonner";
import Link from "next/link";
import { getAuthPayload } from "@/src/lib/auth";
import LogoutButton from "./components/LogoutButton";
import Nav from "./blog/components/Nav";
import { ThemeProvider } from "@/src/components/providers/theme-provider";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const authPayload = await getAuthPayload();

  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/devicons/devicon@v2.15.1/devicon.min.css" />
      </head>

      <body className={`${jost.className} min-h-screen bg-admin-bg text-admin-text`}>
        {/* <Nav /> */}
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <div className="max-w-6xl mx-auto bg-admin-bg">
            <main className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">{children}</main>
          </div>
          <Toaster richColors position="top-right" expand={true} duration={4000} />
        </ThemeProvider>
      </body>
    </html>
  );
}
