"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

type Props = {
  link: string;
  children: React.ReactNode;
};

export default function HeaderLink({ link, children }: Props) {
  const pathname = usePathname();

  return (
    <Link href={link} className="">
      <span
        className={`p-5 pb-1 hover:text-black transition-colors duration-300 ${pathname === link ? "underline decoration-[#FF00CC] decoration-4 " : "slide pb-0"
          }`}
      >
        {children}
      </span>
    </Link>
  );
}
