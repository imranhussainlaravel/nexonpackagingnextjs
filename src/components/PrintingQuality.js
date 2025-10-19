"use client";
import Image from "next/image";

export default function PrintingQuality() {
  return (
    <div className="bg-white dark:bg-gray-900 py-12">
      <div className="container mx-auto px-6 lg:px-16 max-w-screen-xl">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          
          {/* Left Side - Image (8 Columns) */}
          <div className="md:col-span-8 flex justify-center">
            <Image 
              src="https://images.nexonpackaging.com/image-of-digital-print.webp"
              alt="Offset Printing Quality"
              width={600} 
              height={400} 
              className="w-full h-auto object-cover"
            />
          </div>

          {/* Right Side - Text (4 Columns) */}
          <div className="md:col-span-4">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
              Unbeatable Quality with Offset Printing
            </h2>
            <p className="mt-4 text-gray-600 dark:text-white leading-relaxed">
              We use offset printers
              to ensure your branded packaging stands out. This method delivers sharp, 
              high-quality prints with vibrant colors, avoiding any <span className="font-semibold">"dotted"</span> looks.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}
