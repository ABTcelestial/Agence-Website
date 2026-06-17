import type { Metadata } from "next";
import Link from "next/link";
import { BLOG_POSTS } from "@/data/blog-posts";
import { BreadcrumbSchema } from "@/components/seo/BreadcrumbSchema";

export const metadata: Metadata = {
  title: "Blog : Création de Site Web, E-commerce & SEO en Algérie | XenonDz",
  description: "Guides pratiques sur la création de sites web, l'e-commerce et le référencement en Algérie. Prix, délais, conseils d'experts pour les PME algériennes.",
  alternates: { canonical: "https://xenondz.com/blog" },
  openGraph: {
    url: "https://xenondz.com/blog",
    title: "Blog : Création de Site Web, E-commerce & SEO en Algérie | XenonDz",
    description: "Guides pratiques sur la création de sites web, l'e-commerce et le référencement en Algérie.",
  },
};

const BREADCRUMBS_BLOG = [
  { name: "Accueil", url: "/" },
  { name: "Blog", url: "/blog" },
];

export default function BlogPage() {
  return (
    <>
      <BreadcrumbSchema items={BREADCRUMBS_BLOG} />
      <div className="w-full">
        <section className="hero-bg pt-32 pb-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <p className="section-label" style={{ justifyContent: "center" }}>Ressources</p>
              <h1 className="text-foreground mb-4" style={{ fontFamily: "var(--font-display)" }}>
                Blog XenonDz
              </h1>
              <div className="gold-line gold-line-center" />
              <p className="text-lg text-muted-foreground mt-4 font-light">
                Guides pratiques pour créer votre site web, lancer votre e-commerce et dominer Google en Algérie.
              </p>
            </div>
          </div>
        </section>

        <section className="py-20 bg-background">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="space-y-8">
              {BLOG_POSTS.map((post) => (
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
          </div>
        </section>
      </div>
    </>
  );
}
