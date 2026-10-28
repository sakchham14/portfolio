import type { Metadata } from "next";
import { GoogleAnalytics } from "@next/third-parties/google";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sakchham Maharjan — Full-Stack Developer & Systems/Network Engineer",
  description:
    "CSIT student specializing in Full-Stack Development, Network & System Administration, and Infrastructure Automation. Building cloud infrastructure, self-hosted services, and dynamic full-stack applications.",
  keywords: [
    "Sakchham Maharjan",
    "Full-Stack Developer",
    "Network Engineer",
    "System Administration",
    "Infrastructure Automation",
    "React",
    "Next.js",
    "Linux",
    "Docker",
  ],
  authors: [{ name: "Sakchham Maharjan" }],
  creator: "Sakchham Maharjan",
  openGraph: {
    title: "Sakchham Maharjan — Full-Stack Developer & Systems/Network Engineer",
    description:
      "CSIT student passionate about cloud infrastructure, self-hosted services, dynamic full-stack applications, and network automation.",
    type: "website",
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;

  return (
    <html lang="en" className="h-full antialiased dark" suppressHydrationWarning>
      <body className="min-h-full w-full flex flex-col bg-[#070b18] font-sans text-slate-100">
        {children}
        {gaId && <GoogleAnalytics gaId={gaId} />}
      </body>
    </html>
  );
}
