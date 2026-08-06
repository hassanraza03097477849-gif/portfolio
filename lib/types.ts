export interface SiteSettings {
  siteName: string;
  tagline: string;
  logoUrl: string;
  faviconUrl: string;
  ownerName: string;
  ownerTitle: string;
  email: string;
  phone: string;
  location: string;
  socialLinks: {
    linkedin?: string;
    github?: string;
    behance?: string;
    instagram?: string;
  };
  themeColor: string;
  defaultOgImage: string;
  analyticsId: string;
  gscVerification: string;
}

export interface SEOFields {
  metaTitle: string;
  metaDescription: string;
  ogImage: string;
}

export interface HomeContent {
  hero: {
    heading: string;
    subheading: string;
    ctaText: string;
    ctaLink: string;
    backgroundImageUrl: string;
  };
  intro: {
    heading: string;
    body: string;
  };
  servicesTeaser: {
    heading: string;
    items: Array<{ title: string; description: string; icon: string }>;
  };
  seo: SEOFields;
}

export interface AboutContent {
  bio: {
    heading: string;
    body: string;
  };
  skillsTeaser: {
    heading: string;
    items: string[];
  };
  seo: SEOFields;
}

export interface ContactContent {
  contactDetails: {
    heading: string;
    body: string;
    address: string;
  };
  seo: SEOFields;
}

export interface Category {
  id?: string;
  name: string;
  slug: string;
  description?: string;
  icon?: string;
  order: number;
}

export interface Project {
  id?: string;
  title: string;
  slug: string;
  categoryId: string;
  categoryName: string;
  summary: string;
  description: string; // markdown
  coverImageUrl: string;
  gallery: string[];
  client?: string;
  location?: string;
  projectDate?: string;
  tags: string[];
  technologies: string[];
  externalUrl?: string;
  featured: boolean;
  status: 'draft' | 'published';
  order: number;
  seo: SEOFields;
  createdAt: number;
  updatedAt: number;
}

export interface Lead {
  id?: string;
  name: string;
  email: string;
  phone?: string;
  message: string;
  projectType?: string;
  budgetRange?: string;
  source: string;
  status: 'new' | 'contacted' | 'qualified' | 'closed';
  notes: Array<{ text: string; author: string; at: number }>;
  read: boolean;
  createdAt: number;
}

export interface CVData {
  personalInfo: {
    fullName: string;
    title: string;
    summary: string;
    email: string;
    phone: string;
    location: string;
    photoUrl: string;
    website: string;
    linkedin: string;
  };
  experience: Array<{
    id: string;
    company: string;
    role: string;
    location: string;
    startDate: string;
    endDate: string;
    current: boolean;
    bullets: string[];
  }>;
  education: Array<{
    id: string;
    school: string;
    degree: string;
    field: string;
    startDate: string;
    endDate: string;
  }>;
  skills: Array<{
    category: string;
    items: string[];
  }>;
  certifications: Array<{
    name: string;
    issuer: string;
    date: string;
    url: string;
  }>;
  languages: Array<{
    name: string;
    level: string;
  }>;
  meta: {
    pdfUrl: string;
    lastGeneratedAt: string;
    version: number;
  };
}
