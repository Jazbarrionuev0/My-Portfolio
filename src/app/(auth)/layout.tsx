import { jost } from "@/src/fonts/fonts";
import "../globals.css";
import { Toaster } from "@/src/components/ui/sonner";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${jost.className} bg-background max-w-6xl mx-auto relative`}>
        <main className="flex-grow">{children}</main>
        <Toaster richColors />
      </body>
    </html>
  );
}
