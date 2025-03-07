import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
  preload: true
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
  preload: true
});

export const metadata = {
  icons: {
    icon: "/favicon.ico",
  },
  title: "Segun Thorpe - Software Developer & QA Engineer",
  description: "A showcase of my software development and automation projects. Explore my work in web development, testing, and automation.",
  keywords: "software developer, QA engineer, automation, testing, web development, Next.js, React, portfolio",
  authors: [{ name: "Segun Thorpe", url: "https://segunthorpe.com" }],
  robots: "index, follow",
  openGraph: {
    title: "Segun Thorpe - Software Developer & QA Engineer",
    description: "Explore my projects in software development, web automation, and testing.",
    url: "https://segunthorpe.com",
    siteName: "Segun Thorpe Portfolio",
    images: [
      {
        url: "https://segunthorpe.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Segun Thorpe Portfolio Preview",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Segun Thorpe - Software Developer & QA Engineer",
    description: "A showcase of my software development and automation projects.",
    images: ["https://segunthorpe.com/og-image.jpg"],
  },
};


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <meta name="keywords" content={metadata.keywords} />
        <meta name="robots" content={metadata.robots} />
        <link rel="icon" href="{metadata.icons.icon}" />

        {/* Preload LCP Image */}
        <link rel="preload" as="image" href="/profile-300.avif" type="image/avif" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased overflow-x-hidden`}>
        {children}
      </body>
    </html>
  );
}
