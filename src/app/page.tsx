import AboutMe from "../components/AboutMe/AboutMe";
import ProjectContainer from "../components/ProjectContainer/ProjectContainer";
import Skills from "../components/Skills/Skills";
import projects from "../utils/projects";

export default async function Home() {
  return (
    <main className="max-w-3xl mx-auto md:mt-0 p-4 md:p-8 lg:p-12">
      <AboutMe/>
      <Skills/>
      <ProjectContainer projects={projects}/>
    </main>
  )
}

