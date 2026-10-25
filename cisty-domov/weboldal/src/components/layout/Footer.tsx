import Link from "next/link";
import { FOOTER, NAV } from "@/lib/content";
import { AREA, BRAND, COMPANY, EMAIL, PHONE } from "@/lib/site";
import Logo from "@/components/graphics/Logo";
import CookieSettingsLink from "./CookieSettingsLink";

/** Navy foot of the page, signed with the brand name set as large as the page allows. */
export default function Footer() {
  return (
    <footer className="on-dark relative overflow-hidden bg-ink-deep text-white">
      <div className="container-x pt-20 pb-8">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-4">
            <Link href="/" className="inline-block" aria-label={BRAND.name}>
              <Logo invert size="lg" />
            </Link>
            <p className="mt-6 max-w-xs text-[0.9375rem] leading-relaxed text-white/65">{AREA}</p>
          </div>

          <nav className="lg:col-span-2" aria-label={FOOTER.navTitle}>
            <h2 className="label text-white/50">{FOOTER.navTitle}</h2>
            <ul className="mt-5 flex flex-col gap-3">
              {NAV.map((item) => (
                <li key={item.href}>
                  <Link href={`/${item.href}`} className="link-underline text-[0.9375rem] text-white/85 hover:text-white">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="lg:col-span-3">
            <h2 className="label text-white/50">{FOOTER.contactTitle}</h2>
            <ul className="mt-5 flex flex-col gap-3">
              <li>
                <a href={`tel:${PHONE.href}`} className="font-display text-xl font-semibold tracking-[-0.02em] hover:text-accent-lift">
                  {PHONE.label}
                </a>
              </li>
              <li>
                <a href={`mailto:${EMAIL}`} className="link-underline text-[0.9375rem] text-white/85 hover:text-white">
                  {EMAIL}
                </a>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h2 className="label text-white/50">{FOOTER.legalTitle}</h2>
            <ul className="mt-5 flex flex-col gap-3">
              <li>
                <Link href="/adatvedelem" className="link-underline text-[0.9375rem] text-white/80 hover:text-white">
                  {FOOTER.privacy}
                </Link>
              </li>
              <li>
                <Link href="/cookie" className="link-underline text-[0.9375rem] text-white/80 hover:text-white">
                  {FOOTER.cookies}
                </Link>
              </li>
              <li>
                <Link href="/impresszum" className="link-underline text-[0.9375rem] text-white/80 hover:text-white">
                  {FOOTER.imprint}
                </Link>
              </li>
              <li>
                <CookieSettingsLink />
              </li>
            </ul>
          </div>
        </div>

        {/* The signature: the name, as wide as the page. */}
        <p
          aria-hidden="true"
          className="mt-20 select-none font-display text-[clamp(3rem,15.6vw,15.5rem)] leading-[0.8] font-semibold tracking-[-0.06em] whitespace-nowrap text-white/[0.07]"
        >
          čistý <span className="font-normal">domov</span>
        </p>

        <div className="mt-8 flex flex-col gap-3 border-t border-white/15 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-white/55">
            © {new Date().getFullYear()} {COMPANY.legalName} {FOOTER.rights}
          </p>
          <a href="#top" className="link-underline text-sm text-white/65 hover:text-white">
            {FOOTER.backToTop} ↑
          </a>
        </div>
      </div>
    </footer>
  );
}
