import WorkContainer from "@/src/components/WorkContainer/WorkContainer";
import { works } from "@/src/utils/works";

export default async function WorkPage() {
  return (
    <div className="max-w-3xl mx-auto md:mt-0 p-4 md:p-8 lg:p-12">
      <h2 className="font-semibold text-center text-6xl min-h-28">My work</h2>
      <p className="mt-4 md:mt-6 lg:mt-8 text-sm md:text-base lg:text-lg">
        I'm a software engineer dedicated to create innovative solutions with careful design, efficient programming, and
        seamless deployment.
      </p>
      <p className="text-sm md:text-base lg:text-lg">Here&lsquo;s a snapshot of my journey.</p>
      <WorkContainer works={works} />
    </div>
  );
}
