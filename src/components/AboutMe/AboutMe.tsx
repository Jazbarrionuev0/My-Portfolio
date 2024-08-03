export default async function AboutMe() {
  return (
    <section className="flex items-center  flex-col md:flex-row  min-h-80">
      <div className="px-4 md:pr-8 flex flex-col gap-3">
        <h4 className="text-sm md:text-lg text-[#FF00CC] font-semibold ">HELLO, MY NAME IS JAZMIN</h4>
        <h1 className="text-5xl md:text-7xl">I&apos;m a software developer.</h1>
        <p className="text-2xl md:text-3xl">
          I’m a software developer focus on frontend and artificial intelligence development.
          {/* <span className="slid cursor-pointer underline decoration-[#FF00CC] decoration-8 "> NeoPixel Software </span>{" "} */}
        </p>
      </div>
    </section>
  );
}
