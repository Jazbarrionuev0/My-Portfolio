import AboutMe from "../components/AboutMe/AboutMe";
import Projects from "../components/Projects/Project";
import Skills from "../components/Skills/Skills";

export default async function Home() {
  return (
    <main className="max-w-3xl mx-auto md:mt-0 p-4 md:p-8 lg:p-12">
      <AboutMe/>
      <Skills/>
      <Projects/>
    </main>
  )
}
