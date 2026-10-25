import Link from "next/link";
import hu from "@/i18n/dictionaries/hu";
import sk from "@/i18n/dictionaries/sk";
import en from "@/i18n/dictionaries/en";

/**
 * `not-found.tsx` renders outside the locale params, so it cannot know the
 * active language. It says it in all three rather than guess.
 */
export default function NotFound() {
  const messages = [
    { locale: "sk", ...sk.notFound },
    { locale: "hu", ...hu.notFound },
    { locale: "en", ...en.notFound },
  ];

  return (
    <section className="pb-section pt-40">
      <div className="container-x">
        <h1 className="text-[clamp(5rem,16vw,12rem)] leading-[0.85] tracking-[-0.05em] text-accent-ink">404</h1>
        <ul className="mt-12 flex flex-col gap-8 border-t border-line pt-10">
          {messages.map((message) => (
            <li key={message.locale} lang={message.locale}>
              <p className="max-w-md text-lg leading-relaxed text-slate-600">{message.lead}</p>
              <Link href={`/${message.locale}`} className="link-underline mt-2 inline-block text-sm font-semibold text-accent-ink">
                {message.cta} →
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
