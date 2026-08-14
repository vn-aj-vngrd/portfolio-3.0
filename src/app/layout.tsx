import "./globals.css";

import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { ThemeProvider } from "@/components/providers/ThemeProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FCFCFD" },
    { media: "(prefers-color-scheme: dark)", color: "#090A0C" },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL("https://vanajvanguardia.vercel.app"),
  title: {
    default: "Van AJ Vanguardia — Product-minded Full-Stack Software Engineer",
    template: "%s — Van AJ Vanguardia",
  },
  description:
    "Full-stack software engineer in Cebu building TypeScript web, mobile, backend, and AI-powered products from idea to release.",
  authors: [{ name: "Van AJ Vanguardia" }],
  creator: "Van AJ Vanguardia",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Van AJ Vanguardia — Product-minded Full-Stack Software Engineer",
    description:
      "Selected web, mobile, backend, and AI-powered product engineering work.",
    url: "/",
    siteName: "Van AJ Vanguardia",
    locale: "en_PH",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Van AJ Vanguardia — Product-minded Full-Stack Software Engineer",
    description:
      "Selected web, mobile, backend, and AI-powered product engineering work.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <a className="skip-link" href="#main-content">
            Skip to content
          </a>
          <div id="top" />
          <Header />
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
