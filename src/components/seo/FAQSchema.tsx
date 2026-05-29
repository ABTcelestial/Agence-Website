/**
 * FAQSchema — Données structurées Schema.org pour la page FAQ
 * Permet les "rich snippets" dans Google (Q&R visibles directement dans les résultats)
 */

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQSchemaProps {
  items: FAQItem[];
}

export function FAQSchema({ items }: FAQSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// ─── Exemple d'items FAQ à adapter selon ton contenu réel ─────────────────────
export const EXAMPLE_FAQ_ITEMS: FAQItem[] = [
  {
    question: "Combien coûte la création d'un site web en Algérie ?",
    answer:
      "Le prix d'un site web professionnel chez XenonDz varie selon vos besoins. Un site vitrine débute à partir de 30 000 DZD, une boutique e-commerce à partir de 60 000 DZD. Contactez-nous pour un devis gratuit personnalisé.",
  },
  {
    question: "Quel est le délai de livraison d'un site web ?",
    answer:
      "Un site vitrine est livré en 7 à 14 jours ouvrables. Un projet e-commerce complet nécessite 3 à 6 semaines selon la complexité. Nous respectons les délais convenus dès le début du projet.",
  },
  {
    question: "Travaillez-vous avec des entreprises hors de Béjaïa ?",
    answer:
      "Oui, XenonDz travaille avec des entreprises dans toute l'Algérie. Nos collaborations se font 100% en ligne via visioconférence, email et WhatsApp. La distance n'est pas un obstacle.",
  },
  {
    question: "Proposez-vous un service de maintenance après livraison ?",
    answer:
      "Oui, nous proposons des forfaits de maintenance mensuelle incluant les mises à jour, la sauvegarde et le support technique. Demandez notre tarif lors de votre devis.",
  },
  {
    question: "Quels sont les modes de paiement acceptés ?",
    answer:
      "Nous acceptons le virement bancaire et le paiement CCP. Le paiement se fait généralement en deux tranches : 50% à la commande, 50% à la livraison.",
  },
];
