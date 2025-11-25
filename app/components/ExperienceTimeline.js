"use client";
import React from "react";
import JobCard from "./JobCard";

export default function ExperienceTimeline({ experiences }) {
  if (!experiences || experiences.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600 dark:text-gray-300">No experience data available.</p>
      </div>
    );
  }

  return (
    <div className="relative border-l-4 border-blue-600 dark:border-blue-400 ml-4">
      {experiences.map((job, index) => (
        <JobCard key={job.id} job={job} index={index} />
      ))}
    </div>
  );
}
