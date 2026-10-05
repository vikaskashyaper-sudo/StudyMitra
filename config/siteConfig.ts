export const siteConfig = {
  siteName: "StudyMitra",
  // Set NEXT_PUBLIC_SITE_URL for a custom deployment URL; Netlify provides URL
  // automatically. The localhost fallback keeps local builds valid.
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || process.env.URL || "http://localhost:3000",
  siteTagline: "Free Educational E-Books & Study Materials",
  siteDescription:
    "Learn better with free, accessible and student-friendly educational resources.",
  logo: "StudyMitra",

  // Contact
  contactEmail: "contact@studymitra.in",
  whatsapp: "919999999999",
  socialLinks: [
    { name: "GitHub", url: "https://github.com/studymitra" },
  ],

  // Support / UPI
  upiId: "YOUR_UPI_ID_HERE",
  upiName: "StudyMitra",
  qrCode: "/images/studymitra-upi-qr.svg",
  supportMessage:
    "All StudyMitra educational resources are provided free of cost. If you find our resources useful, you may voluntarily support our work. Your support helps us create and publish more free educational resources.",
  suggestedAmounts: [50, 100, 200, 500],

  // Footer
  footerText:
    "StudyMitra provides completely free educational resources. No payment is ever required to download any e-book.",
} as const;

export type SiteConfig = typeof siteConfig;
