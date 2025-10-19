// import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Poppins } from "next/font/google";
import AnimationComponent from "@/components/AnimationComponent";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import FloatingPhoneButton from "@/components/FloatingPhoneButton";
import HelpButton from "@/components/HelpButton";
import BackToTopButton from "@/components/BackToTopButton";
import DarkModeToggle from "@/components/DarkModeToggle";
import ClientWrapper from '@/context/ClientWrapper'

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
});

export const metadata  = {
  title: "Custom Packaging | Nexon Packaging - USA",  
  description: "Nexon Packaging specializes in **custom packaging** solutions tailored to your needs. We offer **custom boxes, luxury packaging, and eco-friendly designs** for businesses across the USA, including Florida. Get high-quality, customizable packaging that enhances your brand and protects your products.",  
  keywords: "custom packaging, packaging solutions, custom boxes, eco-friendly packaging, luxury packaging, Florida packaging company, Nexon Packaging, USA custom packaging",  
  authors: [{ name: "Nexon Packaging", url: "https://nexonpackaging.com" }],  
  applicationName: "Nexon Packaging",  
  creator: "Nexon Packaging",  
  publisher: "Nexon Packaging",  
  generator: "Next.js",  
  icons: {  
    icon: "https://images.nexonpackaging.com/logo.webp",  
    shortcut: "https://images.nexonpackaging.com/logo.webp",  
    apple: "https://images.nexonpackaging.com/logo.webp",  
  },  
  // manifest: "/site.webmanifest",  
  robots: "index, follow",  
  openGraph: {  
    title: "Custom Packaging Solutions | Nexon Packaging - USA",  
    description: "Explore premium **custom packaging solutions** at Nexon Packaging. We provide high-quality, customizable packaging options for businesses across the USA, including Florida.",  
    url: "https://nexonpackaging.com",  
    siteName: "Nexon Packaging",  
    type: "website",  
    locale: "en_US",  
    images: [  
      {  
        url: "https://images.nexonpackaging.com/logo.webp",  
        width: 1200,  
        height: 630,  
        alt: "Custom Packaging Solutions by Nexon Packaging",  
      },  
    ],  
  },  
  twitter: {  
    card: "summary_large_image",  
    site: "@nexonpackaging",  
    creator: "@nexonpackaging",  
    title: "Custom Packaging | Nexon Packaging - USA",  
    description: "Get **custom packaging** designed to fit your brand's needs. Nexon Packaging offers high-quality, luxury, and eco-friendly packaging solutions.",  
    images: ["https://images.nexonpackaging.com/logo.webp"],  
  },  
  alternates: {  
    canonical: "https://nexonpackaging.com",  
    languages: {  
      "en-US": "https://nexonpackaging.com/en",  
    },  
  },  
  // viewport: "width=device-width, initial-scale=1",  
  // themeColor: "#f0644b",  
  appleWebApp: {  
    capable: true,  
    statusBarStyle: "default",  
  },  
};

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://nexonpackaging.com/#organization",
        "name": "Nexon Packaging",
        "url": "https://nexonpackaging.com",
        "logo": {
          "@type": "ImageObject",
          "url": "https://images.nexonpackaging.com/logo.webp"
        },
        // WICHTIG: Füge hier deine korrekte US-Telefonnummer ein
        "contactPoint": {
          "@type": "ContactPoint",
          "telephone": "(904) 706-8883", // PLATZHALTER
          "contactType": "Customer Service" // Oder "Sales", "Technical Support" etc.
        },
        // WICHTIG: Füge hier ALLE deine Social-Media-Profile ein
        "sameAs": [
          "https://www.linkedin.com/company/nexonpackaging/", // Aus deinen Metadaten
          "https://www.instagram.com/nexonpackaging", // PLATZHALTER
        ]
      },
      {
        "@type": "WebSite",
        "@id": "https://nexonpackaging.com/#website",
        "url": "https://nexonpackaging.com",
        "name": "Nexon Packaging",
        "description": "Nexon Packaging specializes in custom packaging solutions tailored to your needs. We offer custom boxes, luxury packaging, and eco-friendly designs for businesses across the USA.",
        "publisher": {
          "@id": "https://nexonpackaging.com/#organization" // Verknüpft die Website mit der Organisation
        },
        // Dies aktiviert die Sitelinks-Suchbox in den Google-Ergebnissen
        "potentialAction": {
          "@type": "SearchAction",
          "target": {
            "@type": "EntryPoint",
            // WICHTIG: Prüfe, ob dies eure tatsächliche Such-URL-Struktur ist
            "urlTemplate": "https://nexonpackaging.com/search?q={search_term_string}"
          },
          "query-input": "required name=search_term_string"
        }
      }
    ]
  };
  // --- END: JSON-LD SCHEMA ---


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={` ${poppins.variable} antialiased`}
      >
         <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
       <AnimationComponent />
       <ClientWrapper>
       <DarkModeToggle />
        <Navbar />
        {children}
       
        <HelpButton />
        <FloatingPhoneButton />
        <BackToTopButton />
        <Footer />
        </ClientWrapper>
      
      </body>
    </html>
  );
}
