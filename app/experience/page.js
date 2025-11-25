"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import ExperienceTimeline from "../components/ExperienceTimeline";

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
                    ${(experienceData.summary.costSavingsDelivered / 1000).toFixed(0)}K+
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-300 mt-2">
                    Cost Savings Delivered
                  </div>
                </div>
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md text-center">
                  <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">
                    {experienceData.summary.automationHoursSaved.toLocaleString()}+
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-300 mt-2">
                    Hours Saved via Automation
                  </div>
                </div>
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md text-center">
                  <div className="text-3xl font-bold text-orange-600 dark:text-orange-400">
                    {experienceData.summary.criticalProjectsDelivered}+
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-300 mt-2">
                    Critical Projects
                  </div>
                </div>
              </motion.div>

              {/* Timeline Items */}
              <ExperienceTimeline experiences={experienceData.experience} />

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
