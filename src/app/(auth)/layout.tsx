import { jost } from "@/src/fonts/fonts";
import "../globals.css";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${jost.className} bg-background max-w-6xl mx-auto relative`}>
        <main className="flex-grow">{children}</main>
      </body>
    </html>
  );
}
