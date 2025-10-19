"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import useApi from "@/usehook/useApiHook";

export default function Portfolio() {
  const [portfolio, setPortfolio] = useState([]);
  const [loading, setLoading] = useState(true);
  const { get_portfolio } = useApi();

  useEffect(() => {
    getPort();
  }, []);

  const getPort = async () => {
    const apiResponse = await get_portfolio();
    setPortfolio(apiResponse.portfolios);
    setTimeout(() => setLoading(false), 500); // Smooth delay before content appears
  };

  return (
    <section className="bg-white dark:bg-gray-900 py-12">
      <div className="container max-w-screen-xl mx-auto text-center px-4">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
          Your Trusted Partner for Custom Printing & Packaging
        </h2>
        <p className="mt-2 text-lg max-w-2xl mx-auto text-gray-600 dark:text-white">
         Nexon Packaging offers high-quality custom boxes using eco-friendly materials and advanced printing. We provide reliable, affordable solutions for orders of any size, helping your brand stand out.
        </p>

        {/* Image Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-4 gap-6 mt-8">
          {loading
            ? Array.from({ length: 8 }).map((_, index) => (
                <div
                  key={index}
                  className="bg-gray-300 dark:bg-gray-700 rounded-3xl shadow-md animate-pulse w-full h-[300px] transition-all duration-500 ease-in-out opacity-0 animate-fadeIn"
                />
              ))
            : portfolio.length > 0
            ? portfolio.map((image) => (
                <div
                  key={image.id}
                  className="bg-white dark:bg-gray-800 rounded-3xl shadow-custom dark:shadow-md dark:border dark:border-gray-700 transition duration-500 transform hover:scale-105 opacity-0 animate-fadeIn overflow-hidden"
                >
                  <Image
                    src={image.image}
                    alt="Portfolio Image"
                    width={400}
                    height={400}
                    className="w-full h-[300px] object-contain rounded-2xl transition duration-300 hover:scale-105"
                  />
                </div>
              ))
            : !loading && (
                <p className="text-lg text-gray-600 dark:text-white col-span-full">No portfolio available.</p>
              )}
        </div>
      </div>
    </section>
  );
}
