"use client";

import { Project as ProjectType } from "@/src/types/types";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/src/components/ui/card";

type Category = "All" | "Data science" | "Computer vision" | "NLP" | "Deep Learning" | "Web Development" | "Other";

type Props = {
  projects: ProjectType[];
};

export default function FilteredPortfolio({ projects }: Props = { projects: [] }) {
  const [selectedCategory, setSelectedCategory] = useState<Category>("All");
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const categories: Category[] = ["All", "Data science", "Computer vision", "NLP", "Deep Learning", "Web Development", "Other"];

  const filteredProjects = projects.filter((project) => (selectedCategory === "All" ? true : project.category === selectedCategory));

  return (
    <div id="projects" className="container mx-auto px-6 py-12 max-w-7xl">
      <div className="flex flex-col items-start gap-10">
        <div className="flex flex-wrap gap-5">
          {categories.map((category) => (
            <Button
              key={category}
              variant="ghost"
              onClick={() => setSelectedCategory(category)}
              className={`
                rounded-md px-7 py-2.5 text-base font-light transition-all duration-300 text-portfolio-card-text
                ${
                  selectedCategory === category
                    ? "bg-portfolio-accent hover:bg-portfolio-accent hover:text-portfolio-card-text"
                    : "border-2 border-portfolio-accent text-portfolio-accent hover:bg-portfolio-accent hover:text-portfolio-card-text"
                }
              `}
            >
              {category}
            </Button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
          {filteredProjects.map((project, i) => (
            <Link key={i} href={project.link}>
              <div className="w-full h-full p-2" onMouseEnter={() => setHoveredId(project.title)} onMouseLeave={() => setHoveredId(null)}>
                <div className="relative h-[340px] rounded-lg cursor-pointer transition duration-200 hover:scale-105 bg-portfolio-card-bg">
                  <Image
                    className="object-cover rounded-lg opacity-35"
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <Card className="absolute inset-0 bg-transparent">
                    <CardHeader className="pt-6 pb-2">
                      <CardTitle className="text-portfolio-card-text text-2xl font-normal">{project.title}</CardTitle>
                    </CardHeader>
                    {hoveredId === project.title && (
                      <CardContent className="absolute inset-0 flex items-center justify-center bg-portfolio-card-bg bg-opacity-75 rounded-lg p-8">
                        <CardDescription className="text-portfolio-card-text text-lg leading-relaxed">{project.description}</CardDescription>
                      </CardContent>
                    )}
                    <CardFooter className="absolute bottom-4 right-4">
                      <ArrowRight className="text-portfolio-card-text h-6 w-6" />
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
