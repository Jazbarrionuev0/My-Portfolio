import Image from "next/image";

export default async function WorkPage() {
  return (
    <div className="max-w-3xl mx-auto md:mt-0 p-4 md:p-8 lg:p-12">
      <h2 className="font-semibold text-center text-5xl md:text-6xl min-h-28 flex items-center justify-center">A little about me</h2>
      <div className="md:flex justify-center items-center">
        <Image className="w-72 rounded-sm md:mr-5 m-auto" src={"/travel.jpg"} alt="Jazmin Barrionuevo" width={564} height={420} />
        <p className="mt-4 md:mt-6 lg:mt-8 md:text-base text-base lg:text-lg text-justify">
          Hi! I&apos;m Jazmin, and I&apos;m a software developer. And yes, I do other things apart from coding, such as
          playing the games that I&apos;ve coded, writing about what I&apos;ve learned from coding, and sometimes even
          let myself go a little bit crazy a see Mark Zuckerberg&apos;s movie.
        </p>
      </div>
      <p className="mt-4 md:mt-6 lg:mt-8 md:text-base text-base lg:text-lg text-justify">
        Hi! I&apos;m Jazmin, and I&apos;m a software developer. And yes, I do other things apart from coding, such as
        playing the games that I&apos;ve coded, writing about what I&apos;ve learned from coding, and sometimes even
        let myself go a little bit crazy a see Mark Zuckerberg&apos;s movie.
      </p>
      <p className="mt-4 md:mt-6 lg:mt-8 md:text-base text-base lg:text-lg text-justify">
        Hi! I&apos;m Jazmin, and I&apos;m a software developer. And yes, I do other things apart from coding, such as
        playing the games that I&apos;ve coded, writing about what I&apos;ve learned from coding, and sometimes even
        let myself go a little bit crazy a see Mark Zuckerberg&apos;s movie.
      </p>
      <Image className="w-full rounded-sm my-5" src={"/travel.jpg"} alt="Jazmin Barrionuevo" width={564} height={420} />
      <p className="mt-4 md:mt-6 lg:mt-8 md:text-base text-base lg:text-lg text-justify">
        Hi! I&apos;m Jazmin, and I&apos;m a software developer. And yes, I do other things apart from coding, such as
        playing the games that I&apos;ve coded, writing about what I&apos;ve learned from coding, and sometimes even
        let myself go a little bit crazy a see Mark Zuckerberg&apos;s movie.
      </p>
    </div>
  );
}
