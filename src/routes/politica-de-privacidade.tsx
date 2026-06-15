import { createFileRoute } from "@tanstack/react-router";

import { LegalPage } from "@/components/legal/LegalPage";
import { privacyPolicyText } from "@/content/legal";

export const Route = createFileRoute("/politica-de-privacidade")({
  component: PrivacyPolicyPage,
});

function PrivacyPolicyPage() {
  return (
    <LegalPage title="Política de Privacidade" updatedAt="15 de junho de 2026">
      {privacyPolicyText}
    </LegalPage>
  );
}