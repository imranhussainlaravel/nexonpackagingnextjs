import { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const categories = [
  {
    name: "Auto Parts",
    subcategories: ["Battery Boxes", "Engine Parts", "Car Accessories", "Cake Boxes"],
  },
  {
    name: "Bakery Boxes",
    subcategories: ["Cake Boxes", "Pastry Boxes", "Cookie Boxes", "Cake Boxes"],
  },
  {
    name: "Bakery Boxes",
    subcategories: ["Cake Boxes", "Pastry Boxes", "Cookie Boxes", "Cake Boxes"],
  },
  
];

const MobileAccordion = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="w-full text-black !mt-[3px]">
      {categories.map((category, index) => (
        <div key={index} className="border-b border-gray-700">
          <button
            onClick={() => toggleAccordion(index)}
            className="w-full flex justify-between items-center py-4 text-[14px] font-bold hover:text-customRed dark:text-white"
          >
            <span>{category.name}</span>
            {openIndex === index ? <FaChevronUp /> : <FaChevronDown />}
          </button>
          <div
            className={`overflow-hidden transition-all duration-300 ease-in-out ${openIndex === index ? "max-h-40" : "max-h-0"}`}
          >
            <ul className="pt-0 pr-3 pb-3 pl-3 space-y-2">
              {category.subcategories.map((sub, i) => (
                <li key={i} className="text-gray-900 text-[12px] font-semibold">{sub}</li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MobileAccordion;
