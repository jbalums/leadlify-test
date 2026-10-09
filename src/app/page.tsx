import Announcement from "@/components/sections/Announcement";
import Hero from "@/components/sections/Hero";
import MemberResults from "@/components/sections/MemberResults";
import WhoItsFor from "@/components/sections/WhoItsFor";
import AboutAaron from "@/components/sections/AboutAaron";
import WhyItWorks from "@/components/sections/WhyItWorks";
import WhatsIncluded from "@/components/sections/WhatsIncluded";
import Guarantee from "@/components/sections/Guarantee";
import FinalOffer from "@/components/sections/FinalOffer";
import Footer from "@/components/sections/Footer";

export default function Home() {
  return (
    <>
      <a className="skip-link" href="#main-heading">
        Skip to content
      </a>
      <Announcement />
      <main id="content" className="containerWrapper">
        <Hero />
        <MemberResults />
        <WhoItsFor />
        <AboutAaron />
        <WhyItWorks />
        <WhatsIncluded />
        <Guarantee />
        <FinalOffer />
      </main>
      <Footer />
    </>
  );
}
