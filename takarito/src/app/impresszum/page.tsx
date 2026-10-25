import type { Metadata } from "next";
import LegalPage from "@/components/layout/LegalPage";
import { COMPANY, EMAIL, HOSTING, PHONE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Impresszum",
  alternates: { canonical: "/impresszum" },
};

/** The service provider's details, as the e-commerce act (Ektv. 4. §) requires. */
export default function ImprintPage() {
  const rows: [string, React.ReactNode][] = [
    ["Szolgáltató", COMPANY.legalName],
    ["Székhely", COMPANY.seat],
    ["Cégjegyzékszám", COMPANY.registryNumber],
    ["Nyilvántartó hatóság", COMPANY.registryCourt],
    ["Adószám", COMPANY.taxNumber],
    ["Képviselő", COMPANY.representative],
    ["E-mail", <a key="e" href={`mailto:${EMAIL}`} className="link-underline font-semibold text-accent">{EMAIL}</a>],
    ["Telefon", <a key="p" href={`tel:${PHONE.href}`} className="link-underline font-semibold text-accent">{PHONE.label}</a>],
  ];

  const hosting: [string, React.ReactNode][] = [
    ["Tárhelyszolgáltató", HOSTING.name],
    ["Cím", HOSTING.address],
    ["Web", <a key="w" href={HOSTING.web} target="_blank" rel="noopener noreferrer" className="link-underline font-semibold text-accent">{HOSTING.web}</a>],
  ];

  return (
    <LegalPage title="Impresszum" lead="A weboldal üzemeltetőjének és tárhelyszolgáltatójának adatai.">
      {[
        { heading: "Üzemeltető", rows },
        { heading: "Tárhely", rows: hosting },
      ].map((block) => (
        <section key={block.heading} className="mt-12">
          <h2 className="text-xl tracking-[-0.02em] sm:text-2xl">{block.heading}</h2>
          <dl className="mt-4 divide-y divide-line rounded-2xl border border-line">
            {block.rows.map(([label, value]) => (
              <div key={label} className="grid gap-1 px-5 py-4 sm:grid-cols-[14rem_1fr] sm:gap-6">
                <dt className="label pt-0.5 text-slate-500">{label}</dt>
                <dd className="text-base">{value}</dd>
              </div>
            ))}
          </dl>
        </section>
      ))}
    </LegalPage>
  );
}
