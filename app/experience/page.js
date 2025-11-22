"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";

export default function Experience() {
  const [experienceData, setExperienceData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("/data/experienceData.json")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch experience data");
        }
        return res.json();
      })
      .then((data) => {
        setExperienceData(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching experienceData:", error);
        setError(error.message);
        setLoading(false);
      });
  }, []);

  return (
    <>
      <Navbar />
      <main className="flex flex-col items-center bg-gray-100 dark:bg-gray-900 px-6 py-20 min-h-screen">
        <motion.section
          className="w-full max-w-5xl py-12"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Page Header */}
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-gray-800 dark:text-white mb-4">
              Professional Experience
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              {loading ? (
                "Loading..."
              ) : experienceData ? (
                `${experienceData.summary.totalYearsExperience}+ years of experience in Software Development, Quality Assurance, and Test Automation`
              ) : (
                "Explore my professional journey"
              )}
            </p>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="text-center py-12">
              <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent"></div>
              <p className="mt-4 text-gray-600 dark:text-gray-300">Loading experience data...</p>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="bg-red-100 dark:bg-red-900 border border-red-400 dark:border-red-600 text-red-700 dark:text-red-200 px-6 py-4 rounded-lg">
              <h3 className="font-bold mb-2">Error Loading Experience Data</h3>
              <p>{error}</p>
            </div>
          )}

          {/* Experience Timeline */}
          {!loading && !error && experienceData && (
            <div className="space-y-8">
              {/* Summary Stats */}
              <motion.div
                className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md text-center">
                  <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                    {experienceData.summary.totalYearsExperience}+
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-300 mt-2">
                    Years Experience
                  </div>
                </div>
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md text-center">
                  <div className="text-3xl font-bold text-green-600 dark:text-green-400">
                    {experienceData.summary.testCasesAutomated}+
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-300 mt-2">
                    Tests Automated
                  </div>
                </div>
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md text-center">
                  <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">
                    {experienceData.summary.totalProjects}+
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-300 mt-2">
                    Projects Completed
                  </div>
                </div>
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md text-center">
                  <div className="text-3xl font-bold text-orange-600 dark:text-orange-400">
                    {experienceData.summary.bugsCaught}+
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-300 mt-2">
                    Bugs Caught
                  </div>
                </div>
              </motion.div>

              {/* Timeline Items */}
              <div className="relative border-l-4 border-blue-600 dark:border-blue-400 ml-4">
                {experienceData.experience.map((job, index) => (
                  <motion.div
                    key={job.id}
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
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-300 mt-2 md:mt-0">
                          <span className="inline-block bg-gray-200 dark:bg-gray-700 px-3 py-1 rounded-full">
                            {new Date(job.startDate).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "short",
                            })}{" "}
                            -{" "}
                            {job.current
                              ? "Present"
                              : new Date(job.endDate).toLocaleDateString("en-US", {
                                  year: "numeric",
                                  month: "short",
                                })}
                          </span>
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-gray-700 dark:text-gray-300 mb-4">
                        {job.description}
                      </p>

                      {/* Achievements */}
                      {job.achievements && job.achievements.length > 0 && (
                        <div className="mb-4">
                          <h4 className="text-sm font-semibold text-gray-800 dark:text-white mb-2">
                            Key Achievements:
                          </h4>
                          <ul className="space-y-2">
                            {job.achievements.map((achievement, i) => (
                              <li
                                key={i}
                                className="flex items-start text-gray-700 dark:text-gray-300"
                              >
                                <span className="text-green-600 dark:text-green-400 mr-2">
                                  ✓
                                </span>
                                <span>
                                  {achievement.text}{" "}
                                  <span className="font-semibold text-blue-600 dark:text-blue-400">
                                    ({achievement.metric})
                                  </span>
                                </span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Technologies */}
                      {job.technologies && job.technologies.length > 0 && (
                        <div>
                          <h4 className="text-sm font-semibold text-gray-800 dark:text-white mb-2">
                            Technologies & Tools:
                          </h4>
                          <div className="space-y-2">
                            {job.technologies.map((techGroup, i) => (
                              <div key={i}>
                                <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">
                                  {techGroup.category}:
                                </p>
                                <div className="flex flex-wrap gap-2">
                                  {techGroup.skills.map((skill, j) => (
                                    <span
                                      key={j}
                                      className="text-xs bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded"
                                    >
                                      {skill}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Download Resume Button */}
              <motion.div
                className="text-center mt-12"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <button
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg shadow-lg transition-colors"
                  onClick={() => alert("PDF download feature coming soon!")}
                >
                  Download Resume (PDF)
                </button>
              </motion.div>
            </div>
          )}
        </motion.section>
      </main>
    </>
  );
}
