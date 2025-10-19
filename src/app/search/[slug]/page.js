"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import useApi from "@/usehook/useApiHook";
import { convertHyphenToSpace, formatString } from "@/components/CommonFuntion";

export default function SearchListing() {
  const { search } = useApi();
  const [searchListing, setSearchListing] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const params = useParams();

  useEffect(() => {
    if (params?.slug) {
      searchApi();
    }
  }, [params?.slug]);

  const searchApi = async () => {
    const { slug } = params;
    const payload = {
      search: convertHyphenToSpace(slug),
    };

    const newData = await search(payload);
    setSearchListing(newData.data);
    setTimeout(() => setLoading(false), 500); // Smooth transition
  };

  const goToPage = (route) => {
    router.push(route);
  };

  return (
    <section className="bg-white dark:bg-gray-900 py-12">
      <div className="container max-w-screen-xl mx-auto text-center px-4">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Search Results
        </h1>
        <p className="mt-2 text-lg max-w-2xl mx-auto text-gray-600 dark:text-white">
          for the keyword "{convertHyphenToSpace(params?.slug)}"
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
            : searchListing.length > 0
            ? searchListing.map((image) => (
                <div
                  key={image.id}
                  className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-custom dark:shadow-custom dark:border dark:border-gray-700 transition duration-300 transform hover:scale-105 hover:shadow-custom as-link opacity-0 animate-fadeIn"
                  onClick={() => {
                    goToPage(`/product/${formatString(image.title)}`);
                  }}
                >
                  <Image
                    src={image.image_1}
                    alt={image.alt_name}
                    width={300}
                    height={300}
                    className="w-full rounded-lg transition duration-300 hover:scale-105"
                  />
                  <h3 className="mt-4 text-lg font-semibold text-gray-900 dark:text-white">
                    {image.title}
                  </h3>
                </div>
              ))
            : !loading && (
                <p className="text-lg text-gray-600 dark:text-white col-span-full">No results found.</p>
              )}
        </div>
      </div>
    </section>
  );
}
