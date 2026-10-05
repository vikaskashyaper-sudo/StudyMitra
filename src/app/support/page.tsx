import type { Metadata } from "next";
import { siteConfig } from "@/config/siteConfig";
import { SupportActions } from "@/components/SupportActions";

export const metadata: Metadata = {
  title: "Support",
  description: `Support ${siteConfig.siteName} and help us create more free educational resources.`,
};

export default function SupportPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <h1 className="text-3xl font-bold sm:text-4xl">Support StudyMitra</h1>
      <p className="mt-4 text-text-muted">{siteConfig.supportMessage}</p>

      <div className="mt-8">
        <SupportActions />
      </div>

      <div className="mt-8 rounded-xl border border-border bg-surface-alt p-6">
        <h2 className="text-lg font-semibold">Get in touch</h2>
        <p className="mt-2 text-sm text-text-muted">
          Questions or feedback? Email us at{" "}
          <a
            href={`mailto:${siteConfig.contactEmail}`}
            className="font-medium text-primary transition-colors hover:text-primary-hover"
          >
            {siteConfig.contactEmail}
          </a>
          .
        </p>
      </div>
    </div>
  );
}
