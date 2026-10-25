import Link from "next/link";
import { FOOTER, NAV } from "@/lib/content";
import { AREA, BRAND, COMPANY, EMAIL, PHONE } from "@/lib/site";
import Logo from "@/components/graphics/Logo";
import CookieSettingsLink from "./CookieSettingsLink";

export default function Footer() {
  return (
    <footer className="on-dark bg-ink text-white">
      <div className="container-x pt-16 pb-10 sm:pt-20">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-4">
            <Link href="/" className="inline-block" aria-label={BRAND.name}>
              <Logo invert size="lg" />
            </Link>
            <p className="mt-6 max-w-xs text-sm leading-relaxed text-white/70">{AREA}</p>
          </div>

          <nav className="lg:col-span-2" aria-label={FOOTER.navTitle}>
            <h2 className="label text-white/60">{FOOTER.navTitle}</h2>
            <ul className="mt-4 flex flex-col gap-2.5">
              {NAV.map((item) => (
                <li key={item.href}>
                  <Link
                    href={`/${item.href}`}
                    className="link-underline text-sm text-white/85 hover:text-white"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="lg:col-span-3">
            <h2 className="label text-white/60">{FOOTER.contactTitle}</h2>
            <ul className="mt-4 flex flex-col gap-2.5">
              <li>
                <a href={`tel:${PHONE.href}`} className="link-underline text-sm font-bold text-white">
                  {PHONE.label}
                </a>
              </li>
              <li>
                <a href={`mailto:${EMAIL}`} className="link-underline text-sm text-white/85 hover:text-white">
                  {EMAIL}
                </a>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h2 className="label text-white/60">{FOOTER.legalTitle}</h2>
            <ul className="mt-4 flex flex-col gap-2.5">
              <li>
                <Link href="/adatvedelem" className="link-underline text-sm text-white/80 hover:text-white">
                  {FOOTER.privacy}
                </Link>
              </li>
              <li>
                <Link href="/cookie" className="link-underline text-sm text-white/80 hover:text-white">
                  {FOOTER.cookies}
                </Link>
              </li>
              <li>
                <Link href="/impresszum" className="link-underline text-sm text-white/80 hover:text-white">
                  {FOOTER.imprint}
                </Link>
              </li>
              <li>
                <CookieSettingsLink />
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-white/20 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-white/60">
            © {new Date().getFullYear()} {COMPANY.legalName} {FOOTER.rights}
          </p>
          <a href="#top" className="link-underline text-xs text-white/70 hover:text-white">
            {FOOTER.backToTop} ↑
          </a>
        </div>
      </div>
    </footer>
  );
}
