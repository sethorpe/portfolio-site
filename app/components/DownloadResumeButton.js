"use client";
import React, { useState } from "react";
import { pdf } from "@react-pdf/renderer";
import ResumePDF from "./ResumePDF";

export default function DownloadResumeButton({ experienceData }) {
  const [isGenerating, setIsGenerating] = useState(false);

  const handleDownload = async () => {
    if (!experienceData) {
      alert("Resume data not available");
      return;
    }

    setIsGenerating(true);

    try {
      // Generate PDF blob
      const blob = await pdf(<ResumePDF experienceData={experienceData} />).toBlob();

      // Create download link
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "Segun_Thorpe_Resume.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Clean up
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert("Failed to generate resume PDF. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <button
      className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg shadow-lg transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
      onClick={handleDownload}
      disabled={isGenerating || !experienceData}
    >
      {isGenerating ? "Generating PDF..." : "Download Resume (PDF)"}
    </button>
  );
}
