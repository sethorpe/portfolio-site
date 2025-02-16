"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

export default function About() {
  return (
    <motion.section 
        id="about" 
        className="w-full py-20 bg-white dark:bg-gray-900 text-center transition-all bg-gradient-to-b from-white to-gray-100 dark:from-gray-900 dark:to-gray-800"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeInOut", delay: 0.3 }}
    >
        <div className="max-w-3xl mx-auto px-6">
            <h2 className="text-4xl font-bold text-gray-800 dark:text-white">About Me</h2>
            {/* Profile Image with Next.js Optimization */}
            <div className="flex flex-col items-center mt-6">
                <Image
                    src="/profile.jpg"
                    alt="Seyi Thorpe"
                    width={150}
                    height={150}
                    className="rounded-full shadow-md border-4 border-gray-200 dark:border-gray-700"
                />
                <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
                    I&apos;m a software developer with experience in automation, web development, and testing. 
                    I enjoy solving problems, building useful applications, and learning new technologies.
                </p>
            </div>
        </div>  
    </motion.section>
  );
}
