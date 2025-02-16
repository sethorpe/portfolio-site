"use client";
import React from "react";
import { motion } from "framer-motion";

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
            Feel free to reach out via email or connect with me on LinkedIn.
        </p>
        <div className="mt-6">
            <motion.a 
                href="mailto:your@email.com"
                className="text-lg text-blue-600 font-semibold hover:underline"
                whileHover={{ scale: 1.1, color: "#1e40af" }} // Darker blue on hover
            >
                your@email.com
            </motion.a>
        </div>
    </motion.section>
  );
}

