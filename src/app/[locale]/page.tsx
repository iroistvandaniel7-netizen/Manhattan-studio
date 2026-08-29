import { notFound } from "next/navigation";
import { getDictionary } from "@/i18n";
import { isLocale } from "@/i18n/config";

import Hero from "@/components/sections/Hero";
import Facts from "@/components/sections/Facts";
import Languages from "@/components/sections/Languages";
import Courses from "@/components/sections/Courses";
import Why from "@/components/sections/Why";
import People from "@/components/sections/People";
import Contact from "@/components/sections/Contact";
import { CartProvider } from "@/components/shop/CartProvider";
import Basket from "@/components/shop/Basket";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const dict = getDictionary(locale);

  return (
    /*
      The basket wraps the page rather than living in the header: the price
      list and the basket are the same conversation, and both need the same
      state. Nothing renders for it until something is actually bought.
    */
    <CartProvider>
      <Hero dict={dict} />
      <Facts dict={dict} />
      <Languages dict={dict} />
      <Courses dict={dict} locale={locale} />
      <Why dict={dict} />
      <People dict={dict} />
      <Contact dict={dict} locale={locale} />
      <Basket dict={dict} locale={locale} />
    </CartProvider>
  );
}
