import React from "react";
import Image from "next/image";
import Navbar from "./components/Navbar";
import About from "./components/About";
// import Projects from "./components/Projects";
import Contact from "./components/Contact";

export default function Home() {
  return (
    <>
    <Navbar />
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900 p-6">
    <About />
    {/* <Projects /> */}
    <Contact />
    </main>
    </>
  );
}
