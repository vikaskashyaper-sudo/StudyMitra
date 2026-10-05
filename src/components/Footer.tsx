import Link from "next/link";
import { siteConfig } from "@/config/siteConfig";
import { MailIcon, WhatsAppIcon, ExternalLinkIcon } from "@/components/icons";

const footerLinks = [
  { href: "/", label: "Home" },
  { href: "/books", label: "E-books" },
  { href: "/search", label: "Search" },
  { href: "/support", label: "Support" },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-surface-alt">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div>
            <Link href="/" className="font-display text-lg font-bold text-text">
              {siteConfig.logo}
            </Link>
            <p className="mt-2 text-sm text-text-muted">{siteConfig.siteTagline}</p>
            <p className="mt-4 text-sm text-text-muted">{siteConfig.footerText}</p>
          </div>

          <nav className="flex flex-col gap-2" aria-label="Footer navigation">
            <p className="text-sm font-semibold text-text">Explore</p>
            {footerLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-text-muted transition-colors hover:text-primary"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex flex-col gap-2">
            {(siteConfig.contactEmail || siteConfig.whatsapp || siteConfig.socialLinks.length > 0) && (
              <p className="text-sm font-semibold text-text">Contact</p>
            )}
            {siteConfig.contactEmail && <a
              href={`mailto:${siteConfig.contactEmail}`}
              className="flex items-center gap-2 text-sm text-text-muted transition-colors hover:text-primary"
            >
              <MailIcon className="h-4 w-4" />
              {siteConfig.contactEmail}
            </a>}
            {siteConfig.whatsapp && (
              <a
                href={`https://wa.me/${siteConfig.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-text-muted transition-colors hover:text-primary"
              >
                <WhatsAppIcon className="h-4 w-4" />
                WhatsApp
              </a>
            )}
            {siteConfig.socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-text-muted transition-colors hover:text-primary"
              >
                <ExternalLinkIcon className="h-4 w-4" />
                {social.name}
              </a>
            ))}
          </div>
        </div>

        <div className="mt-8 border-t border-border pt-6 text-sm text-text-muted">
          © {new Date().getFullYear()} {siteConfig.siteName}. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
