import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Yahya Firdaus | Software Engineer Portfolio",
  description:
    "Portfolio website for Yahya Firdaus, a backend-focused software engineer with experience in Django, Flask, PostgreSQL, chatbot development, NLP, and data engineering.",
  authors: [{ name: "Yahya Firdaus" }],
  metadataBase: new URL("https://portofolio.axentraproject.site"),
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={inter.variable}>
      <body>{children}</body>
    </html>
  );
}
