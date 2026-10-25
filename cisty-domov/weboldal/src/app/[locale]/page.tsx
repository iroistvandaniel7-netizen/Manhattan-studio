import { notFound } from "next/navigation";
import { getDictionary, isLocale } from "@/i18n";
import Hero from "@/components/sections/Hero";
import VideoBand from "@/components/sections/VideoBand";
import Services from "@/components/sections/Services";
import Prices from "@/components/sections/Prices";
import Steps from "@/components/sections/Steps";
import Game from "@/components/sections/Game";
import Office from "@/components/sections/Office";
import Gallery from "@/components/sections/Gallery";
import Faq from "@/components/sections/Faq";
import Contact from "@/components/sections/Contact";

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);

  return (
    <>
      <Hero copy={dict.hero} />
      <VideoBand copy={dict.video} ribbon={dict.marquee} />
      <Services copy={dict.services} />
      <Prices copy={dict.prices} />
      <Steps copy={dict.steps} />
      <Game copy={dict.game} />
      <Office copy={dict.office} />
      <Gallery copy={dict.gallery} />
      <Faq copy={dict.faq} />
      <Contact locale={locale} copy={dict.contact} services={dict.services.items} />
    </>
  );
}
