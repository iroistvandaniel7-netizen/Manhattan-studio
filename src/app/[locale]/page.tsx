import { notFound } from "next/navigation";
import { getDictionary } from "@/i18n";
import { isLocale } from "@/i18n/config";

import Hero from "@/components/sections/Hero";
import TrustBar from "@/components/sections/TrustBar";
import Courses from "@/components/sections/Courses";
import Benefits from "@/components/sections/Benefits";
import ManhattanSection from "@/components/sections/ManhattanSection";
import Process from "@/components/sections/Process";
import Testimonials from "@/components/sections/Testimonials";
import CTA from "@/components/sections/CTA";
import Contact from "@/components/sections/Contact";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const dict = getDictionary(locale);

  return (
    <>
      <Hero dict={dict} />
      <TrustBar dict={dict} />
      <Courses dict={dict} />
      <Benefits dict={dict} />
      <ManhattanSection dict={dict} />
      <Process dict={dict} />
      <Testimonials dict={dict} />
      <CTA dict={dict} />
      <Contact dict={dict} locale={locale} />
    </>
  );
}
