import AboutMe from "../../components/AboutMe/AboutMe";
import LatestProject from "../../components/AboutMe/latest-project";
import FilteredPortfolio from "../../components/Projects/FilteredPortfolio";
import { getPublishedProjects } from "../../actions/blog";

export default async function Home() {
  const { success, projects } = await getPublishedProjects();

  return (
    <main className="max-w-7xl mx-auto md:mt-0">
      <AboutMe />
      <LatestProject />
      <FilteredPortfolio projects={success && projects ? projects : []} />
    </main>
  );
}
