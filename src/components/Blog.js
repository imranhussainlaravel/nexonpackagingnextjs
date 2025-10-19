"use client";
import useApi from "@/usehook/useApiHook";
import Image from "next/image";
import { useEffect, useState } from "react";
import Slider from "react-slick";
import { useRouter } from "next/navigation";

// Slick Slider Settings
const settings = {
  dots: false,
  infinite: true,
  speed: 1000,
  arrows: false,
  slidesToShow: 1,
  slidesToScroll: 1,
  fade: true,
  autoplay: true,
  autoplaySpeed: 3000,
};

export default function Blog() {
  const { get_all_blogs } = useApi();
  const [Listing, setListing] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const blogListing = async () => {
      const data = await get_all_blogs();
      setListing(data.blogs);
      setTimeout(() => setLoading(false), 500); // Delay before showing content for smooth transition
    };
    blogListing();
  }, []);

  const openBlogDetailPage = (route) => {
    router.push(route);
  };

  return (
    <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white min-h-screen overflow-hidden">
      
      {/* Blog Slider */}
      <div className="w-full mx-auto overflow-hidden">
        {loading ? (
          <div className="relative w-full h-[400px] bg-gray-300 dark:bg-gray-700 animate-pulse rounded-2xl transition-all duration-500 ease-in-out opacity-0 animate-fadeIn" />
        ) : (
          <Slider {...settings}>
            {Listing.slice(0, 5).map((blog) => (
              <div key={blog.id} className="relative w-full h-[400px] overflow-hidden opacity-0 animate-fadeIn">
                <Image
                  src={blog.image}
                  alt={blog.title}
                  width={800}
                  height={500}
                  className="w-full h-full object-cover rounded-2xl"
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center text-center">
                  <h2 className="text-2xl font-bold text-white">{blog.title}</h2>
                </div>
              </div>
            ))}
          </Slider>
        )}
      </div>

      {/* Blog Listing Section */}
      <div className="max-w-7xl mx-auto px-6 py-10">
        <h2 className="text-3xl font-semibold mb-6 text-center">Latest Blog Posts</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {loading
            ? Array.from({ length: 6 }).map((_, index) => (
                <div
                  key={index}
                  className="p-6 bg-gray-300 dark:bg-gray-700 rounded-2xl shadow-md animate-pulse opacity-0 animate-fadeIn transition-all duration-500"
                >
                  <div className="w-full h-[200px] bg-gray-400 dark:bg-gray-600 rounded-lg transition-all duration-500" />
                  <div className="h-6 w-3/4 bg-gray-400 dark:bg-gray-600 mt-4 rounded transition-all duration-500" />
                  <div className="h-4 w-1/2 bg-gray-400 dark:bg-gray-600 mt-2 rounded transition-all duration-500" />
                </div>
              ))
            : Listing.map((blog) => (
                <div
                  key={blog.id}
                  className="as-link p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-custom overflow-hidden transition-all duration-500 hover:shadow-custom hover:scale-105 opacity-0 animate-fadeIn"
                  onClick={() => openBlogDetailPage(`/blog/${blog.id}`)}
                >
                  <Image
                    src={blog.image}
                    alt={blog.title}
                    width={500}
                    height={300}
                    className="w-full h-[200px] object-contain rounded-2xl"
                  />
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{blog.title}</h3>
                  </div>
                </div>
              ))}
        </div>
      </div>
    </div>
  );
}
