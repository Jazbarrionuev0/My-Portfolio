'use client'
import { useState } from 'react';
import { usePathname } from 'next/navigation'
import HeaderLink from '../HeaderLink/HeaderLink';

const Header = () => {
    const pathname = usePathname()
    
    const [activeLink, setActiveLink] = useState<string>(pathname);

    const handleLinkClick = (link: string) => setActiveLink(link);

    return (
        <header className="py-4 my-2 md:py-8 md:my-4">
            <HeaderLink link='/' activeLink={activeLink} handleClick={handleLinkClick}>Home</HeaderLink>
            <HeaderLink link='/work' activeLink={activeLink} handleClick={handleLinkClick}>Work</HeaderLink>
        </header>
    )
}

export default Header