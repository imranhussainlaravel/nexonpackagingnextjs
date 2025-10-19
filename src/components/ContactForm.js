"use client";
import { useState } from "react";
import useApi from "@/usehook/useApiHook";
import Image from "next/image";
import SubmissionModal from "./SubmissionModal";
import Link from "next/link";
import { usePathname } from 'next/navigation';

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


export default function ContactForm() {
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
  const pathName = usePathname()
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
      // alert('')
      // successMessage(apiResponse.message)
      // errorMessage(apiResponse.message)
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
      <section className=" bg-gray-100 dark:bg-gray-900 px-6 py-12 px-0 scroll-mt-24" id="quote" >

      <div className="container flex flex-col lg:flex-row items-center justify-around mx-auto">
        {/* Left Image Section */}
        <div className="lg:w-1/3 flex">
          <Image
            src="https://images.nexonpackaging.com/form-side-img.webp"
            alt="Product"
            width={400}  // Adjust based on your layout
            height={300} // Adjust based on your layout
            className="rounded-lg w-full max-w-md object-cover"
          />
        </div>

        {/* Right Form Section */}
        <div className="lg:w-2/3 w-full max-w-2xl mt-10 lg:mt-0">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white text-center mb-6">
            Get a Quote
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
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

                    className={`w-full px-[24px] py-0 rounded-bordercustom leading-custom   bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white shadow-custom transition focus-visible:outline-none appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none`}
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
                      } bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white shadow-custom  transition`}
                  />
                  {errors[dim] && (
                    <p className="text-red-500 text-sm mt-1">{errors[dim]}</p>
                  )}
                </div>
              ))}
              {/* <input
                type="text"
                name="unit"
                // value="Inches"
                value={formData.unit}
                onChange={handleChange}
                className="w-full px-[24px] py-0 leading-custom focus-visible:outline-none rounded-bordercustom border border-gray-300 dark:border-gray-600 bg-gray-300 dark:bg-gray-700 text-gray-900 dark:text-white shadow-custom "
              /> */}
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
              className="w-full px-[24px] py-0 leading-custom focus-visible:outline-none rounded-bordercustom  border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white shadow-custom  transition"
            />

            <div className="flex items-start gap-3 mt-4 text-xs dark:text-gray-300 text-gray-600">
              {/* Hidden Checkbox */}
              <input
                type="checkbox"
                id="smsConsent"
                className="peer hidden"

              />

              {/* Custom Styled Checkbox (Round with Red Tick) */}
              <label
                htmlFor="smsConsent"
                className="w-5 h-5 inline-block rounded-full border-2 border-gray-400 peer-checked:bg-red-500 peer-checked:border-red-500 flex items-center justify-center transition-colors duration-200 cursor-pointer"
              >
                <svg
                  className="w-3 h-3 text-white opacity-0 peer-checked:opacity-100 transition-opacity duration-200"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={3}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </label>

              {/* Consent Text */}
              <label htmlFor="smsConsent" className="leading-snug cursor-pointer">
                I consent to receive SMS messages from{" "}
                <strong className="dark:text-white text-black">NexOn Packaging</strong> related to Packages at the phone number provided above. The SMS frequency may vary. Data rates may apply. For assistance reply HELP. Reply STOP to opt out.
                <Link href='/privacy-policy' target="_blank"
  rel="noopener noreferrer" className="text-customRed  ml-1">
                  Privacy Policy
                </Link>
              </label>
            </div>


            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-customRed hover:bg-customRed text-white focus-visible:outline-none font-semibold px-[24px] py-0 leading-custom rounded-bordercustom shadow-custom transition max-w-[40%]"
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
          </form>
        </div>
      </div>
      <SubmissionModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </section>
    </>
  );
}
