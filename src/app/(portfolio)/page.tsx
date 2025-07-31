import AboutMe from "../../components/AboutMe/AboutMe";
import LatestProject from "../../components/AboutMe/latest-project";
import FilteredPortfolio from "../../components/Projects/FilteredPortfolio";
import projects from "../../utils/projects";

export default async function Home() {
  return (
    <main className="max-w-7xl mx-auto md:mt-0">
      <AboutMe />
      <LatestProject />
      <FilteredPortfolio projects={projects} />
    </main>
  );
}
