import BrandsSection from "@/components/BrandsSection";
import ContactForm from "@/components/ContactForm";
import Content from "@/components/Content";
import FAQ from "@/components/FAQ";
import HeroSection from "@/components/HeroSection";
import HeroSectionCat from "@/components/HeroSectionCat";
import PackagingFeatures from "@/components/PackagingFeatures";
import ProductListing from "@/components/ProductListing";
import ProductSlider from "@/components/ProductSlider";
import Testimonial from "@/components/Testimonial";

const API_URL = "https://php.nexonpackaging.com/api/get_category_by_id";
const BASE_URL = "https://nexonpackaging.com"; // Deine Hauptdomain

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
      title: `${data.category.title}`,
      description: ` ${data.category?.meta_description || data.category?.description}`,
      openGraph: {
        title: `${data.category.title}`,
        description: ` ${data.category.title} `,
        images: [
          {
            url: data.category.header_img || data.category.main_img,
            width: 1200,
            height: 630,
            alt: data.category.title,
          },
        ],
      },
    };
  } catch (error) {
    console.error("Error fetching metadata:", error);
    return { title: "Category Not Found" };
  }
}

async function getCategoryData(id) {
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

export default async function CategoryPage({ params }) {
  const { id } = await params;
  const data = await getCategoryData(id);

  if (!data?.category) {
    return <h2 className="text-center text-red-500">Category Not Found</h2>;
  }

  // --- START: JSON-LD SCHEMA GENERATION ---

  const categoryUrl = `${BASE_URL}/category/${id}`; // BITTE PRÜFEN: Passe dies an deine exakte URL-Struktur an!
  
  // 1. Erstelle das BreadcrumbList Schema für die Hierarchie
  // const breadcrumbSchema = {
  //   "@type": "BreadcrumbList",
  //   "itemListElement": [
  //     {
  //       "@type": "ListItem",
  //       "position": 1,
  //       "name": "Home",
  //       "item": BASE_URL
  //     },
  //     {
  //       "@type": "ListItem",
  //       "position": 2,
  //       "name": data.category.title,
  //       "item": categoryUrl
  //     }
  //   ]
  // };

  // 2. Erstelle das CollectionPage und ItemList Schema
  const collectionPageSchema = {
    "@type": "CollectionPage",
    "name": data.category.title,
    "description": data.category.meta_description || data.category.description,
    "url": categoryUrl,
    // Die 'mainEntity' ist die ItemList, die die Produkte auf dieser Seite enthält
    "mainEntity": {
      "@type": "ItemList",
      "itemListElement": data.products.map((product, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "item": {
          "@type": "Product", // Wir definieren das Element als "Product"
          "name": product.title, // Annahme: Das Produktobjekt hat einen 'title'
          "url": `${BASE_URL}/products/${product.id}` // Annahme: Produkt-URL-Struktur & Produktobjekt hat eine 'id'
        }
      }))
    }
  };

  // Wir verwenden @graph, um alle Schema-Typen sauber zu bündeln
  const schemaGraph = [collectionPageSchema];

  // 3. Füge das FAQPage Schema hinzu, falls FAQs vorhanden sind
  if (data?.category?.faqs && data.category.faqs.length > 0) {
    const faqSchema = {
      "@type": "FAQPage",
      "mainEntity": data.category.faqs.map((faq) => ({
        "@type": "Question",
        "name": faq.question, // Annahme: Key ist 'question'
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.answer // Annahme: Key ist 'answer'
        }
      }))
    };
    schemaGraph.push(faqSchema);
  }
  
  // 4. Bereite das finale JSON-LD Skript vor
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
      <HeroSectionCat data={data}/>
      <ProductListing data={data} />
      <BrandsSection />
      <PackagingFeatures />
      {data?.category.content && 
      <Content  data={data?.category} />}
      <ContactForm />
      {data?.category.faqs.length > 0 && 
      <FAQ  faqs={data?.category.faqs}/>}
      <Testimonial />
      <ProductSlider />
    </>
  );
}
