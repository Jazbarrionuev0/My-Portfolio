import { Tag } from "@/src/types/types";

export default async function Tag({ title, className }: Tag) {
    return (
        <div className="inline-flex rounded-lg justify-center items-center min-h-8 bg-gray-100" >
            <i className={`${className} p-2`}></i>
            <p className="flex justify-center items-center pr-2">{title}</p>
        </div>
    )
}