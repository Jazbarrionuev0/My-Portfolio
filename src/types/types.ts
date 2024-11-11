export type Work = {
    title: string,
    position: string,
    duration: string,
    description: string,
    link?: string
}

export type Project = {
    title: string,
    description: string,
    image: string,
    link: string,
    repoLink: string,
    category: "All" | "Data science" | "Computer vision" | "NLP" | "Deep Learning" | "Web Development" | "Other";
}

export type Tag = {
    title: string,
    className: string
}

