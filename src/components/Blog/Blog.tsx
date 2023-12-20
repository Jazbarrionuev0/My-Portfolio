import { Blog } from "@/src/types/types";

export default async function Blog({ title, views }: Blog) {
    return (
        <div className="my-5">
            <h3 className="cursor-pointer">{title}</h3>
            <span className="font-light">{views} views</span>
        </div>
    )
}