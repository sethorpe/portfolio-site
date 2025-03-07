"use client";
import React from "react";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedin, faGithub } from "@fortawesome/free-brands-svg-icons";

export default function Contact() {
    return (
        <motion.section 
            id="contact" 
            className="py-20 bg-gradient-to-b from-gray-200 to-gray-100 dark:from-gray-800 dark:to-gray-900 transition-all flex justify-center"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
        >
            <div className="max-w-6xl w-full mx-auto px-6 md:px-12 text-center">
                <h2 className="text-4xl font-bold text-gray-800 dark:text-white">Contact Me</h2>
                <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
                    Feel free to connect with me on LinkedIn or check out my GitHub.
                </p>
                <div className="mt-6 flex justify-center space-x-4">
                    <a href="https://linkedin.com/in/s-thorpe" target="_blank" rel="noopener noreferrer"
                        className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition text-lg shadow-md">
                        <FontAwesomeIcon icon={faLinkedin} className="text-xl" />
                        <span>LinkedIn</span>
                    </a>
                    <a href="https://github.com/sethorpe" target="_blank" rel="noopener noreferrer"
                        className="bg-gray-800 text-white px-6 py-3 rounded-lg hover:bg-gray-900 transition text-lg shadow-md">
                        <FontAwesomeIcon icon={faGithub} className="text-xl" />
                        <span>GitHub</span>
                    </a>
                </div>
            </div>
        </motion.section>
    );
}
