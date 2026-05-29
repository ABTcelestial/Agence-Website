'use client';
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-6xl font-bold mb-4" style={{ fontFamily: "var(--font-display)", color: "var(--primary)" }}>404</h1>
      <p className="text-xl text-muted-foreground mb-8">Cette page n&apos;existe pas.</p>
      <Link href="/" className="btn-primary-pro px-6 py-3 text-white text-sm rounded-lg inline-block">
        Retour à l&apos;accueil
      </Link>
    </div>
  );
}
