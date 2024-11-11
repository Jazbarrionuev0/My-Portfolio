import { Project as ProjectType } from "@/src/types/types";
import Project from "../Projects/Project";

type Props = {
  projects: ProjectType[];
};

export default async function ProjectContainer({ projects }: Props) {
  return (
    <div className="">
      <h3 className="font-medium text-2xl pb-4 ml-4">Projects</h3>
      <div className="flex gap-7 flex-wrap">
        {" "}
        {projects.map(({ title, description, image, link, repoLink }: ProjectType, i: number) => (
          <Project key={i} title={title} description={description} image={image} link={link} repoLink={repoLink} category="All" />
        ))}
      </div>
    </div>
  );
}
