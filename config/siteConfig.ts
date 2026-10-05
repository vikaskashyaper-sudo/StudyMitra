export const siteConfig = {
  siteName: "StudyMitra",
  // NEXT_PUBLIC_SITE_URL can override the deploy URL. Netlify supplies URL;
  // the free site URL keeps metadata correct in local production builds.
  siteUrl: (process.env.NEXT_PUBLIC_SITE_URL || process.env.URL || "https://studymitra.netlify.app").replace(/\/$/, ""),
  siteTagline: "Free Educational E-Books & Study Materials",
  siteDescription:
    "Learn better with free, accessible and student-friendly educational resources.",
  logo: "StudyMitra",

  // Contact
  contactEmail: "",
  whatsapp: "",
  socialLinks: [] as { name: string; url: string }[],

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
