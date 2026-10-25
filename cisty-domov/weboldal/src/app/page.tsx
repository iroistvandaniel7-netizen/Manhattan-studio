import Hero from "@/components/sections/Hero";
import VideoBand from "@/components/sections/VideoBand";
import Services from "@/components/sections/Services";
import BeforeAfter from "@/components/sections/BeforeAfter";
import Prices from "@/components/sections/Prices";
import Steps from "@/components/sections/Steps";
import Office from "@/components/sections/Office";
import Gallery from "@/components/sections/Gallery";
import Game from "@/components/sections/Game";
import Faq from "@/components/sections/Faq";
import Contact from "@/components/sections/Contact";

export default function HomePage() {
  return (
    <>
      <Hero />
      <VideoBand />
      <Services />
      <BeforeAfter />
      <Prices />
      <Steps />
      <Office />
      <Gallery />
      <Game />
      <Faq />
      <Contact />
    </>
  );
}
