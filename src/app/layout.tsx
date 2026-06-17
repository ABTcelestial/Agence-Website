import type { Metadata } from "next";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import { LanguageProvider } from "@/i18n/LanguageContext";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { OrganizationSchema } from "@/components/seo/OrganizationSchema";
import { LocalBusinessSchema } from "@/components/seo/LocalBusinessSchema";
import { PageTransitions } from "@/components/layout/PageTransitions";
import AgencyChatbot from "@/components/AgencyChatbot";

export const metadata: Metadata = {
  metadataBase: new URL("https://xenondz.com"),
  title: {
    default: "Agence Digitale en Algérie : Sites Web & Automatisation Rentables | XenonDz",
    template: "%s | XenonDz",
  },
  description:
    "Transformez votre présence en ligne en une machine à clients. XenonDz : Création de sites e-commerce, vitrines et automatisation PME en Algérie. Devis sous 24h.",
  openGraph: {
    type: "website",
    locale: "fr_DZ",
    siteName: "XenonDz",
    images: [{ url: "/og-image.jpg", width: 1037, height: 1024, alt: "XenonDz — Agence digitale algérienne" }],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og-image.jpg"],
  },
  icons: {
    icon: [
      { url: "/favicon.ico", type: "image/x-icon" },
      { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange={false}
        >
          <OrganizationSchema />
          <LocalBusinessSchema />
          <LanguageProvider>
            <div className="min-h-screen flex flex-col overflow-x-hidden">
              <Header />
              <main id="main-content" className="flex-1 pt-24">
                <PageTransitions>
                  {children}
                </PageTransitions>
              </main>
              <Footer />
              <AgencyChatbot />
            </div>
          </LanguageProvider>
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}
