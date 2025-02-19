"use client";
import React, {useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import DarkModeToggle from "./DarkModeToggle";
import { FiMenu, FiX } from "react-icons/fi";
import Image from "next/image";

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        if (typeof window == "undefined") return; // Ensure window is defined
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
            <div className="max-w-4xl mx-auto flex items-center justify-between">
                {/* Logo */}
                {/* <Link href="/" className="text-lg font-semibold text-gray-800 dark:text-white hover:text-blue-600">Home</Link> */}
                <Link href="/">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, ease: "easeOut"}}
                        whileHover={{ scale: 1.1 }}
                        className="overflow-hidden rounded-3xl shadow-md"
                    >
                        <Image 
                            src="/navbar-logo-proportional.png"
                            alt="Logo"
                            width={150}
                            height={0}
                            style={{ height: "auto" }}
                            className="w-20 h-auto md:w-32"
                        />

                    </motion.div>
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden md:flex space-x-6">
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
                </div>
                { /* Dark Mode Toggle (Always Visible) */}
                <div className="hidden md:flex">
                    <DarkModeToggle/>
                </div>
                { /* Mobile Menu Button */}
                <div className="ml-2 md:ml-4">
                    <button
                        onClick={() => setMenuOpen(!menuOpen)}
                        className="md:hidden text-gray-800 dark:text-white text-2xl"
                    >
                        {menuOpen ? <FiX /> : <FiMenu />}
                    </button>
                </div>
                
            </div>

            {/* Mobile Navigation Menu */}
            {menuOpen && (
                <div className="md:hidden bg-white dark:bg-gray-800 absolute top-16 left-0 w-full flex flex-col items-center py-4 space-y-4 shadow-md">
                    <Link href="#about" className="text-lg text-gray-700 dark:text-gray-300 hover:text-blue-600" onClick={() => setMenuOpen(false)}>
                        About
                    </Link>
                    <Link href="#projects" className="text-lg text-gray-700 dark:text-gray-300 hover:text-blue-600" onClick={() => setMenuOpen(false)}>
                        Projects
                    </Link>
                    <Link href="#contact" className="text-lg text-gray-700 dark:text-gray-300 hover:text-blue-600" onClick={() => setMenuOpen(false)}>
                        Contact
                    </Link>
                    <DarkModeToggle />
                </div>
            )}
        </motion.nav>
    );
}

