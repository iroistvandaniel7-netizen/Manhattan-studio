import type { Metadata } from "next";
import LegalPage from "@/components/layout/LegalPage";
import { COOKIE_POLICY } from "@/lib/legal";
import { CONSENT_COOKIE, CONSENT_MAX_AGE } from "@/lib/consent";

export const metadata: Metadata = {
  title: COOKIE_POLICY.title,
  alternates: { canonical: "/cookie" },
};

export default function CookiePage() {
  return (
    <LegalPage title={COOKIE_POLICY.title} lead={COOKIE_POLICY.lead} sections={COOKIE_POLICY.sections} updated="2026. október 25.">
      {/* The full inventory, as a table — it is one row long, and that is the point. */}
      <div className="mt-10 overflow-x-auto rounded-2xl border border-line">
        <table className="w-full min-w-[34rem] text-left text-sm">
          <thead className="bg-accent-soft">
            <tr>
              {["Név", "Típus", "Cél", "Élettartam"].map((h) => (
                <th key={h} scope="col" className="label px-5 py-3.5 text-slate-600">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr className="border-t border-line">
              <td className="px-5 py-4 font-mono font-semibold">{CONSENT_COOKIE}</td>
              <td className="px-5 py-4">Feltétlenül szükséges, saját</td>
              <td className="px-5 py-4 text-slate-600">A süti-választás megjegyzése</td>
              <td className="px-5 py-4">{Math.round(CONSENT_MAX_AGE / 86400 / 30)} hónap</td>
            </tr>
          </tbody>
        </table>
      </div>
    </LegalPage>
  );
}
