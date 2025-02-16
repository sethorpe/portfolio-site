"use client";
import React, {useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { M_PLUS_1 } from "next/font/google";
import DarkModeToggle from "./DarkModeToggle";

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <motion.nav 
            className={`w-full fixed top-0 left-0 z-50 p-4 transition-all ${
                scrolled ? "bg-white dark:bg-gray-900 shadow-md" : "bg-transparent"
            }`}
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
        >
            <div className="max-w-4xl mx-auto flex justify-between items-center">
                <Link href="/" className="text-lg font-semibold text-gray-800 dark:text-white hover:text-blue-600">Home</Link>
                <div className="space-x-6 flex items-center">
                    <motion.a
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        href="#about" 
                        className="text-lg text-gray-700 dark:text-gray-300 hover:text-blue-600"
                    >
                        About
                    </motion.a>
                    <motion.a
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95}}
                        href="#projects"
                        className="text-lg text-gray-700 dark:text-gray-300 hover:text-blue-600"
                    >
                        Projects
                    </motion.a>
                    <motion.a
                        whileHover={{scale: 1.1 }}
                        whileTap={{scale: 0.95 }}
                        href="#contact"
                        className="text-lg text-gray-700 dark:text-gray-300 hover:text-blue-600"
                    >
                        Contact
                    </motion.a>
                    <DarkModeToggle/>
                </div>
            </div>
        </motion.nav>
    );
}

