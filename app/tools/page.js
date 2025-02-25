"use client";
import React from "react";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import Navbar from "../components/Navbar";

const PasswordGenerator = dynamic(() => import("../components/PasswordGenerator"), { ssr: false });
const Converter = dynamic(() => import ("../components/Converter"), { ssr: false });
const CurrencyConverter = dynamic(() => import("../components/CurrencyConverter"), { ssr: false });

export default function Tools() {
    return (
        <>
            <Navbar />
            <br />
            <motion.section
                id="tools"
                // className="w-full py-20 bg-gray-100 dark:bg-gray-900 text-center transition-all"
                className="w-full py-20 bg-white dark:bg-gray-900 text-center transition-all"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
            >
                <h2 className="text-4xl font-bold text-gray-800 dark:text-white">Tools</h2>
                <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
                    <motion.div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md transition-all">
                        <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300">Password Generator</h3>
                        <p className="text-gray-600 dark:text-gray-400 mt-2">
                            Generate secure random passwords with customizable options.
                        </p>
                        <div className="mt-4">
                            <PasswordGenerator />
                        </div>
                    </motion.div>
                    <motion.div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md transition-all">
                        <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300">Unit Converter</h3>
                        <p className="text-gray-600 dark:text-gray-400 mt-2">
                            Convert length, weight, and temperature between metric and imperial units.
                        </p>
                        <div className="mt-4">
                            <Converter />
                        </div>
                    </motion.div>
                    <motion.div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md transition-all">
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
        </>
    );
}