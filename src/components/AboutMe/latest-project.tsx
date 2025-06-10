"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import projects from "@/src/utils/projects";
import { Button } from "@/src/components/ui/button";

export default function LatestProject() {
  const latestProject = projects[projects.length - 1];

  return (
    <section className="w-full px-4 md:px-8 py-16 border-b bg-pink-50/30 border border-pink-200 rounded-lg shadow-sm">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          <div className="relative overflow-hidden rounded-lg shadow-md h-full min-h-[300px]">
            <Image src={latestProject.image} alt={latestProject.title} fill style={{ objectFit: "cover" }} priority />
          </div>

          <div className="flex flex-col gap-6 pt-2">
            <div className="space-y-2">
              <span className="text-portfolio-accent text-sm font-semibold tracking-wider uppercase">Featured Work</span>
              <h2 className="text-3xl md:text-4xl font-bold">Latest Project</h2>
              <p className="text-slate-600 dark:text-slate-400 text-lg max-w-lg">Check out what I&apos;ve been working on recently</p>
            </div>

            <div className="border-l-4 border-portfolio-accent pl-4 py-2">
              <h3 className="text-2xl md:text-3xl font-bold">{latestProject.title}</h3>
              <div className="inline-flex items-center gap-2 my-2">
                <span className="px-3 py-1 bg-pink-50 border border-pink-200 text-gray-800 dark:bg-pink-900 dark:text-pink-100 rounded-full text-sm font-medium">
                  {latestProject.category}
                </span>
              </div>
              <p className="text-slate-700 dark:text-slate-300 text-lg mt-3 leading-relaxed">{latestProject.description}</p>
            </div>

            <div className="flex flex-wrap gap-4 mt-4">
              <Link href={latestProject.link} passHref>
                <Button variant="default" className="flex items-center gap-2 rounded-md px-6 py-2.5 transition-all hover:translate-y-[-2px]">
                  View Details
                  <ArrowRight size={16} />
                </Button>
              </Link>

              <Link href={latestProject.repoLink} target="_blank" rel="noopener noreferrer" passHref>
                <Button variant="outline" className="flex items-center gap-2 rounded-md px-6 py-2.5 transition-all hover:translate-y-[-2px]">
                  Source Code
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
