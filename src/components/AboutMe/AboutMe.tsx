import Image from "next/image"

export default async function AboutMe() {
  return (
    <section className="flex items-center flex-col md:flex-row justify-center">
      <div className="pr-4 md:pr-8">
        <h1 className="text-3xl md:text-5xl font-bold">Jazmin Barrionuevo</h1>
        <h4 className="text-base md:text-lg text-gray-600 font-semibold">Sofware Developer</h4>
        <p className="pt-2 md:pt-4 text-gray-900 font-normal text-sm md:text-base">
          idk
        </p>
      </div>
      <div className="mt-4 md:mt-0 ml-0 md:ml-8 min-w-40 w-40">
        <Image
          className="rounded-full"
          src={'/jazfoto.png'}
          alt="Jazmin Barrionuevo"
          width={200}
          height={200}
        />
      </div>
    </section>
  )
}