import React from "react";
import Image from "next/image";
import Navbar from "./components/Navbar";
import About from "./components/About";
import Projects from "./components/Projects";
import Contact from "./components/Contact";

export default function Home() {
  return (
    <>
    <Navbar />
    <main className="flex flex-col items-center bg-gray-100 dark:bg-gray-900 px-6 space-y-8 md:space-y-12">
    <About />
    {/* <Projects /> */}
    <Contact />
    </main>
    </>
  );
}
