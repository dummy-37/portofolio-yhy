import { profile } from "@/lib/portfolio-data";

const navItems = [
  { href: "#about", label: "About" },
  { href: "#featured", label: "Featured" },
  { href: "#work", label: "Work" },
  { href: "#experience", label: "Experience" },
  { href: "#contact", label: "Contact" }
];

export function Header() {
  return (
    <header className="site-header">
      <a className="brand" href="#home" aria-label="Back to top">
        <span className="brand-mark">YF</span>
        <span className="brand-copy">
          <strong>{profile.name}</strong>
          <small>Software engineer</small>
        </span>
      </a>

      <nav className="site-nav" aria-label="Portfolio sections">
        {navItems.map((item) => (
          <a href={item.href} key={item.href}>
            {item.label}
          </a>
        ))}
      </nav>

      <a className="download-button" href={profile.resumeUrl} target="_blank" rel="noreferrer">
        Download CV <span aria-hidden="true">↗</span>
      </a>
    </header>
  );
}
