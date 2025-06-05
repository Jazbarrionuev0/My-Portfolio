"use client";

import HeaderLink from "../HeaderLink/HeaderLink";
import Link from "next/link";
import Image from "next/image";
import { Squash as Hamburger } from "hamburger-react";
import { useClickAway } from "react-use";
import { useRef } from "react";
import { useState } from "react";
import { routes } from "../HeaderLink/MobileLinks";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";

const links = [
  {
    link: "/",
    text: "Home",
  },
  {
    link: "/skills",
    text: "Skills",
  },
  {
    link: "/work",
    text: "Work",
  },
  {
    link: "/about",
    text: "About",
  },
];

const Header = () => {
  const [isOpen, setOpen] = useState(false);
  const ref = useRef(null);
  const pathname = usePathname();

  useClickAway(ref, () => setOpen(false));
  return (
    <header className=" w-full py-4 my-2 md:py-8 md:my-4 flex justify-between  ">
      <Link href="/" className="hover:text-[#FF00CC] font-semibold ml-4 md:ml-0">
        <div className="flex items-center gap-3 md:relative z-20">
          <Image className="rounded-full w-10" src={"/jazfoto.jpg"} alt="Jazmin Barrionuevo" width={200} height={200} />
          <p>Jazmin Barrionuevo</p>
        </div>
      </Link>
      <div className="hidden md:flex md:flex-row md:items-center">
        {links.map(({ link, text }, index) => (
          <motion.div
            key={link}
            className="inline-flex"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.3,
              delay: 0.1 + index * 0.1,
              ease: "easeInOut",
            }}
          >
            <HeaderLink pathname={pathname} link={link} text={text} />
          </motion.div>
        ))}
      </div>
      <div className="md:hidden w-screen">
        <div className="absolute z-50 right-0">
          <Hamburger toggled={isOpen} size={28} toggle={setOpen} color="#FF00CC" />
        </div>

        <div className="absolute">
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="fixed h-[100vh] z-40 left-0 shadow-4xl right-0 top-0 p-5 pt-24  bg-neutral-950 "
              >
                <ul className="grid gap-2">
                  {routes.map((route, idx) => {
                    return (
                      <motion.li
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{
                          type: "spring",
                          stiffness: 260,
                          damping: 20,
                          delay: 0.1 + idx / 10,
                        }}
                        key={route.title}
                        className="w-full text-3xl p-[0.08rem] hover:underline decoration-[#FF00CC] decoration-4 rounded-xl text-white "
                      >
                        <a
                          onClick={() => setOpen((prev) => !prev)}
                          className={"flex items-end w-full p-5 rounded-xl bg-neutral-950"}
                          href={route.href}
                        >
                          <span className="text-xl pr-2">{route.number}</span>
                          <span className="flex gap-1 text-3xl ">{route.title}</span>
                        </a>
                      </motion.li>
                    );
                  })}
                </ul>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
};

export default Header;
