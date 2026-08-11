import { getAdminDb } from "@/lib/firebase/admin";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Link from "next/link";
import type { Metadata } from "next";

export const revalidate = 60;

type Props = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const doc = await getAdminDb().collection("projects").doc(id).get();
  if (!doc.exists) return { title: "Project Not Found" };
  const p = doc.data()!;
  return {
    title: `${p.title} | Hassan Raza`,
    description: p.shortDescription,
    openGraph: {
      title: `${p.title} | Hassan Raza`,
      description: p.shortDescription,
      images: [{ url: p.image }],
    },
  };
}

export default async function ProjectDetailPage({ params }: Props) {
  const { id } = await params;
  const doc = await getAdminDb().collection("projects").doc(id).get();
  if (!doc.exists) notFound();
  const project = { id: doc.id, ...doc.data() } as any;

  // Fetch 3 other projects for "More Work" section
  const allSnap = await getAdminDb().collection("projects").limit(4).get();
  const related = allSnap.docs
    .map(d => ({ id: d.id, ...d.data() } as any))
    .filter(p => p.id !== id)
    .slice(0, 3);

  return (
    <div className="bg-white dark:bg-[#0a0a0a] min-h-screen text-black dark:text-white transition-colors">
      <Navbar />

      <main>
        {/* Hero */}
        <section className="pt-40 pb-20 max-w-7xl mx-auto px-6">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-black dark:hover:text-white transition-colors mb-12"
          >
            <i className="fa-solid fa-arrow-left"></i> All Projects
          </Link>

          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Left: Info */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <span className="text-xs font-bold uppercase tracking-widest text-gray-400">
                  {project.category}
                </span>
                {project.year && (
                  <>
                    <span className="w-1 h-1 rounded-full bg-gray-300 dark:bg-zinc-700"></span>
                    <span className="text-xs font-bold tracking-widest text-gray-400">
                      {project.year}
                    </span>
                  </>
                )}
              </div>

              <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-none mb-8">
                {project.title}
              </h1>

              <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed mb-10 max-w-lg">
                {project.detailedDescription || project.shortDescription}
              </p>

              {/* Tech Stack */}
              {project.tech?.length > 0 && (
                <div className="mb-10">
                  <h3 className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-4">
                    Tech Stack
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((t: string, i: number) => (
                      <span
                        key={i}
                        className="text-xs font-bold uppercase tracking-widest border border-gray-200 dark:border-zinc-800 px-3 py-1.5 text-black dark:text-white"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-4">
                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 bg-black dark:bg-white text-white dark:text-black px-8 py-4 text-xs font-black uppercase tracking-widest hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors"
                  >
                    Live Demo <i className="fa-solid fa-arrow-up-right-from-square"></i>
                  </a>
                )}
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 border border-black dark:border-white text-black dark:text-white px-8 py-4 text-xs font-black uppercase tracking-widest hover:bg-gray-50 dark:hover:bg-zinc-900 transition-colors"
                  >
                    <i className="fa-brands fa-github text-lg"></i> Source
                  </a>
                )}
              </div>
            </div>

            {/* Right: Image */}
            <div className="relative bg-gray-100 dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 overflow-hidden">
              {project.image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-auto object-cover grayscale hover:grayscale-0 transition-all duration-700"
                />
              ) : (
                <div className="aspect-video w-full flex items-center justify-center text-gray-300 dark:text-zinc-700">
                  <i className="fa-solid fa-image text-4xl"></i>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Features */}
        {project.features?.length > 0 && (
          <section className="py-20 bg-gray-50 dark:bg-[#111] border-y border-gray-200 dark:border-zinc-900">
            <div className="max-w-7xl mx-auto px-6">
              <h2 className="text-3xl font-black tracking-tighter mb-12">Key Features</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {project.features.map((feature: string, i: number) => (
                  <div
                    key={i}
                    className="p-6 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800"
                  >
                    <div className="w-8 h-8 bg-black dark:bg-white flex items-center justify-center mb-4">
                      <i className="fa-solid fa-check text-white dark:text-black text-xs"></i>
                    </div>
                    <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                      {feature}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* More Projects */}
        {related.length > 0 && (
          <section className="py-20 max-w-7xl mx-auto px-6">
            <div className="flex items-center justify-between mb-12">
              <h2 className="text-3xl font-black tracking-tighter">More Work</h2>
              <Link
                href="/projects"
                className="text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-black dark:hover:text-white transition-colors"
              >
                View All →
              </Link>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {related.map((p: any) => (
                <Link
                  key={p.id}
                  href={`/projects/${p.id}`}
                  className="group border border-gray-200 dark:border-zinc-800 bg-gray-50 dark:bg-zinc-900 p-6 hover:-translate-y-1 transition-all duration-300"
                >
                  {p.image && (
                    <div className="aspect-video mb-4 overflow-hidden bg-gray-200 dark:bg-zinc-800">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={p.image}
                        alt={p.title}
                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                      />
                    </div>
                  )}
                  <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400 block mb-2">
                    {p.category}
                  </span>
                  <h3 className="font-black tracking-tight text-lg group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors">
                    {p.title}
                  </h3>
                </Link>
              ))}
            </div>
          </section>
        )}

        <Contact />
      </main>

      <Footer />
    </div>
  );
}
