"use client";
import Image from "next/image";
import { FaCheckDouble, FaBoxes, FaMedal, FaUserTie, FaArrowsAlt, FaDraftingCompass, FaHeadset } from "react-icons/fa";
import { GiPaintRoller } from "react-icons/gi";

export default function BrandsSection() {
  return (
    <section className="bg-white dark:bg-gray-900 py-12">
      <div className="container mx-auto px-6 lg:px-20 flex flex-col lg:flex-row items-center mt-3">
        {/* Text Section */}
        <div className="w-full lg:w-1/2">
          <h2 className="text-2xl lg:text-3xl font-semibold text-gray-900 dark:text-gray-100">
            For small businesses
          </h2>
          <p className="mt-2 text-gray-600 dark:text-white">
            Hassle-free solutions that make it easy to transform the unboxing experience.
          </p>

          <div className="mt-6 mb-6 space-y-6">
            <FeatureItem icon={<FaBoxes size={30} />} title="Low minimums" description="Get started with as little as 100 units of packaging, perfect for testing new concepts and running seasonal campaigns." />
            <FeatureItem icon={<GiPaintRoller size={30} />} title="Fully customizable" description="Whether you just need a logo printed on your box or prefer beautiful patterns inside and out, customize your packaging any way you'd like." />
            <FeatureItem icon={<FaMedal size={30} />} title="High quality & affordable" description="Get access to a range of high-quality, durable packaging that elevates the value of your products without costing a fortune." />
            <FeatureItem icon={<FaUserTie size={30} />} title="Tailored recommendations" description="We’ll provide guidance along the way and recommend the best solutions that are tailored to your specific product and brand vision." />
          </div>
        </div>

        {/* Image Section */}
        <div className="w-full lg:w-1/2 mb-8 lg:mb-0">
          <Image
            src="https://images.nexonpackaging.com/small-bussiness.webp"
            alt="Packaging Solutions"
            width={600}
            height={400}
            className="rounded-lg shadow-lg"
          />
        </div>
      </div>

      <div className="container mx-auto px-6 lg:px-20 flex flex-col flex-col-reverse  lg:flex-row items-center">
        {/* Image Section */}
        <div className="w-full  lg:w-1/2 mb-8 lg:mb-0">
          <Image
            src="https://images.nexonpackaging.com/large-bussiness.webp"
            alt="Packaging Solutions"
            width={600}
            height={400}
            className="rounded-lg shadow-lg"
          />
        </div>

        {/* Text Section */}
        <div className="w-full lg:w-1/2 lg:pl-12">
          <h2 className="text-2xl lg:text-3xl font-semibold text-gray-900 dark:text-gray-100">
            For growing brands & enterprises
          </h2>
          <p className="mt-2 text-gray-600 dark:text-white">
            Robust solutions and dedicated support that scale with your growth.
          </p>

          <div className="mt-6 mb-6 space-y-6">
            <FeatureItem icon={<FaCheckDouble size={30} />} title="Quality assurance" description="From designers and prepress technicians to operators and quality control inspectors, all parties work in harmony..." />
            <FeatureItem icon={<FaArrowsAlt size={30} />} title="Scalability & reliability" description="Whether you need 500 or 500,000 units produced, our production capacity..." />
            <FeatureItem icon={<FaDraftingCompass size={30} />} title="Packaging engineering" description="Our team of engineers can help you develop custom packaging structures..." />
            <FeatureItem icon={<FaHeadset size={30} />} title="Dedicated account manager" description="Get priority support, one-on-one expert guidance, and ongoing consulting..." />
          </div>
        </div>
      </div>
    </section>
  );
}

// Reusable Feature Item Component
const FeatureItem = ({ icon, title, description }) => (
  <div className="flex items-start space-x-4">
    <div className="text-customRed dark:text-customRed flex-shrink-0">
      {icon}
    </div>
    <div>
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{title}</h3>
      <p className="text-gray-600 dark:text-white">{description}</p>
    </div>
  </div>
);

