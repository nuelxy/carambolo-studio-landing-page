import { createFileRoute } from "@tanstack/react-router";

import { LegalPage } from "@/components/legal/LegalPage";
import { termsOfUseText } from "@/content/legal";

export const Route = createFileRoute("/termos")({
  component: TermsPage,
});

function TermsPage() {
  return (
    <LegalPage title="Termos de Uso" updatedAt="15 de junho de 2026">
      {termsOfUseText}
    </LegalPage>
  );
}