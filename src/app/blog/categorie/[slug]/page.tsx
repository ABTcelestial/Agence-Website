import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { BLOG_POSTS } from "@/data/blog-posts";
import { BreadcrumbSchema } from "@/components/seo/BreadcrumbSchema";

const CATEGORY_MAP: Record<string, string> = {
  "tarifs-devis": "Tarifs & Devis",
  "e-commerce": "E-commerce",
  "seo-geo": "SEO & GEO",
  "automatisation": "Automatisation",
  "conseils": "Conseils",
};

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const category = CATEGORY_MAP[slug];
  if (!category) return { title: "Catégorie | XenonDz" };

  return {
    title: `Articles ${category} — Blog XenonDz`,
    description: `Tous les articles XenonDz sur le thème ${category}. Guides pratiques pour les entreprises algériennes.`,
    alternates: { canonical: `https://xenondz.com/blog/categorie/${slug}` },
    openGraph: {
      url: `https://xenondz.com/blog/categorie/${slug}`,
      title: `Articles ${category} — Blog XenonDz`,
      description: `Guides pratiques sur ${category} pour les PME algériennes.`,
    },
  };
}

export function generateStaticParams() {
  return Object.keys(CATEGORY_MAP).map((slug) => ({ slug }));
}

export default async function BlogCategoryPage({ params }: Props) {
  const { slug } = await params;
  const category = CATEGORY_MAP[slug];
  if (!category) notFound();

  const posts = BLOG_POSTS.filter((p) => p.category === category);

  return (
    <>
      <BreadcrumbSchema items={[
        { name: "Accueil", url: "/" },
        { name: "Blog", url: "/blog" },
        { name: category, url: `/blog/categorie/${slug}` },
      ]} />
      <div className="w-full">
        <section className="hero-bg pt-32 pb-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <p className="section-label" style={{ justifyContent: "center" }}>Catégorie</p>
              <h1 className="text-foreground mb-4" style={{ fontFamily: "var(--font-display)" }}>
                {category}
              </h1>
              <div className="gold-line gold-line-center" />
              <p className="text-lg text-muted-foreground mt-4 font-light">
                {posts.length} article{posts.length > 1 ? "s" : ""} dans cette catégorie
              </p>
            </div>
          </div>
        </section>

        <section className="py-20 bg-background">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            {posts.length === 0 ? (
              <p className="text-center text-muted-foreground">Aucun article pour le moment.</p>
            ) : (
              <div className="space-y-8">
                {posts.map((post) => (
                  <article
                    key={post.slug}
                    className="border border-border rounded-2xl p-6 hover:border-primary transition-colors"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <span
                        className="text-xs font-medium px-2.5 py-1 rounded-full"
                        style={{ background: "var(--primary)", color: "white" }}
                      >
                        {post.category}
                      </span>
                      <span className="text-sm text-muted-foreground">{post.readTime} de lecture</span>
                      <span className="text-sm text-muted-foreground">
                        {new Date(post.publishDate).toLocaleDateString("fr-DZ", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </span>
                    </div>
                    <h2 className="text-xl font-semibold text-foreground mb-2">
                      <Link href={`/blog/${post.slug}`} className="hover:text-primary transition-colors">
                        {post.title}
                      </Link>
                    </h2>
                    <p className="text-muted-foreground mb-4">{post.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.tags.slice(0, 3).map((tag) => (
                        <span key={tag} className="text-xs text-muted-foreground border border-border rounded px-2 py-0.5">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="text-sm font-medium text-primary hover:underline"
                    >
                      Lire l'article →
                    </Link>
                  </article>
                ))}
              </div>
            )}
            <div className="mt-12 text-center">
              <Link href="/blog" className="text-sm font-medium text-primary hover:underline">
                ← Voir tous les articles
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
