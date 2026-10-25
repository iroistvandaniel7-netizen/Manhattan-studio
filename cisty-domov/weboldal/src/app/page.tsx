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

export default function HomePage() {
  return (
    <>
      <Hero />
      <VideoBand />
      <Services />
      <Prices />
      <Steps />
      <Game />
      <Office />
      <Gallery />
      <Faq />
      <Contact />
    </>
  );
}
