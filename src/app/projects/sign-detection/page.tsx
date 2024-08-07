import Image from "next/image";

export default async function Home() {
  return (
    <div className="max-w-3xl mx-auto md:mt-0 p-4 md:p-8 lg:p-12">
      <h2 className="font-normal text-center text-7xl min-h-28">Sign Language Detection</h2>
      <h2 className="font-semibold text-gray-500 text-center text-xl min-h-28">2024</h2>
      <p className="my-3">This simple yet effective website was designed for a themed bar, accessible via a QR code. Once scanned, users can navigate through various menu options.  </p>
      <Image className="w-full rounded-sm  m-auto" src={"/area51.gif"} alt="Jazmin Barrionuevo" width={564} height={420} />
      <p className="my-3">Optimized primarily for mobile devices, it ensures a easy experience for customers without any issues or complications. </p>

      <div className="flex flex-wrap justify-center items-center gap-5 ">
        <Image className="w-48 rounded-sm " src={"/areamenuweb.png"} alt="Jazmin Barrionuevo" width={564} height={420} />
        <Image className="w-48 rounded-sm " src={"/areamenu.png"} alt="Jazmin Barrionuevo" width={564} height={420} />

      </div>
      <p className="my-3">The website was built using HTML, CSS, and JavaScript due to its straightforward nature and lack of complexity.</p>

    </div>
  );
}
