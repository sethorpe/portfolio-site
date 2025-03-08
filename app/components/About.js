"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

export default function About() {
    const [aboutData, setAboutData] = useState(null);

    useEffect(() => {
        fetch("/data/aboutData.json")
            .then((res) => res.json())
            .then((data) => setAboutData(data))
            .catch((error) => console.error("Error fetching aboutData:", error));
    }, []);

    return (
        <motion.section 
            id="about" 
            className="py-20 bg-gray-100 dark:bg-gray-900 text-center transition-all"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
        >
            <div className="max-w-5xl mx-auto px-6 text-left">
                <div className="mt-10 flex flex-col md:flex-row items-center md:items-start gap-10">
                    
                    {/* Profile Image - PRIORITIZED for LCP */}
                    <motion.div 
                        className="flex-shrink-0"
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                        viewport={{ once: true }}
                    >
                        <picture>
                            <source srcSet="/profile-300.avif" type="image/avif" media="(min-width: 768px)" />
                            <source srcSet="/profile-200.avif" type="image/avif" media="(max-width: 767px)" />
                            <source srcSet="/profile-300.webp" type="image/webp" />
                            <Image
                                src="/profile-300.avif"
                                alt="Profile Image"
                                width={300}
                                height={300}
                                sizes="(max-width: 600px) 200px, (min-width: 601px) 300px"
                                priority={true}  // Ensures it loads early
                                fetchPriority="high"
                                className="rounded-lg shadow-md border-2 border-gray-400 dark:border-gray-600 w-[260px] h-[300px] sm:w-[300px] sm:h-[350px] object-cover"
                            />
                        </picture>
                    </motion.div>

                    {/* Text Content - Reserved Space to Prevent Shift */}
                    <motion.div 
                        className="flex-1"
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
                        viewport={{ once: true }}
                    >
                        {!aboutData ? (
                            <p className="mt-6 text-lg text-gray-800 dark:text-gray-200 leading-relaxed min-h-[48px]">
                                Loading...
                            </p>
                        ) : (
                            <>
                                <h2 className="text-4xl font-bold text-gray-800 dark:text-white text-left">
                                    Hi, I&apos;m {aboutData.name.first}
                                </h2>
                                <p className="mt-4 text-lg font-medium text-gray-700 dark:text-gray-300 leading-relaxed min-h-[64px]">
                                    {aboutData.description}
                                </p>

                                {/* Skills Section */}
                                {aboutData.skills && (
                                    <motion.div 
                                        className="mt-6"
                                        initial={{ opacity: 0, y: 50 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.8, ease: "easeOut", delay: 0.6 }}
                                        viewport={{ once: true }}
                                    >
                                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Technical Skills:</h3>
                                        <ul className="list-disc list-inside space-y-2 text-gray-800 dark:text-gray-300">
                                            {aboutData.skills.map((skill, index) => (
                                                <li key={index}>
                                                    <strong>{skill.category}:</strong> {skill.list.join(", ")}
                                                </li>
                                            ))}
                                        </ul>
                                    </motion.div>
                                )}

                                {/* Interests Section */}
                                {aboutData.interests && (
                                    <motion.div 
                                        className="mt-6"
                                        initial={{ opacity: 0, y: 50 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.8, ease: "easeOut", delay: 0.8 }}
                                        viewport={{ once: true }}
                                    >
                                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Interests:</h3>
                                        <div className="flex flex-wrap gap-3">
                                            {aboutData.interests.map((interest, index) => (
                                                <span key={index} className="px-3 py-1 bg-gray-300 dark:bg-gray-600 rounded-lg text-sm text-gray-800 dark:text-gray-300">
                                                    {interest}
                                                </span>
                                            ))}
                                        </div>
                                    </motion.div>
                                )}
                            </>
                        )}
                    </motion.div>
                </div>
            </div>
        </motion.section>
    );
}
