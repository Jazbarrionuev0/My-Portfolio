import WorkContainer from "@/src/components/WorkContainer/WorkContainer";
import { works } from "@/src/utils/works";
import Image from "next/image";

export default async function WorkPage() {
  return (
    <div className="max-w-3xl mx-auto md:mt-0 p-4 md:p-8 lg:p-12">
      <h2 className="font-semibold text-center text-6xl min-h-28">A little about me</h2>
      <div className="flex gap-10 justify-between">
        <Image className="w-72 rounded-sm" src={"/travel.jpg"} alt="Jazmin Barrionuevo" width={564} height={420} />
        <p className="mt-4 md:mt-6 lg:mt-8 text-sm md:text-base lg:text-lg">
          Hi! I'm Jazmin, and I'm a software developer. And yes, I do other things apart from coding, such as playing
          the games that I've coded, writing about what I've learned from coding, and sometimes even let myself go a
          little bit crazy a see Mark Zuckerberg's movie.
        </p>
      </div>
    </div>
  );
}
