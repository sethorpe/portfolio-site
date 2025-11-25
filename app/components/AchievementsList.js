"use client";
import React from "react";

export default function AchievementsList({ achievements }) {
  if (!achievements || achievements.length === 0) {
    return null;
  }

  return (
    <div className="mb-4">
      <h4 className="text-sm font-semibold text-gray-800 dark:text-white mb-2">
        Key Achievements:
      </h4>
      <ul className="space-y-2">
        {achievements.map((achievement, i) => (
          <li
            key={i}
            className="flex items-start text-gray-700 dark:text-gray-300"
          >
            <span className="text-green-600 dark:text-green-400 mr-2 flex-shrink-0">
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
  );
}
