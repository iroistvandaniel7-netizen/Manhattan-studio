import { notFound } from "next/navigation";
import { getDictionary } from "@/i18n";
import { isLocale } from "@/i18n/config";

import Hero from "@/components/sections/Hero";
import Facts from "@/components/sections/Facts";
import Languages from "@/components/sections/Languages";
import Courses from "@/components/sections/Courses";
import Why from "@/components/sections/Why";
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
      <Facts dict={dict} />
      <Languages dict={dict} />
      <Courses dict={dict} />
      <Why dict={dict} />
      <Contact dict={dict} locale={locale} />
    </>
  );
}
