"use client";
import React from "react";
import { motion } from "framer-motion";
import { FiLinkedin, FiGithub } from "react-icons/fi";

export default function Contact() {
  return (
    <motion.section 
        id="contact" 
        className="w-full py-20 bg-white dark:bg-gray-900 text-center transition-all bg-gradient-to-b from-white to-gray-100 dark:from-gray-900 dark:to-gray-800"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
    >
        <h2 className="text-4xl font-bold text-gray-800 dark:text-white">Contact Me</h2>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
            Feel free to connect with me on LinkedIn or check out my GitHub.
        </p>

        {/* Social Icons */}
        <div className="mt-6 flex justify-center space-x-6">
            <a href="https://www.linkedin.com/in/s-thorpe" target="_blank" rel="noopener noreferrer"
               className="flex items-center space-x-2 px-6 py-3 text-lg font-semibold text-white bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 transition">
                <FiLinkedin className="text-2xl" /> 
                <span>LinkedIn</span>
            </a>
            <a href="https://github.com/sethorpe" target="_blank" rel="noopener noreferrer"
               className="flex items-center space-x-2 px-6 py-3 text-lg font-semibold text-white bg-gray-800 rounded-lg shadow-md hover:bg-gray-900 transition">
                <FiGithub className="text-2xl" /> 
                <span>GitHub</span>
            </a>
        </div>
    </motion.section>
  );
}