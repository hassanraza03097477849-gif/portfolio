# Portfolio CMS — Project Blueprint

Turning your portfolio into a self-managed product: one dashboard controlling every page, project, lead, your CV, and your SEO/GEO setup — built on the Firebase project you already created.

## Contents
1. [Vision](#1-vision)
2. [Stack & assumptions](#2-stack--assumptions)
3. [Architecture](#3-architecture)
4. [Firestore data model](#4-firestore-data-model)
5. [Authentication & roles](#5-authentication--roles)
6. [Dashboard — full screen map](#6-dashboard--full-screen-map)
7. [Public site ↔ CMS data flow](#7-public-site--cms-data-flow)
8. [CV auto-generation engine](#8-cv-auto-generation-engine)
9. [Leads / inquiries system](#9-leads--inquiries-system)
10. [SEO control center](#10-seo-control-center)
11. [GEO — AI engine optimization](#11-geo--ai-engine-optimization)
12. [Security rules (starter)](#12-security-rules-starter)
13. [Suggested folder structure](#13-suggested-folder-structure)
14. [Build roadmap](#14-build-roadmap)
15. [Grand extras (post-MVP)](#15-grand-extras-post-mvp)
16. [Next steps](#16-next-steps)

---

## 1. Vision

Right now your portfolio is a static site with one static CV file. The end state described here is a small product: a public site that reads everything — text, projects, SEO tags, the CV — from Firebase, and a private `/admin` dashboard where you control all of it without touching code again. Three systems, one database:

- **Public site** — what visitors, clients, and search/AI crawlers see.
- **Admin dashboard** — where you edit content, manage leads, build your CV, and control SEO/GEO.
- **Firebase** — the shared backend (Auth, Firestore, Storage, Functions) both sides read and write.

Everything below is organized so you can build it in phases (Section 14) rather than all at once.

## 2. Stack & assumptions

You mentioned you already have a theme, but not what it's built with — so here's the assumption this blueprint makes, and why it matters.

**Assumption: your theme is (or will be ported into) Next.js.** If it's actually plain HTML/CSS/JS or another framework, tell me and I'll adjust — the data model, dashboard screens, and SEO/GEO plan in this document stay valid regardless of frontend framework. Only Sections 3, 7, and 13 (architecture, data-fetching, folder structure) are Next.js-specific.

Why Next.js specifically: your SEO/GEO goal depends on it. Search engines, and especially AI crawlers, need to see real content in the initial HTML response — a client-side-only React app is a real risk for both, since many AI crawlers don't execute JavaScript at all. Next.js gives you server rendering and static generation, so content coming out of Firestore still ships as crawlable HTML.

| Layer | Choice | Why |
|---|---|---|
| Public site | Next.js (App Router), React, your existing theme/CSS | SSR/SSG for SEO+GEO, huge ecosystem, pairs natively with Firebase |
| Admin dashboard | Same Next.js app, protected `/admin` route group | One codebase, one deploy, simplest to maintain solo |
| Database | Firestore | Already set up in your "portfolio" project |
| Auth | Firebase Authentication (email/password, optionally Google) | Already part of the same project |
| File storage | Firebase Storage | Images, generated CV PDFs |
| Server logic | Next.js API routes (Cloud Functions where a background trigger is genuinely needed) | CV generation, lead intake, email notifications |
| Hosting | Firebase App Hosting | Firebase's current, generally-available hosting for full-stack Next.js apps — builds from your GitHub repo, runs SSR on Cloud Run, caches static content on a global CDN. You deploy with a git push. |
| Email | Resend/SendGrid, or the official "Trigger Email" Firebase Extension | Notifies you when a lead comes in |

## 3. Architecture

*(see the diagram above)* Two front ends share one backend:

- The **public site** is what gets crawled and indexed — it only ever *reads* published content from Firestore, plus one public create-only write for the contact form.
- The **admin dashboard** sits behind `/admin`, requires a signed-in session, and is the only thing allowed to write to Firestore/Storage for everything else.
- **Firebase** underneath holds four services: Auth (who can sign in), Firestore (all structured data), Storage (images + generated CV PDFs), and Functions/API routes (the CV generator and lead-notification job).

Two flows worth calling out that aren't drawn in the diagram (left out to keep it readable):

- **Leads** — contact form → API route validates → Firestore `leads` → triggers an email to you → also shows up live in the dashboard inbox.
- **CV** — you edit resume data in the dashboard → click generate → a function renders a PDF from that data → uploads it to Storage → the public "Download CV" button always points at the latest file.

## 4. Firestore data model

### `siteSettings` — one document (`siteSettings/main`)
Global, site-wide info used everywhere: nav, footer, meta defaults, structured data.

| Field | Type | Notes |
|---|---|---|
| siteName, tagline | string | |
| logoUrl, faviconUrl | string | Storage URLs |
| ownerName, ownerTitle | string | Feeds the Person schema (Section 11) |
| email, phone, location | string | |
| socialLinks | map | `{ linkedin, github, behance, instagram, ... }` |
| themeColor | string | hex |
| defaultOgImage | string | Storage URL, fallback social preview image |
| analyticsId | string | GA4 measurement ID |
| gscVerification | string | Google Search Console verification value |

### `siteContent` — one document per page (`home`, `about`, `contact`, `footer`)
Every heading and paragraph on the site, grouped by section, editable as a form. Example shape for `siteContent/home`:

```json
{
  "hero": {
    "heading": "Hi, I'm ...",
    "subheading": "...",
    "ctaText": "View my work",
    "ctaLink": "/projects",
    "backgroundImageUrl": "..."
  },
  "intro": { "heading": "...", "body": "..." },
  "servicesTeaser": {
    "heading": "What I do",
    "items": [{ "title": "...", "description": "...", "icon": "..." }]
  },
  "seo": { "metaTitle": "...", "metaDescription": "...", "ogImage": "..." }
}
```

Each named block (`hero`, `intro`, `servicesTeaser`...) maps to one form section in the dashboard. Adding a new block to a page later just means adding a key here and a matching form field — no schema migration.

### `categories`
Lets you add "Industrial Projects", "Portfolio Projects", or anything else later without touching code.

| Field | Type | Notes |
|---|---|---|
| name | string | "Industrial Projects" |
| slug | string | "industrial-projects" |
| description | string | optional, shown on the category landing page |
| icon | string | optional |
| order | number | for drag-to-reorder |

### `projects`
One collection for every kind of project, filtered by category — instead of hardcoding separate collections per type.

| Field | Type | Notes |
|---|---|---|
| title, slug | string | |
| categoryId | string | ref → `categories` |
| categoryName | string | denormalized copy of the category name, so the list view doesn't need an extra read |
| summary | string | short teaser for cards |
| description | string (markdown) | full body |
| coverImageUrl | string | |
| gallery | array&lt;string&gt; | |
| client, location, projectDate | string | |
| tags, technologies | array&lt;string&gt; | |
| externalUrl | string | optional |
| featured | boolean | shows on homepage |
| status | "draft" \| "published" | |
| order | number | |
| seo | map | `{ metaTitle, metaDescription, ogImage, canonicalUrl, noIndex }` |
| createdAt, updatedAt | timestamp | |

### `leads`

| Field | Type | Notes |
|---|---|---|
| name, email, phone | string | |
| message | string | |
| projectType, budgetRange | string | optional, if your form asks |
| source | string | which page/form it came from |
| status | "new" \| "contacted" \| "qualified" \| "closed" | |
| notes | array&lt;{text, author, at}&gt; | |
| read | boolean | |
| createdAt | timestamp | |

### `cv` — one document (`cv/main`)
Structured resume data — this is what replaces the static PDF.

```json
{
  "personalInfo": {
    "fullName": "", "title": "", "summary": "",
    "email": "", "phone": "", "location": "",
    "photoUrl": "", "website": "", "linkedin": ""
  },
  "experience": [
    { "id": "", "company": "", "role": "", "location": "",
      "startDate": "", "endDate": "", "current": false, "bullets": [""] }
  ],
  "education": [
    { "id": "", "school": "", "degree": "", "field": "", "startDate": "", "endDate": "" }
  ],
  "skills": [{ "category": "", "items": [""] }],
  "certifications": [{ "name": "", "issuer": "", "date": "", "url": "" }],
  "languages": [{ "name": "", "level": "" }],
  "meta": { "pdfUrl": "", "lastGeneratedAt": "", "version": 1 }
}
```

### `admins`
Doc id = Firebase Auth UID.

| Field | Type | Notes |
|---|---|---|
| name, email | string | |
| role | "owner" \| "editor" | checked in both security rules and the dashboard UI |
| createdAt | timestamp | |

## 5. Authentication & roles

- Firebase Authentication, email/password to start — add Google sign-in later if you want a faster login.
- Every dashboard user needs a matching doc in `admins/{uid}`. This is what actually grants access, not just having an account — anyone can sign up for Firebase Auth in theory; only a UID present in `admins` can read/write the CMS collections.
- Two roles: `owner` (everything, including inviting other admins and changing global settings) and `editor` (projects, leads, CV — not settings or user management). Overkill for a solo project today, but it means you can hand content updates to someone else later without giving them the keys to everything.
- **Two layers of protection, not one:**
  1. Next.js `middleware.ts` checks the Firebase session cookie and redirects signed-out users away from `/admin/*` — this is UX, not security.
  2. Firestore security rules are the actual security boundary (Section 12). Never rely on the client-side redirect alone — it's a rule that stops a request that bypasses your UI entirely.

## 6. Dashboard — full screen map

| Module | Screen | What it does |
|---|---|---|
| Overview | Dashboard home | Stat cards (new leads this week, published projects, CV last generated, SEO checklist score) + quick links |
| Content | Home page editor | Edit every hero/intro/teaser block and its SEO fields |
| Content | About page editor | Bio, timeline, skills teaser, SEO fields |
| Content | Contact page editor | Address, map, contact details, form settings |
| Content | Navigation & footer | Menu items (add/reorder), footer text and links |
| Content | Global settings | Site name, logo, favicon, socials, theme color, analytics IDs |
| Projects | Category manager | Add/rename/delete/reorder categories — this is how "and more" stays possible |
| Projects | Projects list | Filter by category/status, search, drag-to-reorder, bulk publish |
| Projects | Project editor | Full form, gallery uploader, markdown description, per-project SEO |
| Leads | Inbox | Table with status pipeline, filters, notes, mark read, CSV export |
| Leads | Notification settings | Toggle email-on-new-lead, set recipient address |
| CV | Resume builder | Repeatable forms for experience/education/skills/certifications, live preview, "Generate PDF" button, version history |
| SEO | Global SEO | Title template, default description/OG image, robots.txt editor, sitemap status, GA/GSC IDs |
| SEO | Per-item SEO | Meta title/description/OG image/canonical/noindex — embedded directly in each page and project editor |
| SEO | Structured data | Person/Organization schema fields, FAQ block editor |
| SEO | GEO toolkit | llms.txt editor + preview, FAQ manager, bio/credentials helper |
| Media | Media library | Upload/browse images, required alt-text field on every asset |
| Settings | Account & team | Change password, invite an editor, manage roles |

## 7. Public site ↔ CMS data flow

- Pages that change rarely (Home, About, Contact) — statically generate (SSG) and use **on-demand revalidation**: when you save in the dashboard, an API route calls `revalidatePath()` so the live page updates within seconds, without a full rebuild.
- Project listing/detail pages — same pattern: SSG plus on-demand revalidation on publish/unpublish, so new projects appear immediately.
- Nothing on the public site needs to be fully dynamic per-request — that keeps it fast (good for Core Web Vitals, which feed into both search ranking and how willingly AI crawlers fetch you) while still feeling instantly updatable from the dashboard.

## 8. CV auto-generation engine

This is the core ask — replacing the static PDF with something generated from live data.

**Pipeline:**
1. You edit CV data in the dashboard (Section 6) → saved to `cv/main` in Firestore.
2. You click **Generate PDF** (or it regenerates automatically a few seconds after your last edit).
3. An admin-only API route reads the latest `cv/main` via the Firebase Admin SDK, renders it into a PDF, uploads the result to Storage at a stable path (`cv/latest.pdf`, overwritten each time — plus optionally a timestamped copy for version history), and writes the new download URL + timestamp back to `cv/main.meta`.
4. The public "Download CV" button always points at that stable Storage URL. Visitors get a file, not a live render — instant, and it never breaks if Firestore is briefly unavailable.

**How to render the PDF — two real options:**

| Approach | Library | Best when |
|---|---|---|
| Component-based | `@react-pdf/renderer` | You want speed and reliability in a serverless function — no headless browser needed, fast cold starts. Design the CV once as a React-PDF template matching your brand. **Recommended default.** |
| Pixel-perfect HTML | Puppeteer/Playwright + `@sparticuz/chromium` | You want the CV to visually match a specific HTML resume design exactly. Heavier and slower to cold-start, but total design freedom. |

Start with `@react-pdf/renderer` unless matching an existing HTML design pixel-for-pixel is non-negotiable.

## 9. Leads / inquiries system

- The contact form submits to an API route rather than writing to Firestore straight from the browser — this lets you validate server-side and add a honeypot field, optionally checking Firebase App Check before writing, which cuts spam without a visible CAPTCHA for real visitors.
- The route writes the lead via the Admin SDK and triggers a notification — either a Cloud Function listening for new `leads` docs, or directly in the same API route. The official Firebase "Trigger Email" extension or a transactional email API (Resend/SendGrid) both work well.
- The dashboard inbox is a live view of the same `leads` collection — status pipeline (new → contacted → qualified → closed), notes, CSV export if you ever want to move data into another CRM.

## 10. SEO control center

**Technical foundation (do these regardless of anything else):**
- Server-rendered/statically-generated pages (Section 2) — content must exist in the initial HTML.
- Unique `metaTitle`/`metaDescription` per page and per project, pulled from each document's `seo` field.
- Open Graph + Twitter Card tags, using `defaultOgImage` as a fallback.
- Canonical URLs, and a `noIndex` toggle per item for drafts or thin pages.
- `app/sitemap.ts` generated dynamically from published `projects` + static pages — Next.js supports this natively, no separate job needed.
- `app/robots.ts` — see Section 11 for what this needs to allow specifically for AI crawlers.
- Structured data (JSON-LD): `Person` (from `siteSettings`), `CreativeWork` per project, `BreadcrumbList` for navigation, `FAQPage` if you add an FAQ block.
- Image alt text as a required field in the media library — helps accessibility, image search, and gives AI crawlers more to work with.
- `next/image` for automatic optimization and lazy-loading, `next/font` for font loading — both feed Core Web Vitals.

**A lightweight SEO health widget** on the dashboard overview can flag pages/projects missing a meta description, images missing alt text, and the sitemap's last-generated time. Keep this to a completeness checklist against your own Firestore fields — a real crawl-based audit belongs in Google Search Console or Lighthouse, not reinvented inside the CMS.

**If your clients matter locally** (freelance work tied to a city or region), a couple of small additions carry real weight: your city/country in the `Person` schema and in page titles where it reads naturally, and a `LocalBusiness` schema block if you operate as a registered business — worth adding to the Structured Data screen alongside `Person`.

## 11. GEO — AI engine optimization

You asked for this specifically, so here's what it actually means and what's worth building for it.

**What it is:** classic SEO gets you ranked in a list of blue links; GEO is about being the thing an AI system (ChatGPT, Perplexity, Gemini, Google AI Overviews, Claude) actually names or quotes when someone asks it a question you could answer. It's an addition to SEO, not a replacement — the technical foundation in Section 10 still has to be there first, since an AI system can't cite a page it can't read.

**What actually moves the needle**, based on current guidance and a widely-cited 2024 study from Princeton and Allen Institute for AI researchers on optimizing content for generative engines:

- **Crawlability first.** Confirm `robots.txt` doesn't block AI crawlers (`GPTBot`, `ChatGPT-User`, `PerplexityBot`, `ClaudeBot`, `Google-Extended`) — this is the single most common self-inflicted problem, especially behind Cloudflare, which has changed its default AI-bot handling more than once. Confirm important content isn't hidden behind client-side JS (already covered by the SSR/SSG choice in Section 2).
- **Write extractable sections.** Short, self-contained passages that directly answer a specific question read better to a retrieval system than long, meandering paragraphs. Your About/bio content and project case studies both benefit from this.
- **Add real specifics.** The strongest documented lever in that study was adding direct quotes, concrete statistics, and cited sources to a passage — vague claims get skipped, specific and sourced ones get pulled into answers.
- **FAQ blocks that match real questions.** Build these around what someone would actually type into an AI chat ("who is a good [your field] in [your city]," not generic filler questions) and mark them up with `FAQPage` schema.
- **Keep it current.** AI citation rates for a page tend to drop off once content is a few months stale — worth a quarterly pass on your About page, featured projects, and any stats you cite.
- **Mentions off your own site count too.** Unlinked brand mentions on other sites (press, directories, guest posts) carry weight with AI systems the same way backlinks do for classic SEO — outside the scope of this CMS build, but worth knowing as you promote your work.

**On `llms.txt` specifically** — a plain-text/markdown file at your site root pointing AI systems at your most important pages. Worth including in the GEO toolkit screen because it's genuinely cheap to generate from data you already have (`siteSettings` + published `projects`), but go in with realistic expectations: it's still a community convention rather than a ratified standard, adoption sits in the high single digits among top sites, and there's no confirmed evidence yet that major AI crawlers actually fetch and use it. Treat it as a low-cost, forward-looking bonus, not a substitute for the crawlability and content-structure work above — that's where the actual evidence points.

**Further reading:**
- Firebase — Next.js hosting integration: https://firebase.google.com/docs/hosting/frameworks/nextjs
- Firebase App Hosting — GA announcement: https://firebase.blog/posts/2025/04/apphosting-general-availability/
- llms.txt specification: https://llmstxt.org
- GEO best-practices overview: https://llmrefs.com/generative-engine-optimization

## 12. Security rules (starter)

Firestore:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {

    function isAdmin() {
      return request.auth != null &&
        exists(/databases/$(database)/documents/admins/$(request.auth.uid));
    }

    match /projects/{projectId} {
      allow read: if resource.data.status == 'published' || isAdmin();
      allow write: if isAdmin();
    }

    match /siteContent/{docId} {
      allow read: if true;
      allow write: if isAdmin();
    }

    match /siteSettings/{docId} {
      allow read: if true;
      allow write: if isAdmin();
    }

    match /categories/{catId} {
      allow read: if true;
      allow write: if isAdmin();
    }

    match /cv/{docId} {
      allow read: if true;
      allow write: if isAdmin();
    }

    match /leads/{leadId} {
      allow create: if true;
      allow read, update, delete: if isAdmin();
    }

    match /admins/{uid} {
      allow read: if request.auth != null && request.auth.uid == uid;
      allow write: if false; // manage through the Firebase console or Admin SDK only
    }
  }
}
```

Storage — a simple starting point (tighten with the same admin check via custom claims before launch):

```
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /public/{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    match /cv/{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

Treat both as starting points, not final rules — go through them again during Phase 7 (Section 14) before you go live.

## 13. Suggested folder structure

```
portfolio-cms/
├─ app/
│  ├─ (public)/
│  │  ├─ page.tsx                      # Home
│  │  ├─ about/page.tsx
│  │  ├─ projects/
│  │  │  ├─ page.tsx                   # all projects
│  │  │  ├─ [category]/page.tsx        # one category
│  │  │  └─ [category]/[slug]/page.tsx # one project
│  │  ├─ contact/page.tsx
│  │  ├─ sitemap.ts
│  │  ├─ robots.ts
│  │  └─ llms.txt/route.ts
│  ├─ admin/
│  │  ├─ layout.tsx                    # protected shell
│  │  ├─ login/page.tsx
│  │  ├─ page.tsx                      # overview
│  │  ├─ content/{home,about,contact,settings}/page.tsx
│  │  ├─ projects/{page.tsx,categories/page.tsx,new/page.tsx,[id]/edit/page.tsx}
│  │  ├─ leads/page.tsx
│  │  ├─ cv/page.tsx
│  │  └─ seo/{page.tsx,geo/page.tsx}
│  └─ api/
│     ├─ leads/route.ts                # form submission gateway
│     └─ cv/generate/route.ts          # PDF generation
├─ components/
│  ├─ public/                          # your theme's UI
│  ├─ admin/                           # dashboard UI
│  └─ shared/
├─ lib/
│  ├─ firebase/{client.ts,admin.ts}
│  ├─ auth.ts
│  └─ types.ts
└─ middleware.ts
```

## 14. Build roadmap

| Phase | Focus | Deliverables |
|---|---|---|
| 0 | Setup | Confirm stack, connect Firebase config, repo scaffold, install Admin SDK |
| 1 | Auth & shell | Firebase Auth, `admins` collection, `/admin` login + protected layout, sidebar/topbar shell |
| 2 | Content manager | `siteSettings`/`siteContent` + rules, editor forms, public pages reading from Firestore |
| 3 | Projects manager | `categories`/`projects` + rules, category manager, project CRUD + image upload, public listing/detail pages |
| 4 | Leads | `leads` + rules, form → API route → Firestore, dashboard inbox, email notification |
| 5 | CV engine | `cv` + rules, resume builder + live preview, PDF generation route, public download button wired to Storage |
| 6 | SEO & GEO | `seo` fields wired everywhere, `sitemap.ts`/`robots.ts`, JSON-LD components, GEO toolkit (`llms.txt`, FAQ), GA4/GSC |
| 7 | Polish & launch | Media library, Core Web Vitals pass, accessibility pass, security rules hardening review, final QA |

## 15. Grand extras (post-MVP)

Worth knowing about now, building later:

- **Insights/blog module** — freshness signals help both SEO and GEO (Section 11), and gives you somewhere to publish case studies.
- **Testimonials** with `Review`/`AggregateRating` schema.
- **Case study pages** with real outcomes/metrics — a strong credibility signal for GEO specifically.
- **Scheduled publishing** — set a project or content change to go live at a future date/time.
- **Activity log** — who changed what, when (matters once you're not the only editor).
- **Block-based page builder** — upgrades `siteContent` from fixed sections to fully dynamic, reorderable blocks, if you ever want to restructure pages without a code change.
- **Multi-language (i18n)** — if you take on international clients.
- **Weekly automated SEO/GEO score email** — a scheduled function summarizing the health-checklist score from Section 10.

## 16. Next steps

This is deliberately the full "grand" version — you don't need to build all of it before it's useful. Phase 1 (auth + schema + dashboard shell) is a solid place to start once you confirm the stack assumption in Section 2. (tell me if you want any mcp for making this so i can connect it to you and also save this blue print in project for memory for you)
