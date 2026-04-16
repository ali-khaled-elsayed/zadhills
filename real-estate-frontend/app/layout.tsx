import type { Metadata, Viewport } from 'next';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import './globals.css';

export const metadata: Metadata = {
  title: "ZAD Hills Real Estate",
  description: "Discover luxury real estate properties with premium investment opportunities, modern architecture, and trusted developers.",
  keywords: ["real estate", "properties", "apartments", "villas", "investment", "Egypt", "ZAD Hills"],
  authors: [{ name: "ZAD Hills" }],
  metadataBase: new URL('https://example.com'),
  openGraph: {
    title: "ZAD Hills Real Estate",
    description: "Discover luxury real estate properties with premium investment opportunities.",
    type: "website",
    locale: "en_US",
    alternateLocale: "ar_AR",
  },
  icons: {
    icon: '/logo.svg',
    shortcut: '/logo.svg',
    apple: '/logo.svg',
  },
  manifest: '/manifest.webmanifest',
};

export const viewport: Viewport = {
  themeColor: "#EDE5D8",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" dir="ltr">
      <body className="min-h-screen flex flex-col font-sans antialiased">
        <Navbar />
        <div className="flex-1">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
