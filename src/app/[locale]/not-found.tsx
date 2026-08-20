import Link from "next/link";
import hu from "@/i18n/dictionaries/hu";
import Skyline from "@/components/graphics/Skyline";

/**
 * `not-found.tsx` renders outside the locale params, so it can't read the
 * active locale. It shows all three languages at once rather than guessing.
 */
export default function NotFound() {
  const messages = [
    { locale: "hu", href: "/hu", ...hu.notFound },
    {
      locale: "sk",
      href: "/sk",
      title: "Táto stránka sa nenašla",
      lead: "Hľadaná stránka neexistuje alebo sa medzitým presunula inam.",
      cta: "Späť na úvodnú stránku",
    },
    {
      locale: "en",
      href: "/en",
      title: "This page could not be found",
      lead: "The page you're looking for doesn't exist, or it has moved somewhere else.",
      cta: "Back to the homepage",
    },
  ];

  return (
    <section className="relative isolate flex min-h-[80vh] items-center overflow-hidden py-24">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 flex justify-center"
      >
        <Skyline
          className="h-[34vh] w-[150%] max-w-none text-graphite-400 opacity-20 lg:w-[110%]"
          variant="outline"
        />
      </div>

      <div className="container-x">
        <h1 className="text-[clamp(5rem,18vw,14rem)] font-extrabold leading-[0.82] tracking-[-0.06em]">
          404
        </h1>

        <ul className="mt-12 grid gap-10 border-t border-graphite-200 pt-10 sm:grid-cols-3">
          {messages.map((message) => (
            <li key={message.locale} lang={message.locale}>
              <h2 className="text-lg font-bold tracking-[-0.02em]">{message.title}</h2>
              <p className="mt-3 text-sm leading-relaxed text-graphite-600">
                {message.lead}
              </p>
              <Link
                href={message.href}
                className="link-underline mt-5 inline-block text-[0.8125rem] font-semibold"
              >
                {message.cta} →
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
