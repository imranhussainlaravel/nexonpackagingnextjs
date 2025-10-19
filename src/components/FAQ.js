"use client";
import { useState } from "react";
import { FaChevronDown } from "react-icons/fa";

// const faqs = [
//   {
//     question: "How do I accurately measure the Kraft box dimensions?",
//     answer: "Measure the length, width, and height of the box using a ruler or measuring tape."
//   },
//   {
//     question: "How thick is the Kraft corrugated cardboard?",
//     answer: "The thickness varies depending on the type, but it generally ranges from 1mm to 4mm."
//   },
//   {
//     question: "Is there a minimum quantity for Kraft box orders?",
//     answer: "Yes, our minimum order quantity is 100 boxes per design."
//   },
//   {
//     question: "Can I review the file before it's sent to production?",
//     answer: "Yes, we provide digital proofs before finalizing production."
//   },
//   {
//     question: "Can I upload a print-ready file and have it manufactured as the box design?",
//     answer: "Absolutely! We accept print-ready files in PDF, AI, or PSD formats."
//   }
// ];

export default function FAQ({faqs}) {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="bg-white dark:bg-gray-900 p-6 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto"> 
            <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-6 text-center">
              FAQ's
            </h2>

            <div className="space-y-4 container mx-auto px-6 lg:px-20 py-12 ">
              {faqs.map((faq, index) => (
                <div key={index} className="bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md">
                  {/* Question Button */}
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="flex justify-between items-center w-full px-5 py-3 text-left text-gray-900 dark:text-gray-100 font-medium focus:outline-none"
                  >
                    {faq.question}
                    <FaChevronDown
                      className={`transform transition-transform duration-300 ${
                        openIndex === index ? "rotate-180" : "rotate-0"
                      }`}
                    />
                  </button>

                  {/* Answer Section with Smooth Max Height Animation */}
                  <div
                    className={`transition-all duration-500 ease-in-out overflow-hidden ${
                      openIndex === index ? "max-h-40 opacity-100 py-3" : "max-h-0 opacity-0"
                    }`}
                  >
                    <p className="px-5 text-gray-600 dark:text-gray-300">{faq.answer}</p>
                  </div>
                </div>
              ))}
            </div>
      </div>
    </section>
  );
}
