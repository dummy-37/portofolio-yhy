import { ChatWidget } from "@/components/ChatWidget";
import { Contact } from "@/components/Contact";
import { FeaturedDataWarehouse } from "@/components/FeaturedDataWarehouse";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Projects } from "@/components/Projects";
import { ProofStrip } from "@/components/ProofStrip";
import { Resume } from "@/components/Resume";
import { Skills } from "@/components/Skills";

export default function Home() {
  return (
    <main>
      <Header />
      <Hero />
      <ProofStrip />
      <Skills />
      <FeaturedDataWarehouse />
      <Projects />
      <Resume />
      <Contact />
      <ChatWidget />
    </main>
  );
}
