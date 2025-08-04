import Image from "next/image";

export default async function WorkPage() {
  return (
    <div className="max-w-3xl mx-auto md:mt-0 p-4 md:p-8 lg:p-12">
      <h2 className="font-semibold text-center text-5xl md:text-6xl min-h-28 flex items-center justify-center mb-12 md:mb-16">A little about me</h2>

      <div className="md:flex justify-center items-center gap-8 mb-16 md:mb-20">
        <Image
          className="w-72 rounded-sm m-auto mb-8 md:mb-0"
          src={"https://neopixel-images.nyc3.cdn.digitaloceanspaces.com/PortfolioJaz/mainphoto.jpg"}
          alt="Jazmin Barrionuevo"
          width={564}
          height={420}
        />
        <p className="md:text-base text-base lg:text-lg text-justify">
          Hi, I&apos;m Jazmin, a frontend and AI software developer with a passion for blending technology and creativity. My journey began in an
          unexpected place—studying translation after high school. I&apos;ve always been fascinated by languages, literature, and the art of
          communication. It seemed like the perfect fit. But as I delved into software localization, a spark ignited, leading me to the world of
          programming.
        </p>
      </div>

      <p className="mt-12 md:mt-16 lg:mt-20 md:text-base text-base lg:text-lg text-justify">
        I vividly remember the thrill of bringing my first project to life—a small bird that could fly, stop when hungry and soar with energy after
        eating. It was simple, yet it felt like magic. I realized then that the possibilities were limitless, and I was hooked. That sense of wonder
        has driven me ever since, pushing me to constantly learn and create.
      </p>

      <p className="mt-12 md:mt-16 lg:mt-20 md:text-base text-base lg:text-lg text-justify">
        In my final year of translation studies, I began exploring computer science in the way I knew best—by devouring books. From algorithms to data
        structures, I immersed myself in the fundamentals, eager to understand this new world I was entering.
      </p>

      <p className="mt-12 md:mt-16 lg:mt-20 md:text-base text-base lg:text-lg text-justify">
        My curiosity for the mind led me to pursue a Bachelor&apos;s in Artificial Intelligence. The idea of replicating the brain&apos;s
        functionality through code captivated me, and I dove headfirst into the vast universe of AI. The more I learned, the more I was drawn to the
        intersection of AI and software development.
      </p>

      <p className="mt-12 md:mt-16 lg:mt-20 md:text-base text-base lg:text-lg text-justify">
        Now, I&apos;m on a mission to merge my skills in frontend and backend development with my passion for AI. I&apos;m excited to see where this
        journey will take me as I continue to explore and innovate at the crossroads of technology and intelligence.
      </p>

      <p className="mt-20 md:mt-24 lg:mt-28 md:text-2xl text-base lg:text-2xl text-justify text-gray-400 font-semibold mb-12 md:mb-14">
        What about my free time?
      </p>

      <p className="mt-12 md:mt-16 lg:mt-20 md:text-base text-base lg:text-lg text-justify">
        Beyond coding, there are a few things that truly bring me joy. First and foremost, I&apos;m a huge fan of games—whether it&apos;s video games,
        board games, or anything in between. My weekends are often spent immersed in various worlds, strategizing, exploring, and having fun.
      </p>

      <p className="mt-12 md:mt-16 lg:mt-20 md:text-base text-base lg:text-lg text-justify">
        This passion extends beyond just playing; I love the process of designing and developing games as well. There&apos;s something incredibly
        satisfying about crafting a game from the ground up, from conceptual planning to the final touches. You&apos;ll likely notice some of my
        projects reflect this enthusiasm.
      </p>

      <div className="flex justify-center items-center w-full my-20 md:my-24">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-8 py-8">
          <div className="grid gap-6 md:gap-8">
            <div>
              <Image
                className="h-auto max-w-40 rounded-lg"
                src={"https://neopixel-images.nyc3.cdn.digitaloceanspaces.com/PortfolioJaz/nuevotenis.jpg"}
                alt="Jazmin Barrionuevo"
                width={564}
                height={420}
              />
            </div>
            <div>
              <Image
                className="h-auto max-w-40 rounded-lg"
                src={"https://neopixel-images.nyc3.cdn.digitaloceanspaces.com/PortfolioJaz/game.jpg"}
                alt="Jazmin Barrionuevo"
                width={564}
                height={420}
              />
            </div>

            <div>
              <Image
                className="h-auto max-w-40 rounded-lg"
                src={"https://neopixel-images.nyc3.cdn.digitaloceanspaces.com/PortfolioJaz/bariloche.jpg"}
                alt="Jazmin Barrionuevo"
                width={564}
                height={420}
              />
            </div>
          </div>
          <div className="grid gap-6 md:gap-8">
            <div>
              <Image
                className="h-auto max-w-40 rounded-lg"
                src={"https://neopixel-images.nyc3.cdn.digitaloceanspaces.com/PortfolioJaz/nuevojuego.jpg"}
                alt="Jazmin Barrionuevo"
                width={564}
                height={420}
              />
            </div>
            <div>
              <Image
                className="h-auto max-w-40 rounded-lg"
                src={"https://neopixel-images.nyc3.cdn.digitaloceanspaces.com/PortfolioJaz/book2.jpg"}
                alt="Jazmin Barrionuevo"
                width={564}
                height={420}
              />
            </div>
            <div>
              <Image
                className="h-auto max-w-40 rounded-lg"
                src={"https://neopixel-images.nyc3.cdn.digitaloceanspaces.com/PortfolioJaz/nuevojuegomesa.jpg"}
                alt="Jazmin Barrionuevo"
                width={564}
                height={420}
              />
            </div>
          </div>
          <div className="md:grid gap-6 md:gap-8 hidden ">
            <div>
              <Image
                className="h-auto max-w-40 rounded-lg"
                src={"https://neopixel-images.nyc3.cdn.digitaloceanspaces.com/PortfolioJaz/code.jpg"}
                alt="Jazmin Barrionuevo"
                width={564}
                height={420}
              />
            </div>
            <div>
              <Image
                className="h-auto max-w-40 rounded-lg"
                src={"https://neopixel-images.nyc3.cdn.digitaloceanspaces.com/PortfolioJaz/book.jpg"}
                alt="Jazmin Barrionuevo"
                width={564}
                height={420}
              />
            </div>
            <div>
              <Image
                className="h-auto max-w-40 rounded-lg"
                src={"https://neopixel-images.nyc3.cdn.digitaloceanspaces.com/PortfolioJaz/nuevocordoba.jpg"}
                alt="Jazmin Barrionuevo"
                width={564}
                height={420}
              />
            </div>
          </div>
        </div>
      </div>

      <p className="mt-12 md:mt-16 lg:mt-20 md:text-base text-base lg:text-lg text-justify">
        As cliche as it may sound, the best part of my job is being able to explore the world while doing what I love. Traveling has always been one
        of my favorite pastimes, and my computer is a constant companion on every adventure.
      </p>

      <p className="mt-12 md:mt-16 lg:mt-20 mb-16 md:mb-20 md:text-base text-base lg:text-lg text-justify">
        Of course, I never travel without a good book by my side. I&apos;m particularly drawn to mystery and romance genres, so you&apos;ll always
        find me with a story that keeps me intrigued and entertained along the way.
      </p>
    </div>
  );
}
