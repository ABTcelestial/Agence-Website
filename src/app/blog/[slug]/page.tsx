import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { BLOG_POSTS, getBlogPost } from "@/data/blog-posts";
import { BreadcrumbSchema } from "@/components/seo/BreadcrumbSchema";
import { FAQSchema } from "@/components/seo/FAQSchema";

const BASE_URL = "https://xenondz.com";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return { title: "Article non trouvé | XenonDz" };

  return {
    title: `${post.title} | XenonDz`,
    description: post.description,
    alternates: { canonical: `${BASE_URL}/blog/${post.slug}` },
    openGraph: {
      url: `${BASE_URL}/blog/${post.slug}`,
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.publishDate,
      authors: ["XenonDz"],
      tags: post.tags,
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": post.title,
    "description": post.description,
    "datePublished": post.publishDate,
    "dateModified": post.publishDate,
    "author": {
      "@type": "Organization",
      "name": "XenonDz",
      "@id": `${BASE_URL}/#organization`,
    },
    "publisher": {
      "@type": "Organization",
      "name": "XenonDz",
      "@id": `${BASE_URL}/#organization`,
    },
    "url": `${BASE_URL}/blog/${post.slug}`,
    "mainEntityOfPage": `${BASE_URL}/blog/${post.slug}`,
    "keywords": post.tags.join(", "),
  };

  const breadcrumbItems = [
    { name: "Accueil", url: "/" },
    { name: "Blog", url: "/blog" },
    { name: post.title, url: `/blog/${post.slug}` },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <BreadcrumbSchema items={breadcrumbItems} />
      {post.faq.length > 0 && <FAQSchema items={post.faq} />}

      <div className="w-full">
        <section className="hero-bg pt-32 pb-12">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-3 mb-4">
              <Link href="/blog" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                ← Blog
              </Link>
              <span className="text-muted-foreground">/</span>
              <span
                className="text-xs font-medium px-2.5 py-1 rounded-full"
                style={{ background: "var(--primary)", color: "white" }}
              >
                {post.category}
              </span>
            </div>
            <h1 className="text-foreground mb-4" style={{ fontFamily: "var(--font-display)" }}>
              {post.title}
            </h1>
            <div className="gold-line" />
            <div className="flex items-center gap-4 mt-4 text-sm text-muted-foreground">
              <span>Par XenonDz</span>
              <span>·</span>
              <span>
                {new Date(post.publishDate).toLocaleDateString("fr-DZ", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
              <span>·</span>
              <span>{post.readTime} de lecture</span>
            </div>
          </div>
        </section>

        <section className="py-12 bg-background">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-lg text-muted-foreground mb-10 leading-relaxed">{post.intro}</p>

            <div className="space-y-10">
              {post.sections.map((section, i) => (
                <div key={i}>
                  <h2 className="text-xl font-semibold text-foreground mb-3">{section.heading}</h2>
                  {section.content.split("\n\n").map((paragraph, j) => (
                    <p key={j} className="text-muted-foreground leading-relaxed mb-3">
                      {paragraph}
                    </p>
                  ))}
                </div>
              ))}
            </div>

            {post.faq.length > 0 && (
              <div className="mt-12 pt-10 border-t border-border">
                <h2 className="text-xl font-semibold text-foreground mb-6">Questions fréquentes</h2>
                <div className="space-y-6">
                  {post.faq.map((item, i) => (
                    <div key={i}>
                      <h3 className="font-medium text-foreground mb-2">{item.question}</h3>
                      <p className="text-muted-foreground">{item.answer}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div
              className="mt-12 rounded-2xl p-8 text-center"
              style={{ background: "linear-gradient(135deg, var(--primary), var(--primary-shift-light))" }}
            >
              <p className="text-white font-semibold text-lg mb-4">{post.cta}</p>
              <Link
                href="/contact"
                className="inline-block bg-white font-medium px-6 py-3 rounded-xl hover:opacity-90 transition-opacity"
                style={{ color: "var(--primary)" }}
              >
                Devis gratuit sous 24h
              </Link>
            </div>

            <div className="mt-10 flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span key={tag} className="text-xs text-muted-foreground border border-border rounded px-2 py-1">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
