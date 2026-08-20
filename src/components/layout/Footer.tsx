import Link from "next/link";
import type { Dictionary } from "@/i18n";
import type { Locale } from "@/i18n/config";
import LanguageSwitcher from "./LanguageSwitcher";
import Skyline from "@/components/graphics/Skyline";
import { BRAND, FAX, LOCATIONS, PHONES } from "@/lib/site";

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
    { href: "#courses", label: dict.nav.courses },
    { href: "#why", label: dict.nav.why },
    { href: "#manhattan", label: dict.nav.about },
    { href: "#method", label: dict.nav.method },
    { href: "#contact", label: dict.nav.contact },
  ];

  return (
    <footer className="on-ink relative isolate overflow-hidden bg-ink text-paper">
      {/* Skyline sits along the very bottom edge, barely there. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 flex justify-center"
      >
        <Skyline
          className="h-40 w-[150%] max-w-none text-paper opacity-[0.09] sm:h-52 sm:w-[120%] lg:h-64 lg:w-[104%]"
          variant="outline"
          strokeWidth={1}
        />
      </div>

      <div className="container-x relative pt-20 pb-12 sm:pt-24">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
          {/* Wordmark + tagline */}
          <div className="lg:col-span-5">
            <Link href={home} className="inline-block leading-none" aria-label={BRAND.nameFull}>
              <span className="block text-xl font-extrabold tracking-[0.16em] sm:text-2xl">
                {BRAND.wordmarkTop}
              </span>
              <span className="mt-1.5 block text-[0.625rem] font-medium tracking-[0.34em] text-paper/50 sm:text-xs">
                {BRAND.wordmarkBottom}
              </span>
            </Link>
            <p className="mt-7 max-w-sm text-sm leading-relaxed text-paper/55">
              {dict.footer.tagline}
            </p>
          </div>

          {/* Sitemap */}
          <nav className="lg:col-span-3" aria-label={dict.footer.navTitle}>
            <h2 className="text-[0.6875rem] font-semibold uppercase tracking-[0.22em] text-paper/40">
              {dict.footer.navTitle}
            </h2>
            <ul className="mt-5 flex flex-col gap-2.5">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="link-underline text-sm text-paper/75 transition-colors duration-300 hover:text-paper"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <div className="lg:col-span-4">
            <h2 className="text-[0.6875rem] font-semibold uppercase tracking-[0.22em] text-paper/40">
              {dict.footer.contactTitle}
            </h2>
            <ul className="mt-5 flex flex-col gap-2.5">
              {PHONES.map((phone) => (
                <li key={phone.href}>
                  <a
                    href={`tel:${phone.href}`}
                    className="link-underline text-sm font-semibold text-paper/85 transition-colors duration-300 hover:text-paper"
                  >
                    {phone.label}
                  </a>
                </li>
              ))}
              <li className="text-sm text-paper/50">
                {dict.contact.faxTitle}: {FAX.label}
              </li>
            </ul>

            <ul className="mt-6 flex flex-col gap-3">
              {LOCATIONS.map((location) => (
                <li key={location.id} className="text-sm leading-relaxed text-paper/55">
                  <span className="font-medium text-paper/75">
                    {dict.contact.locations[location.id].name}
                  </span>
                  <br />
                  <span lang="hu">{location.address}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8">
              <h2 className="text-[0.6875rem] font-semibold uppercase tracking-[0.22em] text-paper/40">
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
        </div>

        {/* Bottom rule */}
        <div className="mt-16 flex flex-col gap-5 border-t border-paper/15 pt-7 sm:mt-20 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-paper/45">
            © {new Date().getFullYear()} {BRAND.nameFull}. {dict.footer.rights}
          </p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <Link
              href={`${home}/adatvedelem`}
              className="link-underline text-xs text-paper/55 transition-colors duration-300 hover:text-paper"
            >
              {dict.footer.privacy}
            </Link>
            <Link
              href={`${home}/cookie`}
              className="link-underline text-xs text-paper/55 transition-colors duration-300 hover:text-paper"
            >
              {dict.footer.cookies}
            </Link>
            <a
              href="#top"
              className="link-underline text-xs text-paper/55 transition-colors duration-300 hover:text-paper"
            >
              {dict.nav.backToTop} ↑
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
