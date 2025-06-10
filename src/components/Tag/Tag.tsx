import { Tag as TagType } from "@/src/types/types";

export default async function Tag({ title, className }: TagType) {
  return (
    <div className="inline-flex rounded-lg justify-center items-center min-h-9 bg-pink-50 hover:bg-pink-100 border border-pink-200 transition-colors duration-200 group px-3 gap-2">
      {className && <i className={`${className} colored text-lg transition-transform group-hover:scale-110`}></i>}
      <p className="flex justify-center items-center text-sm font-medium text-gray-800">{title}</p>
    </div>
  );
}
