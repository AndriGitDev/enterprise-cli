import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  title: "ANDRI.IS - Terminal Interface",
  description: "Interactive CLI portfolio - Cybersecurity expert, System Administrator, Web Developer. Experience my portfolio through a hacker-style terminal interface.",
  keywords: [
    "portfolio",
    "CLI",
    "terminal",
    "cybersecurity",
    "web development",
    "system administrator",
    "ISO 27001",
    "TPN Gold",
    "Andri",
    "Aftra.io",
  ],
  authors: [{ name: "Andri" }],
  creator: "Andri",
  publisher: "ANDRI.IS",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://cli.andri.is"),
  openGraph: {
    title: "ANDRI.IS - Terminal Portfolio",
    description: "Experience my portfolio through a hacker-style CLI interface with real-time WPM tracking",
    url: process.env.NEXT_PUBLIC_SITE_URL || "https://cli.andri.is",
    siteName: "ANDRI.IS Terminal",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og-terminal.png",
        width: 1200,
        height: 630,
        alt: "ANDRI.IS Terminal Interface",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ANDRI.IS - Terminal Interface",
    description: "Interactive CLI portfolio experience with real-time WPM tracking",
    images: ["/og-terminal.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
        <Script src="https://cdn.jsdelivr.net/npm/swetrix@latest/dist/swetrix.js" strategy="afterInteractive" />
        <Script id="swetrix-init" strategy="afterInteractive">
          {`
            document.addEventListener('DOMContentLoaded', function() {
              if (window.swetrix) {
                swetrix.init('X05bK6JBJ6ZJ', {
                  apiURL: 'https://swetrixapi.kastro.is/log',
                });
                swetrix.trackViews();
              }
            });
            if (document.readyState !== 'loading' && window.swetrix) {
              swetrix.init('X05bK6JBJ6ZJ', {
                apiURL: 'https://swetrixapi.kastro.is/log',
              });
              swetrix.trackViews();
            }
          `}
        </Script>
        <noscript>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://swetrixapi.kastro.is/log/noscript?pid=X05bK6JBJ6ZJ"
            alt=""
            referrerPolicy="no-referrer-when-downgrade"
          />
        </noscript>
      </body>
    </html>
  );
}
