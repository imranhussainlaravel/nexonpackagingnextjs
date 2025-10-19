import Image from "next/image";
import HeroSection from "@/components/HeroSection";
import PackagingGallery from "@/components/PackagingGallery";
import PackagingFeatures from "@/components/PackagingFeatures";
import ContactForm from "@/components/ContactForm";
import Trusted from "@/components/Trusted";
import ProductSlider from "@/components/ProductSlider";
import Testimonial from "@/components/Testimonial";
import PremiumFinishes from "@/components/PremiumFinishes";

export default function Home() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-main-color">
      {/* Hero Section */}
      <HeroSection />
      <PackagingGallery />
      <PremiumFinishes />
      <PackagingFeatures />
      <ContactForm />
     <Testimonial />
      <ProductSlider />
      <Trusted />
    </div>
  );
}
