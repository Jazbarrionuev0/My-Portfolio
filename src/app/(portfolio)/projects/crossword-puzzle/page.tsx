import Image from "next/image";

export default async function Home() {
  return (
    <div className="max-w-3xl mx-auto md:mt-0 p-4 md:p-8 lg:p-12">
      <h2 className="font-normal text-center text-6xl md:text-7xl min-h-20 md:min-h-28">Crossword puzzle</h2>
      <h2 className="font-semibold text-gray-500 text-center text-xl min-h-14">2023</h2>
      <p className=" md:mt-6 lg:mt-8 text-base md:text-base lg:text-lg">
        Esto nace de mi pasion por los juegos de mesa pero mi bajo limite en la tarjeta para poder comprarlos. Todos los viernes con mis amigos nos
        juntamos a jugar juegos de mesa en un lugar llamado La fortaleza, un lugar lleno de juegos donde nos pasabamos toda la noche divirtiendonos.
        Uno de esos juegos era <span className="font-semibold">Cross Clues </span> , un juego de pistas cooperativo que me gusto mucho.
      </p>
      <div className="flex flex-col gap-5 items-center m-5">
        <Image className="rounded-md " src={"/projects/crossword-puzzle/crosswordIMG2.jpg"} alt="crossclues" width={200} height={420} />
        <Image className="rounded-md " src={"/projects/crossword-puzzle/crosswordIMG.jpg"} alt="crossclues" width={890} height={420} />
      </div>
      <p className="mt-4 md:mt-6 lg:mt-8 text-base md:text-base lg:text-lg">
        No nos parecio complejo el mecanismo de juego, asi que que con un amigo decidimos recrearlo virtualmente para poder jugarlo entre nosotros.
      </p>
      <div className="flex flex-col gap-5 items-center m-5">
        <Image className="rounded-md " src={"/projects/crossword-puzzle/crosscluesIMG3.png"} alt="crossclues" width={1916} height={943} />
        <Image className="rounded-md " src={"/projects/crossword-puzzle/crosscluesIMG4.png"} alt="crossclues" width={1506} height={936} />
      </div>
      <div className="m-10">
        <hr className=" w-[40%] bg-portfolio-accent h-[2px] m-auto " />
      </div>

      <h2 className="font-normal text-3xl ">El Desarrollo</h2>
      <p className="mt-4 md:mt-6 lg:mt-8 text-base md:text-base lg:text-lg">
        No nos parecio complejo el mecanismo de juego, asi que que con un amigo decidimos recrearlo virtualmente para poder jugarlo entre nosotros.
      </p>
    </div>
  );
}
