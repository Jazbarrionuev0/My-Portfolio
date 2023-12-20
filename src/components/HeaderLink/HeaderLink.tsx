'use client'
import Link from "next/link"

type Props = {
    link: string,
    activeLink: string,
    handleClick: (link: string) => void,
    children: React.ReactNode
}

export default function HeaderLink({ link, activeLink, handleClick, children }: Props) {
    return (
        <Link href={link}>
            <span
                className={`p-5 hover:text-black transition-colors duration-300 ${activeLink === link ? 'text-black font-bold' : 'text-gray-500'}`}
                onClick={() => handleClick(link)}
            >
                {children}
            </span>
        </Link>
    )
}
