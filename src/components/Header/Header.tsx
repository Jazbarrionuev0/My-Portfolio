import HeaderLink from "../HeaderLink/HeaderLink";
import Link from "next/link";
import Image from "next/image";
const Header = () => {
  return (
    <header className=" w-full py-4 my-2 md:py-8 md:my-4 flex justify-between ">
      <Link href="/" className="hover:text-[#FF00CC] font-semibold">
        <div className="flex items-center gap-3 ">
          <Image
            className="rounded-full w-10"
            src={"/jazfoto.jpeg"}
            alt="Jazmin Barrionuevo"
            width={200}
            height={200}
          />
          <p>Jazmin Barrionuevo</p>
        </div>
      </Link>
      <div>
        <HeaderLink link="/">Home</HeaderLink>
        <HeaderLink link="/skills">Skills</HeaderLink>
        <HeaderLink link="/work">Work</HeaderLink>
        <HeaderLink link="/about">About</HeaderLink>
      </div>
    </header>
  );
};

export default Header;
