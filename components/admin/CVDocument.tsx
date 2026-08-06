import React from 'react';
import { Document, Page, Text, View, StyleSheet, Link } from '@react-pdf/renderer';
import { CVData } from '@/lib/types';

// Minimalist black and white styling for the PDF
const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontFamily: 'Helvetica',
    fontSize: 10,
    lineHeight: 1.5,
    color: '#111',
  },
  header: {
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    paddingBottom: 10,
  },
  name: {
    fontSize: 24,
    fontFamily: 'Helvetica-Bold',
    marginBottom: 4,
  },
  title: {
    fontSize: 12,
    color: '#444',
    marginBottom: 8,
  },
  contact: {
    fontSize: 9,
    color: '#666',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  section: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 12,
    fontFamily: 'Helvetica-Bold',
    borderBottomWidth: 0.5,
    borderBottomColor: '#ccc',
    paddingBottom: 4,
    marginBottom: 8,
    textTransform: 'uppercase',
  },
  itemGroup: {
    marginBottom: 12,
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 2,
  },
  itemTitle: {
    fontFamily: 'Helvetica-Bold',
  },
  itemSubtitle: {
    fontFamily: 'Helvetica-Oblique',
    color: '#444',
  },
  itemDate: {
    color: '#666',
    fontSize: 9,
  },
  bulletPoint: {
    flexDirection: 'row',
    marginBottom: 2,
    paddingLeft: 8,
  },
  bullet: {
    width: 10,
  },
  bulletText: {
    flex: 1,
  },
  summary: {
    marginBottom: 16,
  }
});

export const CVDocument = ({ data }: { data: CVData }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.name}>{data.personalInfo.fullName}</Text>
        <Text style={styles.title}>{data.personalInfo.title}</Text>
        <View style={styles.contact}>
          {data.personalInfo.email && <Text>{data.personalInfo.email}</Text>}
          {data.personalInfo.phone && <Text>• {data.personalInfo.phone}</Text>}
          {data.personalInfo.location && <Text>• {data.personalInfo.location}</Text>}
          {data.personalInfo.website && <Link src={data.personalInfo.website}>• Website</Link>}
          {data.personalInfo.linkedin && <Link src={data.personalInfo.linkedin}>• LinkedIn</Link>}
        </View>
      </View>

      {/* SUMMARY */}
      {data.personalInfo.summary && (
        <View style={styles.summary}>
          <Text>{data.personalInfo.summary}</Text>
        </View>
      )}

      {/* EXPERIENCE */}
      {data.experience && data.experience.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Experience</Text>
          {data.experience.map((exp, i) => (
            <View key={i} style={styles.itemGroup}>
              <View style={styles.itemHeader}>
                <Text style={styles.itemTitle}>{exp.role} at {exp.company}</Text>
                <Text style={styles.itemDate}>{exp.startDate} - {exp.current ? 'Present' : exp.endDate}</Text>
              </View>
              {exp.location && <Text style={styles.itemSubtitle}>{exp.location}</Text>}
              <View style={{ marginTop: 4 }}>
                {exp.bullets.map((b, idx) => (
                  <View key={idx} style={styles.bulletPoint}>
                    <Text style={styles.bullet}>•</Text>
                    <Text style={styles.bulletText}>{b}</Text>
                  </View>
                ))}
              </View>
            </View>
          ))}
        </View>
      )}

      {/* EDUCATION */}
      {data.education && data.education.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Education</Text>
          {data.education.map((edu, i) => (
            <View key={i} style={styles.itemGroup}>
              <View style={styles.itemHeader}>
                <Text style={styles.itemTitle}>{edu.degree} in {edu.field}</Text>
                <Text style={styles.itemDate}>{edu.startDate} - {edu.endDate}</Text>
              </View>
              <Text style={styles.itemSubtitle}>{edu.school}</Text>
            </View>
          ))}
        </View>
      )}

      {/* SKILLS */}
      {data.skills && data.skills.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Skills</Text>
          {data.skills.map((skill, i) => (
            <View key={i} style={{ flexDirection: 'row', marginBottom: 2 }}>
              <Text style={{ fontFamily: 'Helvetica-Bold', width: 100 }}>{skill.category}:</Text>
              <Text style={{ flex: 1 }}>{skill.items.join(', ')}</Text>
            </View>
          ))}
        </View>
      )}

    </Page>
  </Document>
);
