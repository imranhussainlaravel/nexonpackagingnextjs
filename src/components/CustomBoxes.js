"use client";
import Image from "next/image";
import LogoSlider from "./LogoSlider";

export default function CustomBoxes({ data }) {
  return (
    <section className="dark:bg-gray-900 bg-white transition-colors duration-300">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center px-4 sm:px-6 lg:px-8 py-10 max-w-screen-xl mx-auto">
          
          {/* Left - Text Content */}
          <div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              {data.title_2}
            </h2>
            <p className="text-gray-600 dark:text-white mt-3">
              {data.description_2}
            </p>

            {/* Company Logos Infinite Slider */}
            <div className="mt-6 overflow-hidden w-full">
              <LogoSlider />
            </div>

            <h3 className="mt-6 text-lg font-bold text-gray-600 dark:text-white">What We Give</h3>

            {/* Features */}
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-6">
              {[
                { number: "1", title: "Design", description: "Get your custom boxes made in the required size, shape, and style." },
                { number: "2", title: "Print", description: "Upload your artwork and get it superbly printed the way you want." },
                { number: "3", title: "Get it done", description: "Order any quantity, enjoy a wholesale price, pay no extra for die plates." }
              ].map((feature, index) => (
                <div key={index} className="text-center">
                  <div className={`w-12 h-12 mx-auto flex items-center justify-center ${
                    index === 2 ? "bg-gray-800" : "bg-customRed"
                  } text-white rounded-full text-lg font-bold`}>
                    {feature.number}
                  </div>
                  <h4 className="mt-2 font-semibold text-gray-900 dark:text-white">{feature.title}</h4>
                  <p className="text-gray-600 dark:text-white text-sm">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right - Product Image */}
          <div className="flex justify-center">
            <Image 
              src={data.image_5}
              alt="Custom Gable Box" 
              width={512} 
              height={512} 
              className="w-[32rem] h-auto object-contain"
            />
          </div>

        </div>
      </div>
    </section>
  );
}
