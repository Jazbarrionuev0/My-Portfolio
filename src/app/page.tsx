import AboutMe from "../components/AboutMe/AboutMe";
import ProjectContainer from "../components/ProjectContainer/ProjectContainer";
import Skills from "../components/Skills/Skills";
import projects from "../utils/projects";

export default async function Home() {
  return (
    <main className="max-w-7xl  mx-auto md:mt-0 ">
      <AboutMe />

      <ProjectContainer projects={projects} />
    </main>
  );
}
