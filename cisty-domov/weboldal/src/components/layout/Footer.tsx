import Link from "next/link";
import { FOOTER, NAV } from "@/lib/content";
import { AREA, BRAND, COMPANY, EMAIL, PHONE } from "@/lib/site";
import Logo from "@/components/graphics/Logo";
import CookieSettingsLink from "./CookieSettingsLink";

/** A quiet navy foot: the logo and the way to reach the team, then the small print. */
export default function Footer() {
  return (
    <footer className="on-dark bg-ink text-white">
      <div className="container-x pt-20 pb-10">
        <div className="flex flex-col gap-12 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <Link href="/" className="inline-block" aria-label={BRAND.name}>
              <Logo invert size="lg" />
            </Link>
            <p className="mt-6 text-[0.9375rem] text-white/60">{AREA}</p>
          </div>

          <div className="flex flex-col gap-1 lg:text-right">
            <a href={`tel:${PHONE.href}`} className="text-2xl font-semibold tracking-[-0.02em] hover:text-accent-lift">
              {PHONE.label}
            </a>
            <a href={`mailto:${EMAIL}`} className="text-[0.9375rem] text-white/75 hover:text-white">
              {EMAIL}
            </a>
          </div>
        </div>

        <nav aria-label={FOOTER.navTitle} className="mt-14 border-t border-white/15 pt-8">
          <ul className="flex flex-wrap gap-x-8 gap-y-3">
            {NAV.map((item) => (
              <li key={item.href}>
                <Link href={`/${item.href}`} className="text-[0.9375rem] text-white/80 hover:text-white">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="mt-10 flex flex-col gap-4 text-sm text-white/55 lg:flex-row lg:items-center lg:justify-between">
          <p>
            © {new Date().getFullYear()} {COMPANY.legalName} {FOOTER.rights}
          </p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            <li>
              <Link href="/adatvedelem" className="hover:text-white">
                {FOOTER.privacy}
              </Link>
            </li>
            <li>
              <Link href="/cookie" className="hover:text-white">
                {FOOTER.cookies}
              </Link>
            </li>
            <li>
              <Link href="/impresszum" className="hover:text-white">
                {FOOTER.imprint}
              </Link>
            </li>
            <li>
              <CookieSettingsLink />
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
