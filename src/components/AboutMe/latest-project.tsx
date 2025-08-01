import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getFeaturedBlogPost } from "@/src/actions/blog";
import { Button } from "@/src/components/ui/button";

export default async function LatestProject() {
  const { success, post } = await getFeaturedBlogPost();

  if (!success || !post) {
    return null; // Don't show the section if there's no featured project
  }

  // Map tags to a category for display
  const getProjectCategory = () => {
    if (post.tags.length === 0) return "Project";
    const firstTag = post.tags[0].title.toLowerCase();
    if (firstTag.includes("data") || firstTag.includes("science")) return "Data Science";
    if (firstTag.includes("web") || firstTag.includes("frontend") || firstTag.includes("backend")) return "Web Development";
    if (firstTag.includes("machine") || firstTag.includes("learning") || firstTag.includes("ai")) return "Machine Learning";
    return post.tags[0].title;
  };

  return (
    <section className="w-full px-4 md:px-8 py-16 border-b bg-pink-50/30 border border-pink-200 md:rounded-lg shadow-sm">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          <div className="relative overflow-hidden rounded-lg shadow-md h-full min-h-[300px] order-2 md:order-1">
            <Image src={post.featuredImage || "/projects/project2.jpg"} alt={post.title} fill style={{ objectFit: "cover" }} priority />
          </div>

          <div className="flex flex-col gap-6 pt-2 order-1 md:order-2">
            <div className="space-y-2">
              <span className="text-portfolio-accent text-sm font-semibold tracking-wider uppercase">Featured Work</span>
              <h2 className="text-3xl md:text-4xl font-bold">Featured Project</h2>
              <p className="text-slate-600 dark:text-slate-400 text-lg max-w-lg">Check out my featured project</p>
            </div>

            <div className="border-l-4 border-portfolio-accent pl-4 py-2">
              <h3 className="text-2xl md:text-3xl font-bold">{post.title}</h3>
              <div className="inline-flex items-center gap-2 my-2">
                <span className="px-3 py-1 bg-pink-50 border border-pink-200 text-gray-800 dark:bg-pink-900 dark:text-pink-100 rounded-full text-sm font-medium">
                  {getProjectCategory()}
                </span>
              </div>
              <p className="text-slate-700 dark:text-slate-300 text-lg mt-3 leading-relaxed">
                {post.excerpt || "Click to read more about this project..."}
              </p>
            </div>

            <div className="flex flex-wrap gap-4 mt-4">
              <Link href={`/blog/${post.slug}`} passHref>
                <Button variant="default" className="flex items-center gap-2 rounded-md px-6 py-2.5 transition-all hover:translate-y-[-2px]">
                  View Details
                  <ArrowRight size={16} />
                </Button>
              </Link>

              {/* You might want to add a repository link field to your Post model if you want to show source code */}
              <Link href="/projects" passHref>
                <Button variant="outline" className="flex items-center gap-2 rounded-md px-6 py-2.5 transition-all hover:translate-y-[-2px]">
                  View All Projects
                  <ArrowRight size={16} />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
