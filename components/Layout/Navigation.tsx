'use client';
import { useState } from "react";
import Link from "next/link";
import * as packageJSON from '../../package.json';

const Navigation = () => {
    const [isOpen, setisOpen] = useState(false);

    const toggleMenu = () => {
        setisOpen(!isOpen);
    }

    return (
        <header className="flex justify-center mb-14 lg:mb-0 sticky z-10">
            <nav className={`flex flex-col lg:flex-row fixed lg:w-3/4 left-0 lg:left-auto right-0 ${isOpen && 'bottom-0'} top-0 h-auto lg:right-auto bg-black lg:bg-secondary bg-opacity-10 lg:bg-opacity-100 backdrop-blur-2xl lg:backdrop-blur-none m-4 py-2.5 px-5 lg:mt-0 lg:py-4 rounded-lg gap-6 lg:gap-0 lg:justify-between`}>
                <div className="flex flex-wrap w-full flex-row justify-between">
                    <Logo toggleMenu={toggleMenu} />
                    <MenuButton toggleMenu={toggleMenu} isOpen={isOpen} />
                </div>
                <Links toggleMenu={toggleMenu} isOpen={isOpen} />
            </nav>
        </header>
    )
}

const Logo = ({ toggleMenu }: { toggleMenu: () => void }) => (
    <Link href="/" className="flex flex-row px-2 items-center gap-3 transition-transform cursor-pointer hover:scale-105">
        <span className="text-xl">
            🌍
        </span>
        <span className="text-2xl font-bold tracking-tighter">
            TripPlanner <span className="text-sm tracking-normal font-medium color-effect">v{packageJSON.version}</span>
        </span>
    </Link>
)

const MenuButton = ({ toggleMenu, isOpen }: any) => (
    <button className="flex lg:hidden items-center justify-center w-8 h-8 rounded-md bg-secondary-button bg-opacity-30 transition-transform hover:scale-110" onClick={toggleMenu}>
        <div className={`w-5 h-5 relative ${isOpen && 'hamburger-active'}`}>
            <span className="bg-primary transition-all h-0.5 w-full left-0 absolute top-1.5" />
            <span className="bg-primary transition-all h-0.5 w-full left-0 absolute bottom-1.5" />
        </div>
    </button>
)

const Links = ({ toggleMenu, isOpen }: { toggleMenu: () => void; isOpen: boolean }) => {
    const linkClass = "px-4 py-3 lg:py-2 w-full lg:w-auto rounded-md transition-transform hover:shadow-lg hover:-translate-y-1"
    const secondaryLink = `${linkClass} bg-white bg-opacity-40`
    const primaryLink = `${linkClass} bg-primary-button bg-opacity-100 text-secondary`

    return (
        <div className={`${isOpen ? 'flex' : 'hidden lg:flex'} flex-col lg:flex-row h-full  pb-8 lg:pb-0 lg:h-auto gap-3 lg:gap-9 items-start lg:items-center w-full justify-start lg:justify-end transition-all`}>
            <Link href="/about" className={secondaryLink} onClick={toggleMenu}>
                About
            </Link>
            <Link href="/create-account" className={primaryLink} onClick={toggleMenu}>
                Create account
            </Link>
        </div>
    )
}

export default Navigation;