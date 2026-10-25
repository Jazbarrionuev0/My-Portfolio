import AboutMe from "../../components/AboutMe/AboutMe";
import LatestProject from "../../components/AboutMe/latest-project";
import FilteredPortfolio from "../../components/Projects/FilteredPortfolio";
import { getPublishedProjects } from "../../actions/blog";
import staticProjects from "../../utils/projects";
import { PortfolioCard } from "../../types/types";

export const dynamic = "force-dynamic";

export default async function Home() {
  const { success, projects } = await getPublishedProjects();
  const databaseProjects: PortfolioCard[] = success && projects
    ? projects.map((project) => ({
        id: `post:${project.id}`,
        title: project.title,
        description: project.excerpt || "Click to read more about this project...",
        image: project.featuredImage,
        href: `/blog/${project.slug}`,
        category: project.category.title,
      }))
    : [];

  const databaseTitles = new Set(databaseProjects.map((project) => project.title.trim().toLowerCase()));
  const recoveredProjects: PortfolioCard[] = staticProjects
    .filter((project) => !databaseTitles.has(project.title.trim().toLowerCase()))
    .map((project) => ({
      id: `static:${project.link}`,
      title: project.title.trim(),
      description: project.description.trim(),
      image: project.image || null,
      href: project.link,
      category: project.category,
    }));

  return (
    <main className="max-w-7xl mx-auto md:mt-0">
      <AboutMe />
      <LatestProject />
      <FilteredPortfolio projects={[...databaseProjects, ...recoveredProjects]} />
    </main>
  );
}
