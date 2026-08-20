import Link from "next/link";
import type { Dictionary } from "@/i18n";
import type { Locale } from "@/i18n/config";
import LanguageSwitcher from "./LanguageSwitcher";
import { ADDRESS, BRAND, EMAIL, PHONES } from "@/lib/site";

export default function Footer({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  const home = `/${locale}`;
  const nav = [
    { href: home, label: dict.nav.home },
    { href: "#languages", label: dict.nav.languages },
    { href: "#courses", label: dict.nav.courses },
    { href: "#why", label: dict.nav.why },
    { href: "#contact", label: dict.nav.contact },
  ];

  return (
    <footer className="on-dark bg-ink text-white">
      <div className="container-x pt-16 pb-10 sm:pt-20">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
          {/* Wordmark */}
          <div className="lg:col-span-5">
            <Link href={home} className="inline-block leading-none" aria-label={BRAND.nameFull}>
              <span className="block text-xl font-extrabold tracking-[0.14em] sm:text-2xl">
                {BRAND.wordmarkTop}
              </span>
              <span className="mt-1.5 block text-[0.625rem] font-medium tracking-[0.3em] text-white/60 sm:text-xs">
                {BRAND.wordmarkBottom}
              </span>
            </Link>

            <div className="mt-8">
              <h2 className="text-[0.6875rem] font-semibold uppercase tracking-[0.2em] text-white/60">
                {dict.footer.langTitle}
              </h2>
              <LanguageSwitcher
                locale={locale}
                label={dict.nav.languageLabel}
                invert
                className="mt-3"
              />
            </div>
          </div>

          {/* Sitemap */}
          <nav className="lg:col-span-3" aria-label={dict.footer.navTitle}>
            <h2 className="text-[0.6875rem] font-semibold uppercase tracking-[0.2em] text-white/60">
              {dict.footer.navTitle}
            </h2>
            <ul className="mt-4 flex flex-col gap-2.5">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="link-underline text-sm text-white/85 transition-colors duration-200 hover:text-white"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <div className="lg:col-span-4">
            <h2 className="text-[0.6875rem] font-semibold uppercase tracking-[0.2em] text-white/60">
              {dict.footer.contactTitle}
            </h2>
            <ul className="mt-4 flex flex-col gap-2">
              {PHONES.map((phone) => (
                <li key={phone.href}>
                  <a
                    href={`tel:${phone.href}`}
                    className="link-underline text-sm font-bold text-white transition-colors duration-200"
                  >
                    {phone.label}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href={`mailto:${EMAIL}`}
                  className="link-underline text-sm text-white/85 transition-colors duration-200 hover:text-white"
                >
                  {EMAIL}
                </a>
              </li>
            </ul>

            <address className="mt-5 text-sm not-italic leading-relaxed text-white/70">
              <span lang="sk">{ADDRESS.street}</span>
              <br />
              {ADDRESS.postalCode} {dict.contact.city}
            </address>
          </div>
        </div>

        {/* Bottom rule */}
        <div className="mt-14 flex flex-col gap-4 border-t border-white/20 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-white/60">
            © {new Date().getFullYear()} {BRAND.nameFull}. {dict.footer.rights}
          </p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <Link
              href={`${home}/adatvedelem`}
              className="link-underline text-xs text-white/70 hover:text-white"
            >
              {dict.footer.privacy}
            </Link>
            <Link
              href={`${home}/cookie`}
              className="link-underline text-xs text-white/70 hover:text-white"
            >
              {dict.footer.cookies}
            </Link>
            <a
              href="#top"
              className="link-underline text-xs text-white/70 hover:text-white"
            >
              {dict.nav.backToTop} ↑
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
