"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
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
            className={`w-full fixed top-0 left-0 z-50 p-4 transition-all flex items-center ${
                scrolled ? "bg-white dark:bg-gray-900 shadow-md" : "bg-transparent"
            }`}
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
        >
            <div className="max-w-6xl mx-auto flex items-center justify-between w-full px-6">
                
                {/* Logo - Home Link */}
                <Link href="/" className="flex-shrink-0">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, ease: "easeOut"}}
                        whileHover={{ scale: 1.1 }}
                        className="overflow-hidden rounded-3xl shadow-md"
                    >
                        <picture>
                            <source srcSet="/navbar-logo-proportional.avif" type="image/avif" />
                            <source srcSet="/navbar-logo-proportional.webp" type="image/webp" />
                            <Image 
                                src="/navbar-logo-proportional.webp"
                                alt="Navbar Logo"
                                width={150}
                                height={0}
                                style={{ height: "auto" }}
                                priority={true}
                                className="w-16 h-auto md:w-20"
                            />
                        </picture>
                    </motion.div>
                </Link>

                {/* Centered Links (Desktop) */}
                <div className="hidden md:flex flex-1 justify-center space-x-8">
                    <motion.a
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        href="/#about" 
                        className="text-lg text-gray-700 dark:text-gray-300 hover:text-blue-600"
                        onClick={() => setMenuOpen(false)}  
                    >
                        About
                    </motion.a>
                    <motion.a
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95}}
                        href="/tools"
                        className="text-lg text-gray-700 dark:text-gray-300 hover:text-blue-600"
                        onClick={() => setMenuOpen(false)}  
                    >
                        Tools
                    </motion.a>
                    <motion.a
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        href="/#contact"
                        className="text-lg text-gray-700 dark:text-gray-300 hover:text-blue-600"
                        onClick={() => setMenuOpen(false)}  
                    >
                        Contact
                    </motion.a>
                </div>

                {/* Dark Mode Toggle */}
                <div className="flex-shrink-0">
                    <DarkModeToggle />
                </div>
                
                {/* Mobile Menu Button */}
                <button
                    onClick={() => setMenuOpen(!menuOpen)}
                    className="md:hidden text-gray-800 dark:text-white text-2xl ml-4"
                >
                    {menuOpen ? <FiX /> : <FiMenu />}
                </button>
            </div>

            {/* Mobile Navigation Menu with Fade Animation */}
            <AnimatePresence>
                {menuOpen && (
                    <motion.div 
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        className="md:hidden bg-white dark:bg-gray-800 absolute top-16 left-0 w-full flex flex-col items-center py-4 space-y-4 shadow-md"
                    >
                        <Link href="/#about" className="text-lg text-gray-700 dark:text-gray-300 hover:text-blue-600" onClick={() => setMenuOpen(false)}>
                            About
                        </Link>
                        <Link href="/tools" className="text-lg text-gray-700 dark:text-gray-300 hover:text-blue-600" onClick={() => setMenuOpen(false)}>
                            Tools
                        </Link>
                        <Link href="/#contact" className="text-lg text-gray-700 dark:text-gray-300 hover:text-blue-600" onClick={() => setMenuOpen(false)}>
                            Contact
                        </Link>
                        <DarkModeToggle />
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
}
