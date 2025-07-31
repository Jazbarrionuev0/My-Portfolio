import { jost } from "@/src/fonts/fonts";
import "../../globals.css";
import { Toaster } from "@/src/components/ui/sonner";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/devicons/devicon@v2.15.1/devicon.min.css" />
      </head>

      <body className={`${jost.className} bg-background max-w-6xl mx-auto relative`}>
        <div className="relative z-1 flex flex-col min-h-screen">
          <main className="flex-grow">{children}</main>
          <Toaster />
        </div>
      </body>
    </html>
  );
}
