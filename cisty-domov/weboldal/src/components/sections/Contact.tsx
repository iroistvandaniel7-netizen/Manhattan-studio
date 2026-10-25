import Image from "next/image";
import { CONTACT } from "@/lib/content";
import { AREA, EMAIL, HOURS, PHONE } from "@/lib/site";
import Eyebrow from "@/components/ui/Eyebrow";
import Reveal from "@/components/ui/Reveal";
import ContactForm from "./ContactForm";

/**
 * The close: a navy card with every way to reach the team — the cleaner
 * waving from its corner — beside the quote form.
 */
export default function Contact() {
  return (
    <section id="kapcsolat" className="relative isolate overflow-hidden bg-paper py-section" aria-labelledby="contact-title">
      <div aria-hidden="true" className="bg-cleaning pointer-events-none absolute inset-0 -z-10" />
      <div className="container-x">
        <div className="max-w-2xl">
          <Reveal>
            <Eyebrow>{CONTACT.eyebrow}</Eyebrow>
          </Reveal>
          <Reveal delay={70}>
            <h2 id="contact-title" className="mt-5 text-[clamp(2.5rem,6.5vw,5.5rem)] leading-[0.95]">
              {CONTACT.title}
            </h2>
          </Reveal>
          <Reveal delay={130}>
            <p className="mt-5 text-lg leading-relaxed text-slate-600">{CONTACT.lead}</p>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-5 lg:grid-cols-12">
          <Reveal delay={100} className="lg:col-span-5">
            <div className="on-dark relative flex h-full flex-col overflow-hidden rounded-[2rem] bg-ink p-8 text-white sm:p-10">
              <svg viewBox="0 0 100 100" aria-hidden="true" className="pointer-events-none absolute -right-20 -bottom-24 w-96 text-white/[0.06]">
                <path d="M50 10 L90 43 L90 90 L10 90 L10 43 Z" fill="currentColor" stroke="currentColor" strokeWidth="10" strokeLinejoin="round" />
              </svg>

              <dl className="relative flex flex-col gap-8">
                <div>
                  <dt className="label text-white/55">{CONTACT.phoneTitle}</dt>
                  <dd className="mt-2">
                    <a href={`tel:${PHONE.href}`} className="font-display text-[clamp(1.75rem,3vw,2.5rem)] font-semibold tracking-[-0.03em] hover:text-accent-lift">
                      {PHONE.label}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="label text-white/55">{CONTACT.emailTitle}</dt>
                  <dd className="mt-2">
                    <a href={`mailto:${EMAIL}`} className="link-underline text-lg font-medium">
                      {EMAIL}
                    </a>
                  </dd>
                </div>
                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                  <div>
                    <dt className="label text-white/55">{CONTACT.areaTitle}</dt>
                    <dd className="mt-2 text-base text-white/85">{AREA}</dd>
                  </div>
                  <div>
                    <dt className="label text-white/55">{CONTACT.hoursTitle}</dt>
                    <dd className="mt-2 text-base text-white/85">
                      {HOURS.label}
                      <br />
                      <span className="tabular-nums">
                        {HOURS.opens}–{HOURS.closes}
                      </span>
                    </dd>
                  </div>
                </div>
              </dl>

              <Image
                src="/brand/takaritono-kek-hatteren.svg"
                alt=""
                width={400}
                height={800}
                unoptimized
                className="pointer-events-none relative mt-10 h-56 w-auto self-end lg:mt-auto"
              />
            </div>
          </Reveal>

          <Reveal delay={160} className="lg:col-span-7">
            <div className="h-full">
              <ContactForm />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
