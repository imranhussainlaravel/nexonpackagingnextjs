import ContactForm from '@/components/ContactForm';
import CustomBoxes from '@/components/CustomBoxes'
import FAQ from '@/components/FAQ';
import PrintingQuality from '@/components/PrintingQuality';
import ProductSlider from '@/components/ProductSlider';
import ProductSpecification from '@/components/ProductSpecification';
import ProductView from '@/components/ProductView'
import Testimonial from '@/components/Testimonial';
import Content from '@/components/Content';

import React from 'react'


const API_URL = "https://php.nexonpackaging.com/api/get_product_by_id";
const BASE_URL = "https://nexonpackaging.com"; 

export async function generateMetadata({ params }) {
  const { id } = await params;

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });

    const data = await response.json();



    return {
      title: `${data.title}`,
      description: ` ${data.meta_description || data.description}`,
      openGraph: {
        title: `${data.title}`,
        description: ` ${data.title} `,
        images: [
          {
            url: data.header_img || data.main_img,
            width: 1200,
            height: 630,
            alt: data.title,
          },
        ],
      },
    };
  } catch (error) {
    console.error("Error fetching metadata:", error);
    return { title: 'product Not Found' };
  }
}

async function getProductData(id) {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });



    return await response.json();
  } catch (error) {
    console.error("Error fetching category data:", error);
    return null;
  }
}
export default async function page({ params }) {
  const { id } =  await params;


  const data = await getProductData(id);

 
  if (!data) {
    return <h2 className="text-center text-red-500">Product Not Found</h2>;
  }

  // --- START: JSON-LD SCHEMA GENERATION ---

  // Definiere die Basis-URL für dein Produkt
  const productUrl = `${BASE_URL}/products/${id}`; // BITTE PRÜFEN: Passe dies an deine exakte URL-Struktur an!

  // 1. Erstelle das Product Schema Objekt
  const productSchema = {
    "@type": "Product",
    "name": data.title,
    "url": productUrl,
    "image": [
        data.header_img || data.main_img // Google empfiehlt, Bilder in einem Array anzugeben
    ],
    "description": data.meta_description || data.description,
    // Falls du eine SKU im 'data'-Objekt hast (z.B. data.sku), füge sie hier ein. Sonst kannst du die Zeile löschen.
    "sku": data.sku || id,
    "brand": {
      "@type": "Brand",
      "name": "Nexon"
    },
    // Da es keinen Preis gibt, definieren wir ein "Offer" ohne Preis, aber mit Verfügbarkeit.
    // Das signalisiert Google, dass es sich um ein kommerzielles Angebot handelt.
    "offers": {
      "@type": "Offer",
      "url": productUrl,
      "availability": "https://schema.org/InStock" // Annahme, dass Produkte generell bestellbar sind. Alternativen: OutOfStock, PreOrder
    }
  };

  // Wir verwenden die @graph-Technik, um mehrere Schema-Typen auf einer Seite zu bündeln.
  const schemaGraph = [productSchema];

  // 2. Erstelle das FAQPage Schema, WENN FAQs vorhanden sind
  if (data?.faqs && data.faqs.length > 0) {
    const faqSchema = {
      "@type": "FAQPage",
      "mainEntity": data.faqs.map((faq) => {
        return {
          "@type": "Question",
          "name": faq.question, // Annahme: Deine FAQ-Objekte haben die Keys 'question' und 'answer'
          "acceptedAnswer": {
            "@type": "Answer",
            "text": faq.answer
          }
        }
      })
    };
    schemaGraph.push(faqSchema);
  }

  // 3. Bereite das finale JSON-LD Skript vor
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": schemaGraph
  };

  // --- END: JSON-LD SCHEMA GENERATION ---

  return (
    <>
      {/* Das generierte JSON-LD Skript wird hier in den Head der Seite eingefügt */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      {/* Deine bestehenden Seitenkomponenten */}
      <ProductView data={data} />
      <CustomBoxes data={data} />
      <ProductSpecification data={data} />
      <PrintingQuality  />
      {data.content && 
      <Content data={data} />}
      <ContactForm />
      {data?.faqs.length > 0 &&
        <FAQ faqs={data?.faqs} />}
      <Testimonial />
      <ProductSlider />
    </>
  )
}
