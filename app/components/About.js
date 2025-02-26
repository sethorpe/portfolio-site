"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

export default function About() {
    const [aboutData, setAboutData] = useState(null);

    useEffect(() => {
        fetch("/data/aboutData.json")
            .then((res) => res.json())
            .then((data) => setAboutData(data));
    }, []);

    return (
        <section id="about" className="py-20 bg-white dark:bg-gray-900 text-center transition-all">
            {/* LCP Text Block - Move Before Image */}
            <h2 className="text-4xl font-bold text-gray-800 dark:text-white">
                Hi, I&apos;m Segun
            </h2>
            
            <p className="mt-6 text-lg font-medium text-gray-700 dark:text-gray-300 leading-relaxed tracking-wide">
                {aboutData ? (
                    <>
                        {/* I&apos;m <b>{aboutData.name}</b>, a <b>{aboutData.title}</b>. {aboutData.description} */}
                        Hello, and welcome! I&apos;m a <b>{aboutData.title}</b>. {aboutData.description}
                    </>
                ) : (
                    "Loading..."
                )}
            </p>

            {/* Profile Image - Moved Below */}
            <div className="flex flex-col items-center mt-6">
                <picture>
                    <source srcSet="/profile-300.avif" type="image/avif" media="(min-width: 768px)" />
                    <source srcSet="/profile-150.avif" type="image/avif" media="(max-width: 767px)" />
                    <source srcSet="/profile-300.webp" type="image/webp" />
                    <Image
                        src="/profile-300.avif"
                        alt="Profile Image"
                        width={300}
                        height={300}
                        sizes="(max-width: 600px) 150px, (min-width: 601px) 300px"
                        priority={true}
                        className="rounded-full shadow-md border-4 border-gray-300 w-[250px] h-[250px] sm:w-[300px] sm:h-[300px] object-cover"
                    />
                </picture>
            </div>

            {/* Keep Async Data for Skills & Interests */}
            {aboutData && (
                <div className="max-w-3xl mx-auto px-6">
                    {/* Skills Section */}
                    <div className="mt-6 text-lg text-gray-600 dark:text-gray-300 text-left">
                        <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">Technical Skills:</h3>
                        <ul className="list-disc list-inside space-y-2">
                            {aboutData.skills.map((skill, index) => (
                                <li key={index}>
                                    <strong>{skill.category}:</strong> {skill.list.join(", ")}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Interests Section */}
                    <div className="mt-6 text-lg text-gray-600 dark:text-gray-300 text-left">
                        <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">Interests:</h3>
                        <ul className="list-disc list-inside space-y-2">
                            {aboutData.interests.map((interest, index) => (
                                <li key={index}>{interest}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}
        </section>
    );
}
