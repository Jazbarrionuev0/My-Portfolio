import React from "react";
import { Project } from "../types/types";

function ProjectPage({ title }: Project) {
  return (
    <div className="max-w-3xl mx-auto md:mt-0 p-4 md:p-8 lg:p-12">
      <h2 className="font-semibold text-center text-6xl min-h-28">{title}</h2>
      <p className="mt-4 md:mt-6 lg:mt-8 text-sm md:text-base lg:text-lg">
        Dedicated software engineer dedicated to create innovative solutions with careful design, efficient programming,
        and seamless deployment.
      </p>
    </div>
  );
}

export default ProjectPage;
