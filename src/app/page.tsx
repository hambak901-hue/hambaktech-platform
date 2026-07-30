import Header from "@/components/layout/Header";
import Hero from "@/components/sections/Hero";
import Stats from "@/components/sections/Stats";
import Services from "@/components/sections/Services";
import Testimonials from "@/components/sections/Testimonials";
import About from "@/components/sections/About";
import WhyChoose from "@/components/sections/WhyChoose";
import Academy from "@/components/sections/Academy";
import CTA from "@/components/sections/CTA";
import Footer from "@/components/layout/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <Hero />
      <Stats />
      <Services />
      <Testimonials />
      <About />
      <WhyChoose />
      <Academy />
      <CTA />
      <Footer />
    </>
  );
}