import Skills from "@/src/components/Skills/Skills";
import WorkContainer from "@/src/components/WorkContainer/WorkContainer";
import { works } from "@/src/utils/works";

export default async function WorkPage() {
  return (
    <div className="max-w-3xl mx-auto md:mt-0 p-4 md:p-8 lg:p-12">
      <h2 className="font-semibold text-center text-5xl md:text-6xl min-h-28 flex items-center justify-center">My software skills</h2>
      <p className="mt-4 md:mt-6 lg:mt-8 md:text-base text-base lg:text-lg text-justify">
        Hey there! So, along my journey, I&apos;ve picked up quite a few things . Some from college, some from work, but
        mostly because I just couldn&apos;t resist diving into them. I know some more thant others but you&apos;ll see
        bits of each of these reflected on my projects and everyday work.
      </p>

      <Skills />
    </div>
  );
}
