import Hero from "@/components/sections/Hero";
import Facts from "@/components/sections/Facts";
import Services from "@/components/sections/Services";
import Game from "@/components/sections/Game";
import Prices from "@/components/sections/Prices";
import Why from "@/components/sections/Why";
import Steps from "@/components/sections/Steps";
import Faq from "@/components/sections/Faq";
import Contact from "@/components/sections/Contact";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Facts />
      <Services />
      <Game />
      <Prices />
      <Why />
      <Steps />
      <Faq />
      <Contact />
    </>
  );
}
