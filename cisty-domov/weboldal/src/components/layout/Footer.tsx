import Link from "next/link";
import type { Dictionary, Locale } from "@/i18n";
import { BRAND, COMPANY, EMAIL, PHONE } from "@/lib/site";
import Logo from "@/components/graphics/Logo";
import CookieSettingsLink from "./CookieSettingsLink";
import LanguageSwitcher from "./LanguageSwitcher";

/** A quiet navy foot: the logo and the way to reach the team, then the small print. */
export default function Footer({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const home = `/${locale}`;

  return (
    <footer className="on-dark bg-ink text-white">
      <div className="container-x pt-20 pb-10">
        <div className="flex flex-col gap-12 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <Link href={home} className="inline-block" aria-label={BRAND.name}>
              <Logo invert size="lg" />
            </Link>
            <p className="mt-6 text-[0.9375rem] text-white/60">{dict.contact.area}</p>
          </div>

          <div className="flex flex-col gap-1 lg:items-end lg:text-right">
            <a href={`tel:${PHONE.href}`} className="text-2xl font-semibold tracking-[-0.02em] hover:text-accent">
              {PHONE.label}
            </a>
            <a href={`mailto:${EMAIL}`} className="text-[0.9375rem] text-white/75 hover:text-white">
              {EMAIL}
            </a>
            <LanguageSwitcher locale={locale} label={dict.ui.language} invert className="mt-5 -mr-2.5" />
          </div>
        </div>

        <nav aria-label={dict.footer.nav} className="mt-14 border-t border-white/15 pt-8">
          <ul className="flex flex-wrap gap-x-8 gap-y-3">
            {dict.nav.map((item) => (
              <li key={item.href}>
                <Link href={`${home}${item.href}`} className="text-[0.9375rem] text-white/80 hover:text-white">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="mt-10 flex flex-col gap-4 text-sm text-white/55 lg:flex-row lg:items-center lg:justify-between">
          <p>
            © {new Date().getFullYear()} {COMPANY.legalName} {dict.footer.rights}
          </p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            <li>
              <Link href={`${home}/gdpr`} className="hover:text-white">
                {dict.footer.privacy}
              </Link>
            </li>
            <li>
              <Link href={`${home}/cookies`} className="hover:text-white">
                {dict.footer.cookies}
              </Link>
            </li>
            <li>
              <Link href={`${home}/impressum`} className="hover:text-white">
                {dict.footer.imprint}
              </Link>
            </li>
            <li>
              <CookieSettingsLink label={dict.cookies.reopen} />
            </li>
          </ul>
        </div>

        {/* The maker's credit, last line of the page. */}
        <p className="mt-8 border-t border-white/10 pt-6 text-center text-xs text-white/45">
          <a
            href="https://rdmedia.sk"
            target="_blank"
            rel="noopener"
            className="transition-colors duration-200 hover:text-white"
          >
            Website developed by <span className="font-semibold text-white/70">rdmedia</span>
          </a>
        </p>
      </div>
    </footer>
  );
}
