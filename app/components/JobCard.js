"use client";
import React from "react";
import { motion } from "framer-motion";
import AchievementsList from "./AchievementsList";
import TechnologyTags from "./TechnologyTags";

export default function JobCard({ job, index }) {
  const formatDate = (dateString) => {
    if (!dateString) return null;
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
    });
  };

  return (
    <motion.div
      className="mb-10 ml-8"
      initial={{ opacity: 0, x: -50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      {/* Timeline Dot */}
      <div className="absolute w-4 h-4 bg-blue-600 dark:bg-blue-400 rounded-full -left-2.5 border-4 border-gray-100 dark:border-gray-900"></div>

      {/* Job Card */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
        {/* Job Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
          <div>
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white">
              {job.role}
            </h3>
            <p className="text-lg text-blue-600 dark:text-blue-400 font-semibold">
              {job.company.name}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {job.company.location} • {job.type}
            </p>
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-300 mt-2 md:mt-0">
            <span className="inline-block bg-gray-200 dark:bg-gray-700 px-3 py-1 rounded-full">
              {formatDate(job.startDate)} -{" "}
              {job.current ? "Present" : formatDate(job.endDate)}
            </span>
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          {job.description}
        </p>

        {/* Achievements */}
        {job.achievements && job.achievements.length > 0 && (
          <AchievementsList achievements={job.achievements} />
        )}

        {/* Technologies */}
        {job.technologies && job.technologies.length > 0 && (
          <TechnologyTags technologies={job.technologies} />
        )}
      </div>
    </motion.div>
  );
}
