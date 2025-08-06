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
          Hi, I&apos;m Jazmin, a data scientist and AI enthusiast with a deep passion for uncovering the stories hidden within data. My journey into technology started in an unexpected place, studying translation after high school. I&apos;ve always been fascinated by language, communication, and meaning, and at first, that fascination led me to literature. But while working on software localization projects, I discovered something else that captivated me: code.
        </p>
      </div>

      <p className="mt-12 md:mt-16 lg:mt-20 md:text-base text-base lg:text-lg text-justify">
        It all started with a simple interactive project: a bird that could fly, stop when hungry, and regain energy after eating. Watching it come to life sparked something in me. It was more than just programming, it was about building behavior, logic, and systems. From there, I was hooked.
      </p>

      <p className="mt-12 md:mt-16 lg:mt-20 md:text-base text-base lg:text-lg text-justify">
        As I approached the end of my translation degree, I began diving deep into computer science on my own, driven by curiosity. I devoured books on algorithms, data structures, and eventually machine learning. That curiosity soon evolved into a more focused interest: artificial intelligence. The idea of simulating aspects of human cognition fascinated me, especially from a data-driven lens. I&apos;m now pursuing a degree in AI and Data Science, combining my love for logical problem-solving with my passion for human understanding.

      </p>

      <p className="mt-12 md:mt-16 lg:mt-20 md:text-base text-base lg:text-lg text-justify">
        My focus lies in making sense of complex data, whether through predictive models, data visualizations, or intelligent systems. I&apos;m particularly interested in the intersection of AI and software development, where frontend design meets backend intelligence. I love building tools that are not only smart, but also intuitive and meaningful to use.
      </p>

      {/* <p className="mt-20 md:mt-24 lg:mt-28 md:text-2xl text-base lg:text-2xl text-justify text-gray-400 font-semibold mb-12 md:mb-14">
        What about my free time?
      </p> */}

      <p className="mt-12 md:mt-16 lg:mt-20 md:text-base text-base lg:text-lg text-justify">
        Outside of work and study, I&apos;m a big fan of games. Whether it&apos;s designing them or playing them. The logic, storytelling, and systems-thinking behind games often mirror the challenges I enjoy in data science. I also love to travel and always carry a book with me (mystery and romance are my go-to genres).

      </p>
      <p className="mt-12 md:mt-16 lg:mt-20 md:text-base text-base lg:text-lg text-justify">
        Whether I&apos;m analyzing a dataset, developing an AI-powered tool or even learning the rules of a new board game, I&apos;m driven by the same motivation: to learn continuously, explore new perspectives, and use data to build things that make a difference.
      </p>

      {/* <p className="mt-12 md:mt-16 lg:mt-20 md:text-base text-base lg:text-lg text-justify">
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
      </p> */}
    </div>
  );
}
