"use client";

import { Project as ProjectType } from "@/src/types/types";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

type Category = "All" | "Data science" | "Computer vision" | "NLP" | "Deep Learning" | "Web Development" | "Other";

type Props = {
  projects: ProjectType[];
};

export default function FilteredPortfolio({ projects }: Props = { projects: [] }) {
  const [selectedCategory, setSelectedCategory] = useState<Category>("All");
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  // Extract unique categories from projects
  const categories: Category[] = ["All", "Data science", "Computer vision", "NLP", "Deep Learning", "Web Development", "Other"];

  const filteredProjects = projects.filter((project) =>
    selectedCategory === "All" ? true : project.category === selectedCategory
  );

  return (
    <div className="container mx-auto px-4 ">
      <div className="flex flex-col items-start gap-6">
        {/* Filter Buttons */}
        <div className="flex flex-wrap gap-4 mb-8">
          {categories.map((category) => (
            <Button
              key={category}
              variant="ghost"
              onClick={() => setSelectedCategory(category)}
              className={`
                rounded-md px-6 py-2 text-base font-light transition-all duration-300 text-white
                ${selectedCategory === category
                  ? 'bg-[#FF00CC]  hover:bg-[#FF00CC] hover:text-white'
                  : 'border-2 border-[#FF00CC] text-[#FF00CC] hover:bg-[#FF00CC] hover:text-white'
                }
              `}
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
          {filteredProjects.map((project, i) => (
            <Link key={i} href={project.link}>
              <div
                className="w-full"
                onMouseEnter={() => setHoveredId(project.title)}
                onMouseLeave={() => setHoveredId(null)}
              >
                <div className="relative h-[320px] rounded-lg cursor-pointer transition duration-300 hover:scale-105 bg-black">
                  <Image
                    className="object-cover rounded-lg opacity-65"
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <Card className="absolute inset-0 bg-transparent">
                    <CardHeader>
                      <CardTitle className="text-white font-normal">{project.title}</CardTitle>
                    </CardHeader>
                    {hoveredId === project.title && (
                      <CardContent className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-75 rounded-lg">
                        <CardDescription className="text-white text-lg">
                          {project.description}
                        </CardDescription>
                      </CardContent>
                    )}
                    <CardFooter className="absolute bottom-0 right-0">
                      <ArrowRight className="text-white" />
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