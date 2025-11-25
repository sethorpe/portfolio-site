"use client";
import React from "react";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

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
    marginBottom: 12,
  },
  title: {
    fontSize: 12,
    marginBottom: 6,
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
  skillsGrid: {
    marginBottom: 10,
  },
  skillText: {
    fontSize: 10,
    lineHeight: 1.5,
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
    marginBottom: 8,
  },
  certName: {
    fontSize: 10,
    fontWeight: "bold",
    marginBottom: 2,
  },
  certDetails: {
    fontSize: 9,
    color: "#666",
  },
});

export default function ResumePDF({ experienceData }) {
  if (!experienceData) return null;

  const formatDate = (dateString) => {
    if (!dateString) return null;
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { year: "numeric", month: "short" });
  };

  // Consolidate all skills from all jobs into unique list with smart category mapping
  const getAllSkills = () => {
    // Category mapping to consolidate similar categories
    const categoryMapping = {
      "Programming": "Programming Languages",
      "Automation & Testing": "Testing & Automation Frameworks",
      "Testing Frameworks": "Testing & Automation Frameworks",
      "Testing": "Testing & Automation Frameworks",
      "Automation": "Testing & Automation Frameworks",
      "Data & Databases": "Data & Databases",
      "CI/CD": "CI/CD & DevOps",
      "Tools & Platforms": "Tools & Platforms",
      "Tools": "Tools & Platforms",
      "Specialized Systems": "Specialized Systems",
      "Banking Systems": "Domain Expertise"
    };

    const skillsMap = new Map();

    experienceData.experience.forEach(job => {
      if (job.technologies) {
        job.technologies.forEach(techGroup => {
          // Map category to consolidated name
          const mappedCategory = categoryMapping[techGroup.category] || techGroup.category;

          if (!skillsMap.has(mappedCategory)) {
            skillsMap.set(mappedCategory, new Set());
          }
          techGroup.skills.forEach(skill => {
            skillsMap.get(mappedCategory).add(skill);
          });
        });
      }
    });

    // Define desired order for professional appearance
    const categoryOrder = [
      "Programming Languages",
      "Testing & Automation Frameworks",
      "Data & Databases",
      "CI/CD & DevOps",
      "Tools & Platforms",
      "Specialized Systems",
      "Domain Expertise"
    ];

    // Convert to array format in specific order
    const consolidated = [];
    categoryOrder.forEach(category => {
      if (skillsMap.has(category)) {
        consolidated.push({
          category,
          skills: Array.from(skillsMap.get(category)).sort()
        });
      }
    });

    // Add any unmapped categories at the end
    skillsMap.forEach((skills, category) => {
      if (!categoryOrder.includes(category)) {
        consolidated.push({
          category,
          skills: Array.from(skills).sort()
        });
      }
    });

    return consolidated;
  };

  const consolidatedSkills = getAllSkills();

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.name}>Segun Thorpe</Text>
          <Text style={styles.title}>Software Development Engineer in Test (SDET)</Text>
          <Text style={styles.contactInfo}>
            LinkedIn: linkedin.com/in/s-thorpe
          </Text>
        </View>

        {/* Professional Summary */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Professional Summary</Text>
          <Text style={styles.summaryText}>
            Experienced SDET with {experienceData.summary.totalYearsExperience}+ years of testing
            experience, specializing in test automation using C#, Python, and Java. Delivered $
            {(experienceData.summary.costSavingsDelivered / 1000).toFixed(0)}K+ in cost savings
            through automation initiatives and {experienceData.summary.automationHoursSaved.toLocaleString()}+
            hours saved via automation. Strong financial services domain expertise in banking
            systems, payment processing, and regulatory compliance.
          </Text>
        </View>

        {/* Consolidated Technical Skills */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Technical Skills</Text>
          <View style={styles.skillsGrid}>
            {consolidatedSkills.map((skillGroup, i) => (
              <View key={i} style={{ marginBottom: 6 }}>
                <Text style={styles.skillText}>
                  <Text style={{ fontWeight: "bold" }}>{skillGroup.category}:</Text> {skillGroup.skills.join(", ")}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* Professional Experience */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Professional Experience</Text>

          {experienceData.experience.map((job, index) => (
            <React.Fragment key={job.id}>
              <View style={{ marginBottom: 12 }} break={index === 1}>
                {/* Job Header */}
                <View style={styles.jobHeader}>
                  <Text style={styles.jobTitle}>{job.role}</Text>
                  <Text style={styles.company}>
                    {job.company.name}
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
              </View>
            </React.Fragment>
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
                <Text style={styles.certName}>{cert.name}</Text>
                <Text style={styles.certDetails}>
                  {cert.issuer} | {cert.date}
                </Text>
              </View>
            ))}
          </View>
        )}
      </Page>
    </Document>
  );
}
