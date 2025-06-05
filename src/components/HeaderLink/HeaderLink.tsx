"use client";

import Link from "next/link";

type Props = {
  link: string;
  text: string;
  pathname: string;
};

export default function HeaderLink({ link, text, pathname }: Props) {
  const isActive = pathname === link;

  return (
    <Link href={link} className="relative group">
      <span className="p-5 inline-block hover:text-black transition-colors duration-300">{text}</span>
      <span
        className={`absolute bottom-2 left-0 right-0 mx-auto w-[70%] h-1 bg-[#FF00CC] transition-all duration-300 
          ${isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"} 
          origin-center`}
      />
    </Link>
  );
}
