export type Work = {
  title: string;
  position: string;
  duration: string;
  description: string;
  link?: string;
};

export type Project = {
  title: string;
  description: string;
  image: string;
  link: string;
  repoLink: string;
  category: "All" | "Data science" | "Computer vision" | "NLP" | "Deep Learning" | "Web Development" | "Other";
};

// New type for database projects (blog posts used as projects)
export type DatabaseProject = {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  featuredImage: string | null;
  publishedAt: Date | null;
  readingTime: number | null;
  viewCount: number;
  tags: {
    id: string;
    title: string;
  }[];
  category: {
    id: string;
    title: string;
  };
};

export type Category = {
  id: string;
  title: string;
};

export type Tag = {
  title: string;
  className: string;
};
