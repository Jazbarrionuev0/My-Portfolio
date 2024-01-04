import { Project as ProjectType} from "@/src/types/types"
import Project from "../../../../portfolio/src/components/Project/Project"

type Props = {
  projects: ProjectType[]
}

export default async function ProjectContainer({ projects }: Props) {
  return (
    <div>
      <h3 className="font-medium text-2xl pb-4">Projects</h3>
      {projects.map(({ title, description, image, link, repoLink }: ProjectType, i: number) => <Project key={i} title={title} description={description} image={image} link={link} repoLink={repoLink}/>)}
    </div>
  )
}