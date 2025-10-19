'use client'
import { FaBox, FaTags, FaTruck, FaGift, FaPaintBrush } from "react-icons/fa";

const features = [
  { id: 1, icon: FaBox, title: "No Die & Plate Charges" },
  { id: 2, icon: FaTruck, title: "Quick Turnaround Time" },
  { id: 3, icon: FaGift, title: "Free Shipping" },
  { id: 4, icon: FaBox, title: "Starting from 50 Boxes" },
  { id: 5, icon: FaTags, title: "Customize Size & Style" },
  { id: 6, icon: FaPaintBrush, title: "Free Design Support" },
];

export default function PackagingFeatures() {
  return (
    <section className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white py-12">
      <div className="container max-w-screen-xl mx-auto text-center px-4">
        <h2 className="text-3xl font-bold">ONE PLACE TO GET YOUR CUSTOM PACKAGING</h2>
        <p className="text-gray-600 dark:text-white mt-2 md:text-lg lg:text-lg max-w-3xl mx-auto">
          NexOn Packaging offers a variety of custom packaging solutions and project assistance with pricing and service you'll love.
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-6 lg:grid-cols-6 xl:grid-cols-6 2xl:grid-cols-6 gap-6 mt-8">
          {features.map((feature) => (
            <div
              key={feature.id}
              className="flex flex-col items-center p-5 bg-white dark:bg-gray-900 "
            >
              <div className="w-16 h-16 flex items-center justify-center bg-customRed dark:bg-customRed rounded-full mb-4 text-white text-2xl shadow-md">
                <feature.icon size={30} />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{feature.title}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
