import { Tag as TagType } from "@/src/types/types"
import Tag from "../Tag/Tag"

type Props = {
    tags: TagType[]
}

export default async function TagContainer({ tags }:Props) {
  return (
    <div className="flex flex-wrap justify-start items-center gap-2 my-2 mb-6">
        {tags.map(({title,className}:TagType, i: number) => <Tag key={i} title={title} className={className}/>)}
    </div>
  )
}