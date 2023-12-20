import { Blog as BlogType } from "@/src/types/types"
import Blog from "../Blog/Blog"

type Props = {
    blogs: BlogType[]
}

export default async function BlogContainer({ blogs }: Props) {
    return (
        <div>
            {blogs.map(({title,views}:BlogType, i:number) => <Blog key={i} title={title} views={views}/>)}
        </div>
    )
}