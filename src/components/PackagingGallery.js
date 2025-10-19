"use client";
import { ShopContext } from "@/context/ShopContext";
import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import { FaBox, FaTags, FaTruck, FaGift } from "react-icons/fa";
import { useRouter } from "next/navigation"; 
import { formatString } from "./CommonFuntion";

const images = [
  {
    id: 1,
    src: "https://flowbite.s3.amazonaws.com/blocks/marketing-ui/hero/phone-mockup.png",
    alt: "Black Box Packaging",
    name: "Rigid Boxes",
  },
  {
    id: 2,
    src: "https://flowbite.s3.amazonaws.com/blocks/marketing-ui/hero/phone-mockup.png",
    alt: "Transparent Lid Boxes",
    name: "Labels & Stickers",
  },
  {
    id: 3,
    src: "https://flowbite.s3.amazonaws.com/blocks/marketing-ui/hero/phone-mockup.png",
    alt: "Custom Carry Boxes",
    name: "Custom Carry Boxes",
  },
  {
    id: 4,
    src: "https://flowbite.s3.amazonaws.com/blocks/marketing-ui/hero/phone-mockup.png",
    alt: "Gradient Gift Box",
    name: "Gradient Gift Box",
  },
];

const services = [
  {
    id: 1,
    icon: <FaBox size={30} />,
    title: "Packaging Audit",
    description:
      "Identify and analyze your current packaging and spot areas of improvement for your packaging.",
  },
  {
    id: 2,
    icon: <FaTags size={30} />,
    title: "Packaging Strategy",
    description:
      "Collaborate and develop a tailored packaging strategy with our specialists to meet your needs and goals.",
  },
  {
    id: 3,
    icon: <FaTruck size={30} />,
    title: "Cost Optimization",
    description:
      "Save more on your custom packaging with cost-optimized strategies like material alternatives, reduction, and supply chain optimization.",
  },
  {
    id: 4,
    icon: <FaGift size={30} />,
    title: "Supply Chain Optimization",
    description:
      "Analyze and improve your existing supply chain for the most efficient procurement network.",
  },
];

export default function PackagingGallery() {
    const { categories } = useContext(ShopContext);
    const router = useRouter();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      // Add delay only if categories exist (simulate fetch time)
      if (categories?.length > 0) {
        const timeout = setTimeout(() => setLoading(false), 500);
        return () => clearTimeout(timeout);
      } else {
        setLoading(false);
      }
    }, [categories]);

    const goToPage = (route) => {
      router.push(route); // Navigates to /about
  };
  return (
    <section className="bg-white dark:bg-gray-900 py-12">
      <div className="container max-w-screen-xl mx-auto text-center px-4">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Your Trusted Partner for Custom Printing & Packaging</h2>
        <p className="mt-2 text-lg max-w-2xl mx-auto text-gray-600 dark:text-white">
        Nexon Packaging delivers high-quality custom boxes using advanced printing and eco-friendly materials. We offer reliable, affordable packaging solutions tailored to your brand's needs.
        </p>

        {/* Image Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-4 gap-6 mt-8">
          {loading
            ? Array.from({ length: 8 }).map((_, index) => (
                <div
                  key={index}
                  className="bg-gray-300 dark:bg-gray-700 rounded-2xl shadow-md animate-pulse w-full h-[300px] opacity-0 animate-fadeIn"
                />
              ))
            : categories?.length > 0
            ? categories.map((image) => (
                <div
                  key={image.id}
                  className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-custom dark:shadow-custom dark:border dark:border-gray-700 transition duration-300 transform hover:scale-105  cursor-pointer opacity-0 animate-fadeIn"
                  onClick={() => goToPage(`/category/${formatString(image.title)}`)}
                >
                  <Image
                    src={image.main_img}
                    alt={image.alt_name}
                    width={300}
                    height={300}
                    className="w-full rounded-lg transition duration-300 hover:scale-105 "
                  />
                  <h3 className="mt-4 text-lg font-semibold text-gray-900 dark:text-white group-hover:text-customRed ">
                    {image.title}
                  </h3>
                </div>
              ))
            : !loading && (
                <p className="text-lg text-gray-600 dark:text-white col-span-full">No categories found.</p>
              )}
        </div>

        {/* Services Grid */}
        <div style={{
          paddingTop:'3rem'
        }}>
        <h2 className="text-3xl  font-bold text-center dark:text-white">Why Choose Us</h2>
     
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-4 gap-6 mt-12">
          {services.map((service) => (
            <div
              key={service.id}
              className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-custom dark:shadow-md dark:border dark:border-gray-700 transition duration-300 transform hover:scale-105 hover:shadow-custom text-center"
            >
              <div className="text-customRed dark:text-customRed mb-4 flex justify-center items-center">
                {service.icon}
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{service.title}</h3>
              <p className="sm:text-[12px] md:text-[14px] lg:text-[16px] text-gray-600 dark:text-white mt-2 text-left">
                {service.description}
              </p>
            </div>
          ))}
        </div>
        </div>
      </div>
    </section>
  );
}
