import Skills from "@/src/components/Skills/Skills";
import WorkContainer from "@/src/components/WorkContainer/WorkContainer";
import { works } from "@/src/utils/works";

export default async function WorkPage() {
  return (
    <div className="max-w-3xl mx-auto md:mt-0 p-4 md:p-8 lg:p-12">
      <h2 className="font-semibold text-center text-6xl min-h-28">My software skills</h2>
      <p className="mt-4 md:mt-6 lg:mt-8 text-sm md:text-base lg:text-lg">
        Hey there! So, along my journey, I've picked up quite a few things . Some from college, some from work, but
        mostly because I just couldn't resist diving into them. I know some more thant others but you'll see bits of
        each of these reflected on my projects and everyday work.
      </p>

      <Skills />
    </div>
  );
}
