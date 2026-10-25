import type { Metadata } from "next";
import LegalPage from "@/components/layout/LegalPage";
import { PRIVACY } from "@/lib/legal";

export const metadata: Metadata = {
  title: PRIVACY.title,
  alternates: { canonical: "/adatvedelem" },
};

export default function PrivacyPage() {
  return <LegalPage title={PRIVACY.title} lead={PRIVACY.lead} sections={PRIVACY.sections} updated="2026. október 25." />;
}
