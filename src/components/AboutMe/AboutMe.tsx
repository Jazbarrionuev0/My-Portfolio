export default async function AboutMe() {
  return (
    <section className="flex items-center flex-col md:flex-row  min-h-80">
      <div className="pr-4 md:pr-8 flex flex-col gap-3">
        <h4 className="text-base md:text-lg text-[#FF00CC] font-semibold ">HELLO, MY NAME IS JAZMIN</h4>
        <h1 className="text-7xl">I'm a software developer.</h1>
        <p className="text-3xl">
          I’m a software developer and co-founder of{" "}
          <span className="slid cursor-pointer underline decoration-[#FF00CC] decoration-8 "> NeoPixel Software </span>{" "}
          , a software studio in Argentina.
        </p>
      </div>
    </section>
  );
}