import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Layout from "../components/Layout";
import Link from "next/link";
import Icons from "../components/Icons";
import { useState } from "react";
import { motion } from "framer-motion";
const Home: NextPage = () => {
    const [index, setIndex] = useState(0);
    return (
        <Layout>
            {/* <div className="loading fixed w-screen h-screen top-0 left-0 bg-base-light dark:bg-blue-dark z-10 overflow-hidden flex items-center justify-center font-bold font-moon-dance text-6xl">
                <p className="animate-pulse-full">J</p>
                <p
                    style={{ "animation-delay": "100ms" }}
                    className="animate-pulse-full"
                >
                    A
                </p>
                <p className="animate-pulse-full">D</p>
                <p className="animate-pulse-full">E</p>
                <p className="animate-pulse-full">N</p>
            </div> */}
            <div className="w-4/5 max-w-6xl mx-auto mt-40 ">
                <header className="font-oxygen">
                    <h1 className="text-2xl">
                        Hi, I'm
                        <span className="text-base-blurple dark:text-blue-light font-moon-dance text-5xl">
                            {" "}
                            Jaden Hou
                        </span>
                    </h1>
                    <h2 className="text-4xl">
                        And I connect{" "}
                        <span className="font-bold">technology</span> with{" "}
                        <span className="font-bold">art</span>
                    </h2>
                </header>
                <div className="font-inter mt-4">
                    <p className="max-w-2xl">
                        Welcome to my site! I’m Jaden and I’m a student at
                        Poolesville High School.
                        <br /> I enjoy spending my free time creating{" "}
                        <Link href="/projects">
                            <a className="">stuff</a>
                        </Link>{" "}
                        and expanding my{" "}
                        <Link href="/#updates">
                            <a>short, yet frequently revisted interests.</a>
                        </Link>{" "}
                        I’m a aspiring full stack developer and a advocate for
                        FOSS projects.
                        <br />
                        <br />
                        Check out{" "}
                        <Link href="/project">
                            <a>.projects</a>
                        </Link>
                        ,{" "}
                        <Link href="/blog">
                            <a>.blog</a>
                        </Link>
                        , or keep scrolling to learn more about me!
                    </p>
                    <p className="text-[#5F5F5F] dark:text-[#A5A5A5] italic text-sm font-inter">
                        Quick tip: Use{" "}
                        <span className="font-inconsolata border border-[#5F5F5F] dark:border-[#A5A5A5] rounded p-0.5">
                            {" "}
                            Ctrl K{" "}
                        </span>
                        to rapidly move around this site!
                    </p>

                    <Icons />
                </div>

                <div className="w-full">
                    <div className="mt-40 flex flex-col">
                        <div className="flex  font-bold text-4xl  font-oxygen  items-center gap-4">
                            <div className="w-32 h-2 bg-base-dark dark:bg-base-light"></div>
                            <h1>What I've been up to</h1>
                        </div>
                        <p className="dark:text-slate-300 text-slate-700 text-xl">
                            <span className="text-base-dark dark:text-base-light text-lg">
                                I'm currently a
                            </span>{" "}
                            <br></br>Web Development Intern @{" "}
                            <a href="https://upcountypreventionnetwork.org/">
                                Upcounty Prevention Network
                            </a>
                            <br></br>
                            Co-Founder @{" "}
                            <a href="https://poolesvillehacks.tech">
                                poolesville_hacks
                            </a>
                        </p>
                    </div>{" "}
        
                </div>
            </div>
        </Layout>
    );
};

export default Home;
