import type { Metadata } from "next";
import { Raleway, Rubik } from "next/font/google";
import "./globals.css";

import { Analytics } from "@vercel/analytics/react";

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
  themeColor: "#ff69f0",
  viewport: "width=device-width, initial-scale=1",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      {/* <!-- Global site tag (gtag.js) - Google Analytics --> */}
      {/* <script
      async
      src="https://www.googletagmanager.com/gtag/js?id=UA-170097087-1"
    ></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag() {
        dataLayer.push(arguments);
      }
      gtag("js", new Date());

      gtag("config", "UA-170097087-1");
    </script> */}

      <body className={`${raleway.variable} ${rubik.variable} antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
