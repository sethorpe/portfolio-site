"use client";
import React from "react";

export default function TechnologyTags({ technologies }) {
  if (!technologies || technologies.length === 0) {
    return null;
  }

  return (
    <div>
      <h4 className="text-sm font-semibold text-gray-800 dark:text-white mb-2">
        Technologies & Tools:
      </h4>
      <div className="space-y-2">
        {technologies.map((techGroup, i) => (
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
  );
}
