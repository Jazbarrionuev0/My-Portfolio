import TagContainer from "@/src/components/TagContainer/TagContainer";
import { CelebrityClassifier } from "@/src/utils/tags";

export default async function Home() {
  return (
    <div className="max-w-3xl mx-auto md:mt-0 p-4 md:p-8 lg:p-12">
      <h2 className="font-normal text-center text-7xl min-h-28">Celeberity Image Classification</h2>
      <h2 className="font-semibold text-gray-500 text-center text-xl min-h-28">2024</h2>
      <div className="">
        <p className="mb-3 text-sm text-right ">0-minute read</p>
        <TagContainer tags={CelebrityClassifier} />
      </div>
      <div className="max-w-3xl mx-auto md:mt-0 p-4 md:p-8 lg:p-12 text-justify"></div>
    </div>
  );
}
