"use client";
import { ShopContext } from "@/context/ShopContext";
import Image from "next/image";
import { useContext } from "react";
import { FaBox, FaTags, FaTruck, FaGift } from "react-icons/fa";
import { useRouter } from "next/navigation"; 
import { formatString } from "./CommonFuntion";



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

export default function ProductListing({data}) {
    const { categories } = useContext(ShopContext);
    const router = useRouter();

    const goToPage = (route) => {
      router.push(route); // Navigates to /about
    };
  return (
    <section className="bg-white dark:bg-gray-900  py-12">
      <div className="container max-w-screen-xl mx-auto text-center px-4">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Custom {data?.category?.title}</h2>
        <p className="mt-2 text-lg max-w-2xl mx-auto text-gray-600 dark:text-white">
          We provide you the best packaging solutions with customized printed
          box service, which matches your industry and product-specific needs.
        </p>

        {/* Image Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-4 gap-6 mt-8">
          {data.products.map((image) => (
            <div
              key={image.id}
              className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-custom dark:shadow-custom dark:border dark:border-gray-700 transition duration-300 transform hover:scale-105 hover:shadow-custom as-link"
           onClick={()=>{
            goToPage(`/product/${formatString(image.title)}`)
           }} >
              <Image
                src={image.image_1}
                alt={image.alt_name}
                width={300}
                height={300}
                className="w-full rounded-lg transition duration-300 hover:scale-105"
              />
              <h3 className="mt-4 text-lg font-semibold text-gray-900 dark:text-white">{image.title}</h3>
             
            </div>
          ))}
        </div>

        {/* Services Grid */}
         <div style={{
          paddingTop:'3rem'
        }}>
        <h2 className="text-3xl font-bold text-black text-center dark:text-white">Why Choose Us</h2>
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
              <p className="text-base text-gray-600 dark:text-white mt-2">
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
