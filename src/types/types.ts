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
    repoLink: string
}

export type Tag = {
    title: string,
    className: string
}