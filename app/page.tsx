import type { Metadata } from "next";
import { profile } from "@/lib/portfolio-data";
import { ChatWidget } from "@/components/ChatWidget";
import { Contact } from "@/components/Contact";
import { FeaturedDataWarehouse } from "@/components/FeaturedDataWarehouse";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { ParticleBackground } from "@/components/ParticleBackground";
import { Projects } from "@/components/Projects";
import { ProofStrip } from "@/components/ProofStrip";
import { Resume } from "@/components/Resume";
import { Skills } from "@/components/Skills";


const siteUrl = "https://portofolio.axentraproject.site";
const description =
  "Explore Yahya Firdaus's software engineering portfolio: backend systems, Python and Django, data pipelines, dashboards, and AI projects. Based in Bandung, Indonesia.";

export const metadata: Metadata = {
  title: "Yahya Firdaus | Software Engineer Portfolio",
  description,
  alternates: { canonical: `${siteUrl}/` },
  openGraph: {
    title: "Yahya Firdaus | Software Engineer Portfolio",
    description,
    url: `${siteUrl}/`,
    siteName: "Yahya Firdaus",
    type: "website",
    locale: "en_US",
    images: [{ url: `${siteUrl}/og`, width: 1200, height: 630, alt: "Yahya Firdaus — Software engineer and backend developer" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Yahya Firdaus | Software Engineer Portfolio",
    description,
    images: [`${siteUrl}/og`],
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  "@id": `${siteUrl}/#profile`,
  url: `${siteUrl}/`,
  name: "Yahya Firdaus | Software Engineer Portfolio",
  description,
  inLanguage: "en",
  mainEntity: {
    "@type": "Person",
    "@id": `${siteUrl}/#person`,
    name: profile.name,
    url: `${siteUrl}/`,
    jobTitle: profile.role,
    description: profile.headline,
    image: `${siteUrl}/profile/yahya-firdaus.png`,
    sameAs: [profile.linkedin, profile.portfolio],
    knowsAbout: ["Backend development", "Python", "Django", "Data engineering", "Natural language processing"],
  },
};

export default function Home() {
  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }} />
      <ParticleBackground />
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
