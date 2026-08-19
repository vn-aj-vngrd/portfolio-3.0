import "./globals.css";

import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { ScrollReveal } from "@/components/providers/ScrollReveal";
import { SmoothScroll } from "@/components/providers/SmoothScroll";
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
    default: "Van AJ Vanguardia | Full-Stack Software Developer",
    template: "%s | Van AJ Vanguardia",
  },
  description:
    "Full-stack software developer in Cebu working with TypeScript, React, Next.js, React Native, ASP.NET Core, Node.js, and coding-agent workflows.",
  authors: [{ name: "Van AJ Vanguardia" }],
  creator: "Van AJ Vanguardia",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Van AJ Vanguardia | Full-Stack Software Developer",
    description:
      "Selected web and mobile products, professional experience, technical stack, and software development workflow.",
    url: "/",
    siteName: "Van AJ Vanguardia",
    locale: "en_PH",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Van AJ Vanguardia | Full-Stack Software Developer",
    description:
      "Selected web and mobile products, professional experience, technical stack, and software development workflow.",
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
          <SmoothScroll />
          <ScrollReveal />
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
