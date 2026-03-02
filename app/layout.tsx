import type { Metadata } from "next";
import "./globals.css";
import dynamic from "next/dynamic";
import ConvexClientProvider from "./ConvexClientProvider";
import Footer from "@/components/Footer";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/theme-provider";

// Dynamic import with ssr:false is the definitive fix for the
// "Provided address was not an absolute URL" prerender error.
// better-auth/react has module-level side effects (fetch calls) that crash
// during Next.js static prerendering. Excluding it from SSR entirely prevents this.
const Navbar = dynamic(() => import("@/components/Navbar"), { ssr: false });

export const metadata: Metadata = {
  title: "Masenya Auto Parts | Premier Motor Spares & Accessories South Africa",
  description:
    "Masenya Auto Parts: South Africa's premier retail supplier of motor spares, accessories, batteries, tyres, and body parts. Quality parts for all vehicles in Hercules, Pretoria West.",
  keywords: [
    "motor spares south africa",
    "auto parts pretoria",
    "car accessories south africa",
    "car batteries pretoria",
    "replacement car parts",
    "Masenya Auto Parts",
    "brake pads south africa",
  ],
  authors: [{ name: "Masenya Auto Parts" }],
  openGraph: {
    title: "Masenya Auto Parts | Premier Motor Spares & Accessories",
    description:
      "Premier retail supplier of motor spares, accessories, and body parts for all vehicles in South Africa. Quality you can trust.",
    type: "website",
    locale: "en_ZA",
    siteName: "Masenya Auto Parts",
  },
  twitter: {
    card: "summary_large_image",
    title: "Masenya Auto Parts | Premier Motor Spares & Accessories",
    description:
      "Premier retail supplier of motor spares, accessories, and body parts for all vehicles in South Africa.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
          />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Outfit:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "name": "Masenya Auto Parts",
              "image": "/expert-log.png",
              "phone": "+27 61 440 3483",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "3172 Imetjhuri Crescent, Kirkney Estate, Hercules",
                "addressLocality": "Pretoria West",
                "postalCode": "0030",
                "addressCountry": "ZA"
              },
              "description": "Premier retail supplier of motor spares, accessories, batteries, tyres, and body parts for all vehicles in South Africa.",
              "url": "https://masenyaautoparts.co.za"
            })
          }}
        />
      </head>
      <body className="antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          <ConvexClientProvider>
            <div className="flex min-h-screen flex-col">
              <Navbar />
              <main className="flex-1">{children}</main>
              <Footer />
              <Toaster />
            </div>
          </ConvexClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
