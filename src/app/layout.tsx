import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "TrailKit - Track every app growth link from click to revenue",
    template: "%s - TrailKit",
  },
  description:
    "TrailKit is lightweight mobile attribution and payout infrastructure for app teams.",
  icons: {
    icon: "/brand/favicon.svg",
  },
  openGraph: {
    title: "TrailKit",
    description:
      "Track every creator, campaign, email, QR code, and website button from click to install to revenue.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
