import { Work as WorkType} from "@/src/types/types";
import Work from "../Work/Work";

type Props = {
  works: WorkType[]
}
export default async function WorkContainer({works}:Props) {
  return (
    <div>
      {works.map( (work: WorkType, i: number) => <Work key={i} title={work.title} position={work.position} duration={work.duration} description={work.description} link={work.link}/>)}
    </div>
  )
}