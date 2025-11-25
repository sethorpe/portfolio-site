"use client";
import React from "react";
import { Document, Page, Text, View, StyleSheet, Link } from "@react-pdf/renderer";

// ATS-friendly styles - simple, clean, no fancy formatting
const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontFamily: "Helvetica",
    fontSize: 10,
    lineHeight: 1.4,
  },
  header: {
    marginBottom: 20,
    borderBottom: "2 solid #000",
    paddingBottom: 10,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 5,
  },
  contactInfo: {
    fontSize: 9,
    color: "#333",
    marginBottom: 3,
  },
  section: {
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 8,
    textTransform: "uppercase",
    borderBottom: "1 solid #333",
    paddingBottom: 3,
  },
  jobHeader: {
    marginBottom: 5,
  },
  jobTitle: {
    fontSize: 11,
    fontWeight: "bold",
  },
  company: {
    fontSize: 10,
    fontWeight: "bold",
    color: "#333",
  },
  jobMeta: {
    fontSize: 9,
    color: "#666",
    marginBottom: 5,
  },
  description: {
    fontSize: 10,
    marginBottom: 5,
    lineHeight: 1.3,
  },
  bulletList: {
    marginLeft: 15,
    marginBottom: 8,
  },
  bulletItem: {
    flexDirection: "row",
    marginBottom: 3,
  },
  bullet: {
    width: 10,
    fontSize: 10,
  },
  bulletText: {
    flex: 1,
    fontSize: 10,
    lineHeight: 1.3,
  },
  techSection: {
    marginTop: 5,
    marginBottom: 8,
  },
  techCategory: {
    fontSize: 9,
    fontWeight: "bold",
    marginBottom: 2,
  },
  techSkills: {
    fontSize: 9,
    marginBottom: 3,
    marginLeft: 10,
  },
  summaryText: {
    fontSize: 10,
    lineHeight: 1.4,
    marginBottom: 10,
  },
  educationItem: {
    marginBottom: 8,
  },
  certItem: {
    marginBottom: 5,
  },
});

export default function ResumePDF({ experienceData }) {
  if (!experienceData) return null;

  const formatDate = (dateString) => {
    if (!dateString) return null;
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { year: "numeric", month: "short" });
  };

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.name}>Segun Thorpe</Text>
          <Text style={styles.contactInfo}>Software Development Engineer in Test (SDET)</Text>
          <Text style={styles.contactInfo}>
            Email: your.email@example.com | LinkedIn: linkedin.com/in/yourprofile
          </Text>
        </View>

        {/* Professional Summary */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Professional Summary</Text>
          <Text style={styles.summaryText}>
            Experienced SDET with {experienceData.summary.totalYearsExperience}+ years of testing
            experience, specializing in test automation using C#, Python, and Java. Delivered $
            {(experienceData.summary.costSavingsDelivered / 1000).toFixed(0)}K+ in cost savings
            through automation initiatives. Strong financial services domain expertise in banking
            systems, payment processing, and regulatory compliance.
          </Text>
        </View>

        {/* Professional Experience */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Professional Experience</Text>

          {experienceData.experience.map((job, index) => (
            <View key={job.id} style={{ marginBottom: 12 }}>
              {/* Job Header */}
              <View style={styles.jobHeader}>
                <Text style={styles.jobTitle}>{job.role}</Text>
                <Text style={styles.company}>
                  {job.company.name} | {job.company.location}
                </Text>
                <Text style={styles.jobMeta}>
                  {formatDate(job.startDate)} - {job.current ? "Present" : formatDate(job.endDate)}{" "}
                  | {job.type}
                </Text>
              </View>

              {/* Achievements */}
              {job.achievements && job.achievements.length > 0 && (
                <View style={styles.bulletList}>
                  {job.achievements.map((achievement, i) => (
                    <View key={i} style={styles.bulletItem}>
                      <Text style={styles.bullet}>•</Text>
                      <Text style={styles.bulletText}>
                        {achievement.text} ({achievement.metric})
                      </Text>
                    </View>
                  ))}
                </View>
              )}

              {/* Technologies */}
              {job.technologies && job.technologies.length > 0 && (
                <View style={styles.techSection}>
                  {job.technologies.map((techGroup, i) => (
                    <View key={i}>
                      <Text style={styles.techCategory}>{techGroup.category}:</Text>
                      <Text style={styles.techSkills}>{techGroup.skills.join(", ")}</Text>
                    </View>
                  ))}
                </View>
              )}
            </View>
          ))}
        </View>

        {/* Education */}
        {experienceData.education && experienceData.education.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Education</Text>
            {experienceData.education.map((edu, index) => (
              <View key={index} style={styles.educationItem}>
                <Text style={styles.jobTitle}>
                  {edu.degree} - {edu.field}
                </Text>
                <Text style={styles.company}>{edu.institution}</Text>
              </View>
            ))}
          </View>
        )}

        {/* Certifications */}
        {experienceData.certifications && experienceData.certifications.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Certifications</Text>
            {experienceData.certifications.map((cert, index) => (
              <View key={index} style={styles.certItem}>
                <Text style={styles.bulletText}>
                  {cert.name} - {cert.issuer} ({cert.date})
                </Text>
              </View>
            ))}
          </View>
        )}
      </Page>
    </Document>
  );
}
