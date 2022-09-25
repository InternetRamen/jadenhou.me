import Link from "next/link";
import { mdiClose, mdiHamburger, mdiMagnify, mdiMenu } from "@mdi/js";
import Icon from "@mdi/react";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";
import algoliasearch from "algoliasearch/lite";

import {
    InstantSearch,
    SearchBox,
    useSearchBox,
    UseSearchBoxProps,
    Hits,
} from "react-instantsearch-hooks-web";
const searchClient = algoliasearch(
    "681TOQNRDC",
    "294a5009120a5f31f02954f71b15ffe2"
);

function CustomSearchBox(props: UseSearchBoxProps) {
    const { query, refine } = useSearchBox(props);

    return (
        <form className="w-full">
            <input
                type="text"
                
                onChange={(e) => refine(e.target.value)}
                placeholder="Search Website"
                className="grow focus:outline-none w-full p-3 placeholder:text-blue-light bg-transparent text-xl text-white"
            />
        </form>
    );
}
interface hitProps {
    hit: {
        objectID: string;
        title: string;
        body: string;
        description: string;
        type: string;
        page: string;
    };
}
function Hit({ hit }: hitProps) {
    return (
        <Link href={`/${hit.type}/${encodeURIComponent(hit.title)}`} passHref>
            <div className="text-white w-[90%] cursor-pointer text-center text-white rounded-lg border border-blue-dark border-opacity-0 hover:text-blue-light hover:border-blue-light hover:border-opacity-50 p-4 relative after:w-full after:absolute after:h-[0.05rem] after:bg-blue-light after:bottom-0 after:left-0 after:hover:hidden">
                <a className="text-lg">
                    {hit.title === "" ? (hit.page ? hit.page : "") : hit.title}
                </a>
            </div>
        </Link>
    );
}

const Navbar = () => {
    const { theme, setTheme } = useTheme();
    const modalScreen = useRef<HTMLDivElement>(null);
    useEffect(() => {
        document.addEventListener("keydown", (e) => {
            
            if (e.ctrlKey) {
                if (e.key === "k") {
                    e.preventDefault();
                    modalScreen.current?.classList.toggle("hidden");
                }
            }
        });
    });
    const [menuOpen, setMenuOpen] = useState(false);
    return (
        <>
            <div
                className="modal-screen w-screen h-screen z-20 top-0 bg-black/25 dark:bg-white/5 fixed backdrop-blur hidden flex items-center justify-center"
                ref={modalScreen}
                onClick={() => modalScreen.current?.classList.add("hidden")}
            >
                <div
                    className="md:w-1/2 w-full h-full md:rounded bg-blue-dark md:h-[600px] shadow-md"
                    onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                    }}
                >
                    <InstantSearch searchClient={searchClient} indexName="home">
                        <div className="flex flex-col w-full h-full">
                            <div className="flex items-center justify-center w-full p-4 gap-4">
                                <Icon
                                    path={mdiMagnify}
                                    title="search"
                                    size={1.2}
                                    color="#7694FF"
                                />
                                <CustomSearchBox />
                                <h1
                                    className="text-xl cursor-pointer text-blue-light"
                                    onClick={() =>
                                        modalScreen.current?.classList.add(
                                            "hidden"
                                        )
                                    }
                                >
                                    esc
                                </h1>
                            </div>
                            <div className=" flex flex-grow justify-center">
                                <Hits hitComponent={Hit} />
                            </div>
                        </div>
                    </InstantSearch>
                </div>
            </div>
            <nav
                className={`w-screen fixed top-0 md:h-[50px] ${
                    menuOpen ? "h-screen" : "h-12"
                } flex justify-center backdrop-blur-[10px] transition-[height] duration-500`}
            >
                <div className="w-4/5 max-w-6xl mx-auto h-full flex md:justify-between items-start md:items-center">
                    <div className="flex gap-5 md:items-center md:h-auto h-full md:flex-row flex-col w-full">
                        <Link href="/">
                            <a className="font-moon-dance text-4xl h-12 text-base-blurple dark:text-blue-light">
                                Jaden
                            </a>
                        </Link>

                        <div
                            className={`flex-grow md:gap-5 gap-10 flex-col md:flex-row flex md:flex overflow-hidden h-full`}
                        >
                            <Link href="/">
                                <a className="font-oxygen font-bold text-xl text-base-blurple dark:text-blue-light opacity-1 hover:opacity-[0.8] transition-opacity ease">
                                    .home
                                </a>
                            </Link>
                            <Link href="/project">
                                <a className="font-oxygen font-bold text-xl text-base-blurple dark:text-blue-light opacity-1 hover:opacity-[0.8] transition-opacity ease">
                                    .projects
                                </a>
                            </Link>
                            <Link href="/blog">
                                <a className="font-oxygen font-bold text-xl text-base-blurple dark:text-blue-light opacity-1 hover:opacity-[0.8] transition-opacity ease">
                                    .blog
                                </a>
                            </Link>
                        </div>
                    </div>
                    <div className="flex items-center gap-5 h-12 md:h-auto">
                        <button
                            className="text-base-blurple dark:text-blue-light"
                            onClick={() =>
                                modalScreen.current?.classList.remove("hidden")
                            }
                        >
                            <Icon path={mdiMagnify} title="search" size={1.2} />
                        </button>
                        <button
                            className="text-base-blurple dark:text-blue-light"
                            onClick={() =>
                                setTheme(theme === "dark" ? "light" : "dark")
                            }
                        >
                            {theme === "light" ? (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                                    />
                                </svg>
                            ) : (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                                    />
                                </svg>
                            )}
                        </button>
                        <button
                            className=" text-base-blurple dark:text-blue-light md:hidden"
                            onClick={(e) => setMenuOpen(!menuOpen)}
                        >
                            {menuOpen ? (
                                <Icon
                                    path={mdiClose}
                                    title="search"
                                    size={1.2}
                                />
                            ) : (
                                <Icon
                                    path={mdiMenu}
                                    title="search"
                                    size={1.2}
                                />
                            )}
                        </button>
                    </div>
                </div>
            </nav>
        </>
    );
};
export default Navbar;
