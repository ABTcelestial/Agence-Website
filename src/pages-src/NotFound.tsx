import Link from "next/link";
import { useLanguage } from "../i18n/LanguageContext";
import { SEOHead } from "../components/seo/SEOHead";

export function NotFound() {
  const { t } = useLanguage();
  const n = t.notFound;

  return (
    <>
      <SEOHead noIndex={true} title="Page introuvable — XenonDz" />
      <div className="min-h-screen flex items-center justify-center hero-bg">
      <div className="text-center px-4">
        <h1 className="hero-title-gradient mb-4" style={{ fontSize: "6rem", lineHeight: 1 }}>404</h1>
        <h2 className="text-foreground text-2xl font-semibold mb-3" style={{ fontFamily: "var(--font-display)" }}>{n.title}</h2>
        <p className="text-muted-foreground mb-8">{n.desc}</p>
        <Link href="/">
          <button className="btn-primary-pro inline-flex items-center px-6 py-3 text-sm text-white rounded-lg cursor-pointer">
            {n.back}
          </button>
        </Link>
      </div>
    </div>
    </>
  );
}