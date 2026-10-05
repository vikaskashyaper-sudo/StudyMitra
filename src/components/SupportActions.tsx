"use client";

import { useState } from "react";
import { siteConfig } from "@/config/siteConfig";
import { generateUpiLink } from "@/lib/generateUpiLink";
import { CheckIcon, CopyIcon } from "@/components/icons";

const isConfigured = /^[\w.-]+@[\w.-]+$/.test(siteConfig.upiId) &&
  siteConfig.upiId !== "YOUR_UPI_ID_HERE" &&
  siteConfig.suggestedAmounts.length > 0 &&
  siteConfig.suggestedAmounts.every((amount) => Number.isFinite(amount) && amount > 0);

export function SupportActions() {
  const [copied, setCopied] = useState(false);
  const [qrFailed, setQrFailed] = useState(false);

  async function copyUpiId() {
    if (!isConfigured) return;
    try {
      await navigator.clipboard.writeText(siteConfig.upiId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard may be unavailable; ignore and keep the ID visible.
    }
  }

  if (!isConfigured) {
    return (
      <div className="rounded-xl border border-dashed border-border bg-surface-alt p-6 text-center">
        <p className="text-sm font-semibold text-text">UPI payment is not configured yet.</p>
        <p className="mt-2 text-sm text-text-muted">
          Voluntary support will be available here once valid UPI details and suggested amounts are set. The QR image is configured at{" "}
          <code className="rounded bg-surface px-1.5 py-0.5 text-xs text-text">{siteConfig.qrCode}</code>.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-border bg-surface p-6">
      <div className="flex flex-col items-center gap-4 text-center">
        <div className="relative h-48 w-48 overflow-hidden rounded-xl border border-border bg-surface-alt">
          {qrFailed ? (
            <div className="flex h-full w-full items-center justify-center p-4 text-xs text-text-muted">
              QR code unavailable
            </div>
          ) : (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={siteConfig.qrCode}
              alt={`${siteConfig.siteName} UPI QR code`}
              className="h-full w-full object-contain"
              onError={() => setQrFailed(true)}
            />
          )}
        </div>
        <div className="flex flex-col items-center gap-1">
          <p className="text-sm text-text-muted">UPI ID</p>
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-text">{siteConfig.upiId}</span>
            <button
              type="button"
              onClick={copyUpiId}
              className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-border text-text-muted transition-colors hover:text-primary"
              aria-label="Copy UPI ID"
            >
              {copied ? <CheckIcon className="h-4 w-4" /> : <CopyIcon className="h-4 w-4" />}
            </button>
          </div>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {siteConfig.suggestedAmounts.map((amount) => (
          <a
            key={amount}
            href={generateUpiLink(siteConfig.upiId, siteConfig.upiName, amount, `Support for ${siteConfig.siteName}`)}
            className="inline-flex items-center justify-center rounded-lg border border-border px-4 py-2.5 text-sm font-semibold text-text transition-colors hover:border-primary hover:text-primary"
          >
            ₹{amount}
          </a>
        ))}
      </div>
    </div>
  );
}
