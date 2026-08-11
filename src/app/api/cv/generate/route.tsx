import { NextResponse } from 'next/server';
import { adminDb, adminStorage } from '@/lib/firebase/admin';
import { Document, Page, Text, View, StyleSheet, renderToBuffer } from '@react-pdf/renderer';

// Register standard fonts if needed, but Helvetica is built-in

// --- Minimal Template ---
const minimalStyles = StyleSheet.create({
  page: { flexDirection: 'column', padding: 40, fontFamily: 'Helvetica' },
  header: { marginBottom: 20 },
  name: { fontSize: 24, fontWeight: 'bold', marginBottom: 5 },
  title: { fontSize: 14, color: '#666', marginBottom: 10 },
  summary: { fontSize: 10, lineHeight: 1.5, marginBottom: 20 },
  sectionTitle: { fontSize: 14, fontWeight: 'bold', borderBottom: '1 solid #000', paddingBottom: 5, marginBottom: 10 },
  expItem: { marginBottom: 10 },
  expRole: { fontSize: 12, fontWeight: 'bold' },
  expCompanyDate: { fontSize: 10, color: '#666', marginBottom: 5 },
  skills: { fontSize: 10, lineHeight: 1.5 }
});

const MinimalCV = ({ data }: { data: any }) => (
  <Document>
    <Page size="A4" style={minimalStyles.page}>
      <View style={minimalStyles.header}>
        <Text style={minimalStyles.name}>{data.name}</Text>
        <Text style={minimalStyles.title}>{data.title}</Text>
        <Text style={minimalStyles.summary}>{data.summary}</Text>
      </View>
      <View>
        <Text style={minimalStyles.sectionTitle}>Experience</Text>
        {data.experience?.map((exp: any, i: number) => (
          <View key={i} style={minimalStyles.expItem}>
            <Text style={minimalStyles.expRole}>{exp.role}</Text>
            <Text style={minimalStyles.expCompanyDate}>{exp.company} | {exp.dates}</Text>
          </View>
        ))}
      </View>
      <View style={{ marginTop: 20 }}>
        <Text style={minimalStyles.sectionTitle}>Education</Text>
        {data.education?.map((edu: any, i: number) => (
          <View key={i} style={minimalStyles.expItem}>
            <Text style={minimalStyles.expRole}>{edu.title}</Text>
            <Text style={minimalStyles.expCompanyDate}>{edu.institution}</Text>
          </View>
        ))}
      </View>
      <View style={{ marginTop: 20 }}>
        <Text style={minimalStyles.sectionTitle}>Skills</Text>
        <Text style={minimalStyles.skills}>{data.skills?.join(' • ') || 'Next.js • React • TypeScript • Node.js'}</Text>
      </View>
    </Page>
  </Document>
);

// --- Modern Template ---
const modernStyles = StyleSheet.create({
  page: { flexDirection: 'row', fontFamily: 'Helvetica' },
  sidebar: { width: '35%', backgroundColor: '#111', color: '#fff', padding: 30 },
  main: { width: '65%', padding: 40 },
  name: { fontSize: 20, fontWeight: 'bold', marginBottom: 5, color: '#fff' },
  title: { fontSize: 12, color: '#aaa', marginBottom: 20 },
  sidebarSection: { marginBottom: 20 },
  sidebarTitle: { fontSize: 12, fontWeight: 'bold', marginBottom: 10, borderBottom: '1 solid #333', paddingBottom: 5, color: '#fff' },
  sidebarText: { fontSize: 10, marginBottom: 5, color: '#ccc' },
  mainSectionTitle: { fontSize: 16, fontWeight: 'bold', borderBottom: '2 solid #111', paddingBottom: 5, marginBottom: 15, color: '#111' },
  summary: { fontSize: 10, lineHeight: 1.5, color: '#444', marginBottom: 20 },
  expItem: { marginBottom: 15 },
  expRole: { fontSize: 14, fontWeight: 'bold', color: '#111' },
  expCompanyDate: { fontSize: 10, color: '#666', marginBottom: 5 },
  expDesc: { fontSize: 10, color: '#444', lineHeight: 1.4 }
});

const ModernCV = ({ data }: { data: any }) => (
  <Document>
    <Page size="A4" style={modernStyles.page}>
      <View style={modernStyles.sidebar}>
        <Text style={modernStyles.name}>{data.name}</Text>
        <Text style={modernStyles.title}>{data.title}</Text>
        
        <View style={modernStyles.sidebarSection}>
          <Text style={modernStyles.sidebarTitle}>Contact</Text>
          <Text style={modernStyles.sidebarText}>{data.email}</Text>
          <Text style={modernStyles.sidebarText}>{data.phone}</Text>
          <Text style={modernStyles.sidebarText}>{data.location}</Text>
        </View>

        <View style={modernStyles.sidebarSection}>
          <Text style={modernStyles.sidebarTitle}>Skills</Text>
          {(data.skills || ['Next.js', 'React', 'TypeScript', 'Node.js', 'Tailwind CSS']).map((skill: string, i: number) => (
            <Text key={i} style={modernStyles.sidebarText}>• {skill}</Text>
          ))}
        </View>
      </View>
      <View style={modernStyles.main}>
        <Text style={modernStyles.mainSectionTitle}>About Me</Text>
        <Text style={modernStyles.summary}>{data.summary}</Text>

        <Text style={modernStyles.mainSectionTitle}>Experience</Text>
        {data.experience?.map((exp: any, i: number) => (
          <View key={i} style={modernStyles.expItem}>
            <Text style={modernStyles.expRole}>{exp.role}</Text>
            <Text style={modernStyles.expCompanyDate}>{exp.company} | {exp.dates}</Text>
            <Text style={modernStyles.expDesc}>{exp.description}</Text>
          </View>
        ))}
        <Text style={modernStyles.mainSectionTitle}>Education</Text>
        {data.education?.map((edu: any, i: number) => (
          <View key={i} style={modernStyles.expItem}>
            <Text style={modernStyles.expRole}>{edu.title}</Text>
            <Text style={modernStyles.expCompanyDate}>{edu.institution}</Text>
            <Text style={modernStyles.expDesc}>{edu.description}</Text>
          </View>
        ))}
      </View>
    </Page>
  </Document>
);

// --- Classic Template ---
const classicStyles = StyleSheet.create({
  page: { padding: 50, fontFamily: 'Times-Roman' },
  header: { textAlign: 'center', borderBottom: '2 solid #000', paddingBottom: 10, marginBottom: 20 },
  name: { fontSize: 26, fontWeight: 'bold', textTransform: 'uppercase' },
  contactInfo: { fontSize: 10, marginTop: 5 },
  sectionTitle: { fontSize: 14, fontWeight: 'bold', textTransform: 'uppercase', borderBottom: '1 solid #000', marginBottom: 10, marginTop: 15 },
  summary: { fontSize: 11, lineHeight: 1.5 },
  expItem: { marginBottom: 15 },
  expHeader: { flexDirection: 'row', justifyContent: 'space-between' },
  expRole: { fontSize: 12, fontWeight: 'bold' },
  expDates: { fontSize: 11, fontStyle: 'italic' },
  expCompany: { fontSize: 11, fontStyle: 'italic', marginBottom: 5 },
  expDesc: { fontSize: 11, lineHeight: 1.4 },
  skills: { fontSize: 11, lineHeight: 1.5 }
});

const ClassicCV = ({ data }: { data: any }) => (
  <Document>
    <Page size="A4" style={classicStyles.page}>
      <View style={classicStyles.header}>
        <Text style={classicStyles.name}>{data.name}</Text>
        <Text style={classicStyles.contactInfo}>{data.email} | {data.phone} | {data.location}</Text>
      </View>
      
      <View>
        <Text style={classicStyles.sectionTitle}>Professional Summary</Text>
        <Text style={classicStyles.summary}>{data.summary}</Text>
      </View>

      <View>
        <Text style={classicStyles.sectionTitle}>Experience</Text>
        {data.experience?.map((exp: any, i: number) => (
          <View key={i} style={classicStyles.expItem}>
            <View style={classicStyles.expHeader}>
              <Text style={classicStyles.expRole}>{exp.role}</Text>
              <Text style={classicStyles.expDates}>{exp.dates}</Text>
            </View>
            <Text style={classicStyles.expCompany}>{exp.company}</Text>
            <Text style={classicStyles.expDesc}>{exp.description}</Text>
          </View>
        ))}
      </View>

      <View>
        <Text style={classicStyles.sectionTitle}>Education</Text>
        {data.education?.map((edu: any, i: number) => (
          <View key={i} style={classicStyles.expItem}>
            <View style={classicStyles.expHeader}>
              <Text style={classicStyles.expRole}>{edu.title}</Text>
            </View>
            <Text style={classicStyles.expCompany}>{edu.institution}</Text>
            <Text style={classicStyles.expDesc}>{edu.description}</Text>
          </View>
        ))}
      </View>

      <View>
        <Text style={classicStyles.sectionTitle}>Skills</Text>
        <Text style={classicStyles.skills}>{(data.skills || ['Next.js', 'React', 'TypeScript', 'Node.js', 'Tailwind CSS']).join(', ')}</Text>
      </View>
    </Page>
  </Document>
);

export async function GET() {
  try {
    const docSnap = await adminDb.collection("cv").doc("main").get();
    if (!docSnap.exists) {
      return NextResponse.json({ error: "CV data not found" }, { status: 404 });
    }
    const data = docSnap.data() as any;

    const template = data.selectedTemplate || 'minimal';
    let CVComponent;
    if (template === 'modern') CVComponent = <ModernCV data={data} />;
    else if (template === 'classic') CVComponent = <ClassicCV data={data} />;
    else CVComponent = <MinimalCV data={data} />;

    // Generate PDF buffer
    // @ts-ignore
    const buffer = await renderToBuffer(CVComponent);

    return new NextResponse(buffer as any, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'inline; filename="Hassan_Raza_CV.pdf"',
      },
    });
  } catch (error: any) {
    console.error("CV generation error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
