import { notFound } from "next/navigation";
import { getDictionary } from "@/i18n";
import { isLocale } from "@/i18n/config";

import Hero from "@/components/sections/Hero";
import Facts from "@/components/sections/Facts";
import Languages from "@/components/sections/Languages";
import Quiz from "@/components/sections/Quiz";
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
  /* Read here, on the server, where the real key lives. The basket needs to
     know whether it is promising a payment page or a phone call. */
  const payOnline = Boolean(process.env.STRIPE_SECRET_KEY);

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
      {/* Before the price list, not after: the test ends on a course, and the
          shelf it recommends from is the next thing the reader scrolls into. */}
      <Quiz dict={dict} locale={locale} />
      <Courses dict={dict} locale={locale} />
      <Why dict={dict} />
      <People dict={dict} />
      <Contact dict={dict} locale={locale} />
      <Basket dict={dict} locale={locale} payOnline={payOnline} />
    </CartProvider>
  );
}
