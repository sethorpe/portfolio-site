"use client";
import React from "react";
import { motion } from "framer-motion";
import PasswordGenerator from "./PasswordGenerator";
import Converter from "./Converter";
import CurrencyConverter from "./CurrencyConverter";

export default function Projects() {
  return (
    <motion.section 
        id="projects" 
        className="w-full py-20 bg-gray-100 dark:bg-gray-900 text-center transition-all bg-gradient-to-b from-gray-100 to-white dark:from-gray-800 dark:to-gray-900"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
    >
        <h2 className="text-4xl font-bold text-gray-800 dark:text-white">Projects</h2>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {["Project 1", "Project 2", "Project 3"].map((project, index) => (
                <motion.div
                    key={index} // ✅ Fix key error
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                    initial={{ opacity: 0, y: 30, scale: 0.9 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, ease: "easeOut", delay: index * 0.2 }}
                    className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md cursor-pointer transition-all"
                >
                    <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300">{project}</h3>
                    <p className="text-gray-600 dark:text-gray-400 mt-2">Brief description of the project.</p>
                </motion.div>
            ))}

            {/* New Project Card for Password Generator */}
            <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: "easeOut", delay: 0.8 }}
                className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md transition-all"
            >
                <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300">Password Generator</h3>
                <p className="text-gray-600 dark:text-gray-400 mt-2">
                    Generate secure random passwords with customizable options.
                </p>
                <div className="mt-4">
                    <PasswordGenerator />
                </div>
            </motion.div>
            <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: "easeOut", delay: 0.8 }}
                className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md transition-all"
            >
                <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300">Unit Converter</h3>
                <p className="text-gray-600 dark:text-gray-400 mt-2">
                    Convert length, weight, and temperature between metric and imperial units.
                </p>
                <div className="mt-4">
                    <Converter />
                </div>
            </motion.div>
            <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: "easeOut", delay: 0.8 }}
                className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md transition-all"
            >
                <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300">Currency Converter</h3>
                <p className="text-gray-600 dark:text-gray-400 mt-2">
                    Convert between different currencies in real-time using the latest exchange rates.
                </p>
                <div className="mt-4">
                    <CurrencyConverter />
                </div>
            </motion.div>
        </div>
    </motion.section>
  );
}
