"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type Props = {
  link: string;
  text: string;
  pathname: string;
};

export default function HeaderLink({ link, text, pathname }: Props) {
  return (
    <Link href={link} className="">
      <span
        className={`p-5 pb-1 hover:text-black transition-colors duration-300 ${
          pathname === link ? "underline decoration-[#FF00CC] decoration-4 " : "slide pb-0"
        }`}
      >
        {text}
      </span>
    </Link>
  );
}
