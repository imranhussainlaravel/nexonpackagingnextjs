"use client";
import Image from "next/image";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ShopContext } from "@/context/ShopContext";
import { useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { formatString } from "./CommonFuntion";

export default function ProductSlider() {
  const { allSliders } = useContext(ShopContext);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (allSliders?.length > 0) {
      const timeout = setTimeout(() => setLoading(false), 500);
      return () => clearTimeout(timeout);
    } else {
      setLoading(false);
    }
  }, [allSliders]);

  const settings = {
    dots: false,
    infinite: true,
    arrows: false,
    speed: 800,
    autoplay: true,
    autoplaySpeed: 2500,
    slidesToShow: 5,
    slidesToScroll: 1,
    swipeToSlide: true,
    touchThreshold: 10,
    responsive: [
      { breakpoint: 1536, settings: { slidesToShow: 5 } },
      { breakpoint: 1280, settings: { slidesToShow: 4 } },
      { breakpoint: 1024, settings: { slidesToShow: 3 } },
      { breakpoint: 640, settings: { slidesToShow: 2 } },
    ],
  };

  const goToPage = (route) => {
    router.push(route);
  };

  return (
    <section className="p-3 py-12 bg-white dark:bg-gray-900">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-8">
          Our Products
        </h2>

        {loading ? (
          <div className="flex space-x-4 overflow-hidden">
            {Array.from({ length: 5 }).map((_, index) => (
              <div
                key={index}
                className="w-64 h-80 bg-gray-300 dark:bg-gray-700 animate-pulse rounded-2xl"
              />
            ))}
          </div>
        ) : allSliders?.length > 0 ? (
          <Slider {...settings}>
            {allSliders.map((product, index) => (
              <div key={index} className="p-2 group">
                <div
                  className="w-full rounded-2xl bg-white dark:bg-gray-800 shadow-custom dark:shadow-custom dark:border dark:border-gray-700 transition duration-300 transform hover:scale-105 hover:shadow-custom overflow-hidden cursor-pointer opacity-0 animate-fadeIn"
                  onClick={() => goToPage(`/product/${formatString(product.title)}`)}
                >
                  {/* Image */}
                  <div className="h-64 w-full relative">
                    <Image
                      src={product.image_1}
                      alt={product.alt_name}
                      layout="fill"
                      objectFit="cover"
                      className="rounded-t-2xl transition duration-500"
                    />
                  </div>

                  {/* Title */}
                  <div className="p-4 text-center">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white truncate">
                      {product.title}
                    </h3>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        ) : (
          <p className="text-lg text-gray-600 dark:text-white">No products available.</p>
        )}
      </div>
    </section>
  );
}
