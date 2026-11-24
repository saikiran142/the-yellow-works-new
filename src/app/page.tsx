import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";
import { ContactForm } from "@/components/forms/ContactForm";
import { Faq } from "@/components/sections/Faq";
import { Hero } from "@/components/sections/Hero";
import { Industries } from "@/components/sections/Industries";
import { Problem } from "@/components/sections/Problem";
import { Process } from "@/components/sections/Process";
import { Services } from "@/components/sections/Services";
import { Showcase } from "@/components/sections/Showcase";
import { Vision } from "@/components/sections/Vision";
import { Why } from "@/components/sections/Why";

export default function HomePage() {
  return (
    <>
      <Header />
      <main id="main">
        <Hero />
        <Problem />
        <Industries />
        <Services />
        <Showcase />
        <Why />
        <Process />
        <Vision />
        <Faq />
        <ContactForm />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
