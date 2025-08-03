"use client";

import { DatabaseProject, Category } from "@/src/types/types";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/src/components/ui/card";

type Props = {
  projects: DatabaseProject[];
  categories: (Category & { _count: { posts: number } })[];
};

export default function FilteredPortfolio({ projects, categories }: Props) {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  // Create filter options with "All" plus database categories
  const filterOptions = [
    { id: "All", title: "All", count: projects.length },
    ...categories.map((cat) => ({
      id: cat.id,
      title: cat.title,
      count: cat._count.posts,
    })),
  ];

  const filteredProjects = projects.filter((project) => {
    if (selectedCategory === "All") return true;
    return project.category.id === selectedCategory;
  });

  return (
    <div id="projects" className="container mx-auto px-6 py-12 max-w-7xl">
      <div className="flex flex-col items-start gap-10">
        <div className="flex flex-wrap gap-5">
          {filterOptions.map((option) => (
            <Button
              key={option.id}
              variant="ghost"
              onClick={() => setSelectedCategory(option.id)}
              className={`
                  rounded-md px-7 py-2.5 text-base font-light transition-all duration-300 text-portfolio-card-text
                  ${
                    selectedCategory === option.id
                      ? "bg-portfolio-accent hover:bg-portfolio-accent hover:text-portfolio-card-text"
                      : "border-2 border-portfolio-accent text-portfolio-accent hover:bg-portfolio-accent hover:text-portfolio-card-text"
                  }
                `}
            >
              {option.title} ({option.count})
            </Button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
          {filteredProjects.map((project, i) => (
            <Link key={project.id} href={`/blog/${project.slug}`}>
              <div className="w-full h-full p-2" onMouseEnter={() => setHoveredId(project.id)} onMouseLeave={() => setHoveredId(null)}>
                <div className="relative h-[340px] rounded-lg cursor-pointer transition duration-200 hover:scale-105 bg-gray-900">
                  {project.featuredImage ? (
                    <>
                      <Image
                        className="object-cover rounded-lg opacity-40"
                        src={project.featuredImage}
                        alt={project.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-50 rounded-lg"></div>
                    </>
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-gray-700 to-gray-800 rounded-lg"></div>
                  )}
                  <Card className="absolute inset-0 bg-transparent">
                    <CardHeader className="pt-6 pb-2">
                      <CardTitle className="text-white text-2xl font-normal">{project.title}</CardTitle>
                    </CardHeader>
                    {hoveredId === project.id && (
                      <CardContent className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-80 rounded-lg p-8">
                        <CardDescription className="text-white text-lg leading-relaxed">
                          {project.excerpt || "Click to read more about this project..."}
                        </CardDescription>
                      </CardContent>
                    )}
                    <CardFooter className="absolute bottom-4 right-4">
                      <ArrowRight className="text-white h-6 w-6" />
                    </CardFooter>
                  </Card>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
