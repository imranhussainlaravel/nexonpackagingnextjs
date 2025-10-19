"use client";
import useApi from "@/usehook/useApiHook";
import { useState } from "react";
import SubmissionModal from "./SubmissionModal";
import Link from "next/link";
import { usePathname } from 'next/navigation';

// Icon Components
const ProductIcon = ({ className = "w-5 h-5" }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
    </svg>
);

const UserIcon = ({ className = "w-5 h-5" }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
);

const EmailIcon = ({ className = "w-5 h-5" }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
);

const PhoneIcon = ({ className = "w-5 h-5" }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
    </svg>
);

const QuantityIcon = ({ className = "w-5 h-5" }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
    </svg>
);

const ColorIcon = ({ className = "w-5 h-5" }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z" />
    </svg>
);

const SizeIcon = ({ className = "w-5 h-5" }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
    </svg>
);

const NoteIcon = ({ className = "w-5 h-5" }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
    </svg>
);

const CheckIcon = ({ className = "w-3 h-3" }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
    </svg>
);

const LoadingIcon = ({ className = "w-4 h-4" }) => (
    <svg className={`${className} animate-spin`} fill="none" viewBox="0 0 100 101" xmlns="http://www.w3.org/2000/svg">
        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="#E5E7EB"/>
    </svg>
);

const StarIcon = ({ className = "w-5 h-5" }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
);

const ShieldIcon = ({ className = "w-5 h-5" }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>
);

const TruckIcon = ({ className = "w-5 h-5" }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l2.414 2.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
    </svg>
);

const QuoteIcon = ({ className = "w-6 h-6" }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
);

// Custom Dropdown Component
const CustomDropdown = ({ options, value, onChange, placeholder, name }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(value || options[0] || "");

  const handleSelect = (option) => {
    setSelectedValue(option);
    setIsOpen(false);
    onChange({ target: { name, value: option } });
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative w-full">
      <button
        type="button"
        onClick={toggleDropdown}
        className="w-full px-6 py-3 h-[52px] rounded-full border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-customRed/20 focus:border-customRed bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white shadow-md transition-all duration-200 flex items-center justify-between hover:shadow-lg"
      >
        <span className="text-left">{selectedValue || placeholder}</span>
        <svg
          className={`w-4 h-4 text-gray-900 dark:text-white transition-transform duration-200 ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Dropdown Menu */}
      <div
        className={`absolute top-full left-0 right-0 mt-0.5 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg shadow-lg z-50 overflow-hidden transition-all duration-200 ${
          isOpen
            ? "opacity-100 visible transform translate-y-0"
            : "opacity-0 invisible transform -translate-y-1"
        }`}
      >
        <div className="max-h-32 overflow-y-auto custom-scrollbar">
          {options.map((option, index) => (
            <button
              key={index}
              type="button"
              onClick={() => handleSelect(option)}
              className={`w-full px-3 py-2 text-left text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-150 flex items-center justify-between text-sm ${
                selectedValue === option ? "bg-customRed/10 text-customRed dark:text-customRed" : ""
              }`}
            >
              <span>{option}</span>
              {selectedValue === option && (
                <svg className="w-3 h-3 text-customRed" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
};

export default function SingleProduct({ data }) {
    const pathName = usePathname()
  const [mainImage, setMainImage] = useState(data.images[0]);
  const [expanded, setExpanded] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    quantity: "",
    product: "",
    color: "1 color",
    length: "",
    width: "",
    depth: "",
    unit: "Inch",
    note: "",
  });

  const [errors, setErrors] = useState({});
  const [modalOpen, setModalOpen] = useState(false);
  const [loader, setLoader] = useState(false);
  const { sendEmail } = useApi()

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (["phone", "email", "name"].includes(name)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: value.trim() ? "" : "This field is required",
      }));
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    let newErrors = {};

    Object.keys(formData).forEach((key) => {
      if (formData[key].trim() === "" && (key === 'email' || key === 'name' || key === 'phone' || key === 'product')) {
        newErrors[key] = "This field is required";
      }
    });

    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      sendEmail_cat()
    }
  };

  const sendEmail_cat = async () => {
    setLoader(true)
    const payload = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      product_name: formData.product,
      quantity: formData.quantity,
      color: formData.color,
      length: formData.length,
      width: formData.width,
      depth: formData.depth,
      measurement_unit: formData.unit,
      description: formData.note,
       url: 'https://nexonpackaging.com' + pathName,
    }
    const apiResponse = await sendEmail(payload);

    if (apiResponse.status === 200) {
      setModalOpen(true)
      setLoader(false)
      reset()
    }
  };

  const reset = () => {
    setFormData({
      name: "",
      email: "",
      phone: "",
      quantity: "",
      product: "",
      color: "Red",
      length: "",
      width: "",
      depth: "",
      unit: "Inch",
      note: "",
    });
  }

  return (
    <>
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(0, 0, 0, 0.1);
          border-radius: 2px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(0, 0, 0, 0.2);
        }
        .dark .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.1);
        }
        .dark .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.2);
        }
      `}</style>
      <section className="dark:bg-gray-900 bg-white min-h-screen">
      <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 px-4 sm:px-6 lg:px-8 py-10 max-w-screen-2xl mx-auto">
            {/* Left - Product Section with Equal Height */}
            <div className="lg:col-span-2 flex flex-col h-full">
              {/* Product Header */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 mb-6 shadow-lg border border-gray-100 dark:border-gray-700">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-customRed rounded-full flex items-center justify-center">
                    <ProductIcon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{data.title}</h1>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <StarIcon key={i} className="w-4 h-4 text-yellow-400" />
                        ))}
                      </div>
                      <span className="text-sm text-gray-600 dark:text-gray-400">Premium Quality</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Enhanced Image Gallery */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg mb-6 flex-1 border border-gray-100 dark:border-gray-700">
                <div className="flex flex-col lg:flex-row gap-6 h-full">
                  {/* Thumbnails */}
                  <div className="flex lg:flex-col gap-3 overflow-x-auto lg:overflow-x-visible pb-2 lg:pb-0">
                {data.images.map((img, index) => (
                      <div
                        key={index}
                        className={`relative group cursor-pointer transition-all duration-300 ${
                          mainImage === img ? "ring-2 ring-customRed ring-offset-2" : ""
                        }`}
                        onClick={() => setMainImage(img)}
                      >
                        <img
                    src={img}
                    alt={data.alt_name}
                          className="w-20 h-20 lg:w-24 lg:h-24 rounded-xl object-cover border-2 border-gray-200 dark:border-gray-600 hover:border-customRed transition-colors"
                        />
                        {mainImage === img && (
                          <div className="absolute inset-0 bg-customRed/20 rounded-xl flex items-center justify-center">
                            <div className="w-6 h-6 bg-customRed rounded-full flex items-center justify-center">
                              <CheckIcon className="w-4 h-4 text-white" />
                            </div>
                          </div>
                        )}
                      </div>
                ))}
              </div>

              {/* Main Image */}
                  <div className="flex-1 bg-gray-50 dark:bg-gray-700 rounded-2xl p-4 flex items-center justify-center min-h-[400px]">
                <img
                  src={mainImage}
                  alt="Product"
                      className="max-w-full max-h-[500px] object-contain rounded-xl shadow-lg"
                    />
                  </div>
                </div>
              </div>

              {/* Product Features */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-md flex items-center gap-3 border border-gray-100 dark:border-gray-700">
                  <div className="w-10 h-10 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                    <ShieldIcon className="w-5 h-5 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">Premium Quality</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Made in USA</p>
                  </div>
                </div>
                
                <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-md flex items-center gap-3 border border-gray-100 dark:border-gray-700">
                  <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                    <TruckIcon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">Fast Delivery</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Quick turnaround</p>
                  </div>
                </div>
                
                <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-md flex items-center gap-3 border border-gray-100 dark:border-gray-700">
                  <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center">
                    <StarIcon className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">Custom Design</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Fully customizable</p>
                  </div>
              </div>
            </div>

              {/* Enhanced Product Description */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg flex-1 border border-gray-100 dark:border-gray-700">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <NoteIcon className="w-5 h-5 text-customRed" />
                  Product Description
                </h3>
                <div className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  <p>
                    {expanded ? data.description : `${data.description.substring(0, 300)}...`}
                  </p>
                <button
                    className="text-customRed hover:text-red-600 ml-2 font-semibold transition-colors flex items-center gap-1 mt-2"
                  onClick={() => setExpanded(!expanded)}
                >
                    {expanded ? (
                      <>
                        <span>Read Less</span>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                        </svg>
                      </>
                    ) : (
                      <>
                        <span>Read More</span>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </>
                    )}
                </button>
                </div>
              </div>
            </div>

            {/* Right - Enhanced Custom Quote Form with Equal Height */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-xl border border-gray-100 dark:border-gray-700 h-full flex flex-col">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-customRed to-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <QuoteIcon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 flex items-center justify-center gap-3">
                  <QuoteIcon className="w-6 h-6 text-customRed" />
                  Get Custom Quote
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">Fill out the form below and we'll get back to you with a competitive quote</p>
          </div>

              <form onSubmit={handleSubmit} className="space-y-4 flex-1 flex flex-col">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { name: "name", placeholder: "Your Name" },
                  { name: "email", placeholder: "Your Email", type: "email" },
                  { name: "phone", placeholder: "Your Phone" },
                  { name: "quantity", placeholder: "Quantity", type: "number" },
                  { name: "product", placeholder: "Product Name" },
                ].map((field) => (
                  <div key={field.name}>
                    <input
                      type={field.type || "text"}
                      name={field.name}
                      placeholder={field.placeholder}
                      onChange={handleChange}
                      value={formData[field.name] || ""}
                        className={`w-full px-[24px] py-0 rounded-bordercustom leading-custom bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white shadow-custom transition focus-visible:outline-none appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none`}
                    />
                    {errors[field.name] && (
                      <p className="text-red-500 text-sm mt-1">{errors[field.name]}</p>
                    )}
                  </div>
                ))}
                  <CustomDropdown
                    name="color"
                    options={["1 color", "2 color", "3 color", "4 color", "4/1 color", "4/2 color", "4/3 color", "4/4 color"]}
                    value={formData.color}
                    onChange={handleChange}
                    placeholder="Select Color"
                  />
              </div>

              {/* Dimension Inputs */}
              <div className="grid grid-cols-4 gap-2">
                {["length", "width", "depth"].map((dim) => (
                  <div key={dim}>
                    <input
                      type="text"
                      name={dim}
                      value={formData[dim] || ""}
                      placeholder={dim.charAt(0).toUpperCase()}
                      onChange={handleChange}
                      className={`w-full px-[24px] py-0 leading-custom focus-visible:outline-none rounded-bordercustom ${errors[dim]
                        ? "border-red-500"
                        : "border-gray-300 dark:border-gray-600"
                          } bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white shadow-custom transition`}
                    />
                    {errors[dim] && (
                      <p className="text-red-500 text-sm mt-1">{errors[dim]}</p>
                    )}
                  </div>
                ))}
                  <CustomDropdown
                    name="unit"
                    options={["Inch", "Cm", "Mm"]}
                    value={formData.unit}
                    onChange={handleChange}
                    placeholder="Select Unit"
                  />
              </div>

              {/* Note Section */}
              <textarea
                name="note"
                placeholder="Write Note"
                rows="2"
                value={formData.note}
                onChange={handleChange}
                  className="w-full px-[24px] py-0 leading-custom focus-visible:outline-none rounded-bordercustom border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white shadow-custom transition"
                />

                {/* Consent Section */}
                <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-3">
                  <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    id="smsConsent22"
                    className="peer hidden"
                  />
                  <label
                    htmlFor="smsConsent22"
                      className="w-5 h-5 inline-block rounded-full border-2 border-gray-400 peer-checked:bg-customRed peer-checked:border-customRed flex items-center justify-center transition-colors duration-200 cursor-pointer flex-shrink-0 mt-0.5"
                    >
                      <CheckIcon className="w-3 h-3 text-white opacity-0 peer-checked:opacity-100 transition-opacity duration-200" />
                  </label>
                    <label htmlFor="smsConsent22" className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed cursor-pointer">
                    I consent to receive SMS messages from{" "}
                      <strong className="text-gray-900 dark:text-white">NexOn Packaging</strong> related to Packages at the phone number provided above. The SMS frequency may vary. Data rates may apply. For assistance reply HELP. Reply STOP to opt out.{" "}
                      <Link href='/privacy-policy' className="text-customRed hover:text-red-600 font-medium">
                      Privacy Policy
                    </Link>
                  </label>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                  className="w-full bg-customRed hover:bg-customRed text-white focus-visible:outline-none font-semibold px-[24px] py-0 leading-custom rounded-bordercustom shadow-custom transition max-w-[40%] mt-auto"
              >
                {loader ? (
                  <>
                    <svg aria-hidden="true" role="status" className="inline mr-3 w-4 h-4 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB"></path>
                      <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"></path>
                    </svg>
                  </>
                ) : (
                  "Submit"
                )}
              </button>
                
                {/* Trust Indicators */}
                <div className="text-center space-y-2">
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    🔒 Your information is secure and will never be shared
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    ⚡ We typically respond within 24 hours
                  </p>
                </div>
            </form>
          </div>
        </div>
      </div>
      <SubmissionModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </section>
    </>
  );
}