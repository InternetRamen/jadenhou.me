import type { NextPage } from "next";
import Head from "next/head";
import { ReactNode, useEffect, useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
interface LayoutProps {
    children?: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
    return (
        <>
            <Head>
                <title>Jaden Hou</title>
                <meta
                    name="description"
                    content="Hi! I’m Jaden Hou...and I connect technology with art"
                />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1.0"
                ></meta>
                <meta
                    name="keywords"
                    content="jaden, jaden hou, hou, web developer, web, developer, full stack developer, designer"
                />
                <link rel="icon" href="/ico.png" />
            </Head>
            
            <main className="overflow-x-hidden">
                <Navbar />
                <div className="min-h-screen">{children}</div>
                <Footer />
            </main>
        </>
    );
};
export default Layout;
