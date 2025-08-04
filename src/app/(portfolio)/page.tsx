import AboutMe from "../../components/AboutMe/AboutMe";
import LatestProject from "../../components/AboutMe/latest-project";
import FilteredPortfolio from "../../components/Projects/FilteredPortfolio";
import { getPublishedProjects, getAllCategories } from "../../actions/blog";

export default async function Home() {
  const { success, projects } = await getPublishedProjects();
  const { success: categoriesSuccess, categories } = await getAllCategories();

  return (
    <main className="max-w-7xl mx-auto md:mt-0">
      <AboutMe />
      <LatestProject />
      <FilteredPortfolio projects={success && projects ? projects : []} categories={categoriesSuccess && categories ? categories : []} />
    </main>
  );
}
