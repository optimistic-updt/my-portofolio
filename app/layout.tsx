import type { Metadata, Viewport } from "next";
import { Raleway, Rubik } from "next/font/google";
import "./globals.css";

import { Analytics } from "@vercel/analytics/react";
import { PostHogProvider } from "./component/providers";

const raleway = Raleway({
  subsets: ["latin"],
  variable: "--font-raleway",
  weight: ["300", "400", "500", "700", "800"],
  style: ["normal", "italic"],
});

const rubik = Rubik({
  subsets: ["latin"],
  variable: "--font-rubik",
  weight: ["300", "400", "500", "700"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Kevin Garcia-Fernandez | Software Developer",
  description: "Rocking in the Software World",
  metadataBase: new URL("https://kevgarcia.fyi"),
  openGraph: {
    title: "Kevin Garcia-Fernandez, Software Developer",
    description: "My portfolio",
    url: "https://kevgarcia.fyi",
    images: ["/images/og-shot-1.png"],
    type: "website",
  },
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
  // manifest: "/site.webmanifest",
  viewport: "width=device-width, initial-scale=1",
};

export const viewport: Viewport = {
  themeColor: "#ff69f0",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${raleway.variable} ${rubik.variable} antialiased`}>
        <PostHogProvider>{children}</PostHogProvider>
        <Analytics />
      </body>
    </html>
  );
}
