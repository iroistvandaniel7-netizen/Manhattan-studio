import Link from "next/link";
import hu from "@/i18n/dictionaries/hu";
import sk from "@/i18n/dictionaries/sk";
import en from "@/i18n/dictionaries/en";

/**
 * `not-found.tsx` renders outside the locale params, so it cannot read the
 * active locale. It shows all three languages rather than guessing one.
 */
export default function NotFound() {
  const messages = [
    { locale: "hu", href: "/hu", ...hu.notFound },
    { locale: "sk", href: "/sk", ...sk.notFound },
    { locale: "en", href: "/en", ...en.notFound },
  ];

  return (
    <section className="py-section">
      <div className="container-x">
        <h1 className="text-[clamp(5rem,16vw,12rem)] font-extrabold leading-[0.85] tracking-[-0.05em] text-blue">
          404
        </h1>

        <ul className="mt-12 grid gap-10 border-t border-line pt-10 sm:grid-cols-3">
          {messages.map((message) => (
            <li key={message.locale} lang={message.locale}>
              <h2 className="text-lg font-bold tracking-[-0.02em]">{message.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{message.lead}</p>
              <Link
                href={message.href}
                className="link-underline mt-4 inline-block text-[0.8125rem] font-semibold text-blue"
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
