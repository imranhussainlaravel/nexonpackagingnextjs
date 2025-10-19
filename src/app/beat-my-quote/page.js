"use client";
import { useState, useRef } from "react";
import useApi from "@/usehook/useApiHook";
import Link from "next/link";
import SubmissionModal from "@/components/SubmissionModal";
import ProductSlider from "@/components/ProductSlider";

const steps = [
    {
        number: '1.',
        title: 'Choose Your Style',
        description: 'Select your box style from available range, from mailers to shippers and displays all are available here.',
    },
    {
        number: '2.',
        title: 'Choose your Size',
        description: 'Enter the box dimensions as per your product size to give it a perfect fit and ensure its ultimate protection.',
    },
    {
        number: '3.',
        title: 'Upload your Artwork',
        description: 'Upload your design your own brand logo, images, patterns and textures to give your box a personalized look.',
    },
];

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
        quoteDetails: "",
        deliveryCharges: "",
        otherCharges: "",
        smsConsent: false,
        fileUrl: "",
    });
    const [fileState, setFileState] = useState({
        fileName: "",
        isUploading: false,
    });
    const fileInputRef = useRef(null);

    const [errors, setErrors] = useState({});
    const [modalOpen, setModalOpen] = useState(false);
    const [loader, setLoader] = useState(false);
    const { beat_my_quote } = useApi();

    const validate = () => {
        const newErrors = {};
        const requiredFields = ["name", "email", "phone"];

        requiredFields.forEach(field => {
            if (!formData[field] || String(formData[field]).trim() === "") {
                newErrors[field] = "This field is required";
            }
        });

        if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = "Please enter a valid email address";
        }

        if (!formData.smsConsent) {
            newErrors.smsConsent = "You must consent to receive messages.";
        }

        setErrors(newErrors);
        return newErrors;
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        const val = type === "checkbox" ? checked : value;

        setFormData({ ...formData, [name]: val });

        if (errors[name]) {
            setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length === 0) {
            sendEmail_cat();
        }
    };

    const sendEmail_cat = async () => {
        setLoader(true);
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
            measurement_unit: formData.unit, // e.g., "cm", "inches", etc.
            description: formData.note,
            url: formData.fileUrl,
            quote_details: formData.quoteDetails,
            delivery_charges: formData.deliveryCharges,
            othercharges: formData.otherCharges,
        };


        const apiResponse = await beat_my_quote(payload);

        if (apiResponse.status === 200) {
            setModalOpen(true);
            setLoader(false);
            reset();
        } else {
            setLoader(false);
        }
    };

    const reset = () => {
        setFormData({
            name: "", email: "", phone: "", quantity: "", product: "",
            color: "1 color", length: "", width: "", depth: "",
            unit: "Inch", note: "", quoteDetails: "", deliveryCharges: "",
            otherCharges: "", smsConsent: false, fileUrl: '',
        });
        setErrors({});
    };

    const handleRemoveFile = () => {
        setFormData(prev => ({ ...prev, fileUrl: '' }));
        setFileState({ fileName: "", isUploading: false });
        if (fileInputRef.current) {
            fileInputRef.current.value = ""; // Reset the file input
        }
    }
    const inputClass = (field) =>
        `w-full px-[24px] py-0 rounded-bordercustom leading-custom bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white shadow-custom transition focus-visible:outline-none appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none ${errors[field] ? 'border border-red-500' : 'border-transparent'}`;

    const headingClass = "mb-2 dark:text-white text-black dark:font-bold";
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setFileState({ fileName: file.name, isUploading: true });
        setErrors(prev => ({ ...prev, file: '' })); // Clear previous file errors

        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = async () => {
            try {
                // The result includes the base64 prefix, e.g., "data:image/png;base64,iVBORw0KGgo..."
                const base64String = reader.result;

                const response = await fetch('https://php.nexonpackaging.com/api/saveDocument', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ file: base64String })
                });

                if (!response.ok) throw new Error('File upload failed');

                const result = await response.json();

                // Assuming the API returns an object with a 'link' property
                setFormData(prev => ({ ...prev, fileUrl: result.file_url }));
                setFileState(prev => ({ ...prev, isUploading: false }));

            } catch (error) {
                console.error("File Upload Error:", error);
                setErrors(prev => ({ ...prev, file: 'File upload failed. Please try again or continue without it.' }));
                handleRemoveFile(); // Clear out failed upload state
            }
        };
        reader.onerror = () => {
            console.error("File Reading Error");
            setErrors(prev => ({ ...prev, file: 'Could not read the file.' }));
            handleRemoveFile();
        };
    };
    return (
        <section className="bg-gray-100 dark:bg-gray-900 py-12 scroll-mt-24" id="quote">
            <div className="container max-w-screen-xl mx-auto px-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start pb-[30px]">
                    <div className="flex flex-col">
                        <h2 className="text-4xl font-extrabold uppercase text-black dark:text-white mb-2">BEAT MY QUOTE</h2>
                        <p className="text-lg text-black dark:text-white mb-4">All Custom Boxes You Need For Your Products To Bost Your Sales</p>
                        <div className="w-24 h-1.5 bg-customRed"></div>
                    </div>
                    <div>
                        <p className="text-base text-black dark:text-white leading-relaxed">All of our packaging solutions are designed, printed & manufactured in USA in our in-house vicinity. We don’t outsource any service, material or labor. Due to all these factors, Nexon Packaging provides custom boxes and custom printed packaging solutions at most competitive & reasonable rates. No one can beat our quote for sure.</p>
                    </div>
                </div>

                <div className="w-full mt-10 lg:mt-0 bg-gray-200 dark:bg-gray-800 p-5 rounded-xl">
                    <h2 className="text-2xl font-bold text-black dark:text-white text-center mb-6">Get  Custom Quote</h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <h3 className={headingClass}>🧃 Product Information</h3>
                            <input type="text" className={inputClass('product')} name="product" placeholder="Product Name" onChange={handleChange} value={formData.product} />
                        </div>
                        <div>
                            <h3 className={headingClass}>📏 SELECT SIZE</h3>
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                                <input className={inputClass('length')} type="text" name="length" placeholder="Length" onChange={handleChange} value={formData.length} />
                                <input className={inputClass('width')} type="text" name="width" placeholder="Width" onChange={handleChange} value={formData.width} />
                                <input className={inputClass('depth')} type="text" name="depth" placeholder="Depth" onChange={handleChange} value={formData.depth} />
                                <select className="w-full as-link px-6 py-3 h-[52px] rounded-full border-gray-300 dark:border-gray-600 focus:outline-none bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white shadow-md transition appearance-none" name="unit" onChange={handleChange} value={formData.unit}>
                                    <option>Inch</option><option>Cm</option><option>Mm</option>
                                </select>
                            </div>
                        </div>

                        <div>
                            <h3 className={headingClass}>🧵 Choose Materials</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <select name="color" onChange={handleChange} className="w-full px-6 as-link py-3 h-[52px] rounded-full border-gray-300 dark:border-gray-600 focus:outline-none bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white shadow-md transition appearance-none">
                                    <option>1 color</option><option>2 color</option><option>3 color</option><option>4 color</option><option>4/1 color</option><option>4/2 color</option><option>4/3 color</option><option>4/4 color</option>
                                </select>
                                <input className={inputClass('quantity')} type="text" name="quantity" placeholder="Quantity" onChange={handleChange} value={formData.quantity} />
                            </div>
                        </div>

                        <div className="w-full max-w-md ">
                            <h3 className={headingClass}>🖼️ Upload Artwork</h3>
                            <div className="flex flex-col gap-2">
                                <label className="block">
                                    <span className="sr-only">Choose artwork file</span>
                                    <input
                                        type="file"
                                        ref={fileInputRef}
                                        onChange={handleFileChange}
                                        className="block w-full text-sm text-stone-500 file:mr-3 file:py-1.5 file:px-3 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-customRed/10 file:text-customRed hover:file:bg-customRed/20 cursor-pointer transition-colors"
                                    />
                                </label>
                                {fileState.fileName && (
                                    <div className="flex items-center justify-between p-2 rounded-md bg-gray-100 dark:bg-gray-700 shadow-sm">
                                        <span className="text-sm text-black dark:text-white truncate flex-1">
                                            {fileState.fileName}
                                        </span>
                                        {fileState.isUploading ? (
                                            <svg
                                                aria-hidden="true"
                                                role="status"
                                                className="inline mr-2 w-4 h-4 text-customRed animate-spin"
                                                viewBox="0 0 100 101"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                                    fill="currentColor"
                                                />
                                                <path
                                                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                                    fill="#E5E7EB"
                                                />
                                            </svg>
                                        ) : (
                                            <button
                                                type="button"
                                                onClick={handleRemoveFile}
                                                className="mr-2 text-gray-500 hover:text-red-500 transition-colors"
                                                aria-label="Remove file"
                                            >
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className="h-5 w-5"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M6 18L18 6M6 6l12 12"
                                                    />
                                                </svg>
                                            </button>
                                        )}
                                    </div>
                                )}
                                {errors.file && (
                                    <p className="text-red-500 text-xs mt-1 pl-2">{errors.file}</p>
                                )}
                            </div>
                        </div>

                        <div>
                            <h3 className={headingClass}>📋 Quote Details</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                <input className={inputClass('quoteDetails')} type="text" name="quoteDetails" placeholder="Quote Details" onChange={handleChange} value={formData.quoteDetails} />
                                <input className={inputClass('deliveryCharges')} type="text" name="deliveryCharges" placeholder="Delivery Charges" onChange={handleChange} value={formData.deliveryCharges} />
                                <input className={inputClass('otherCharges')} type="text" name="otherCharges" placeholder="Other Charges" onChange={handleChange} value={formData.otherCharges} />
                            </div>
                        </div>

                        <div>
                            <h3 className={headingClass}>👤 Personal Information</h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div>
                                    <input className={inputClass('name')} type="text" name="name" placeholder="Full Name*" onChange={handleChange} value={formData.name} />
                                    {errors.name && <p className="text-red-500 text-xs mt-1 pl-2">{errors.name}</p>}
                                </div>
                                <div>
                                    <input className={inputClass('email')} type="email" name="email" placeholder="Email ID*" onChange={handleChange} value={formData.email} />
                                    {errors.email && <p className="text-red-500 text-xs mt-1 pl-2">{errors.email}</p>}
                                </div>
                                <div>
                                    <input className={inputClass('phone')} type="text" name="phone" placeholder="Contact Number*" onChange={handleChange} value={formData.phone} />
                                    {errors.phone && <p className="text-red-500 text-xs mt-1 pl-2">{errors.phone}</p>}
                                </div>
                            </div>
                        </div>

                        <div>
                            <h3 className={headingClass}>📝 Additional Notes</h3>
                            <textarea name="note" placeholder="Write Note" rows="4" value={formData.note} onChange={handleChange} className="w-full px-[24px] py-3 leading-normal focus-visible:outline-none rounded-3xl border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white shadow-custom transition" />
                        </div>

                        <div className="flex items-start gap-3 mt-4 text-xs dark:text-gray-300 text-gray-600">
                            <input type="checkbox" id="smsConsent" name="smsConsent" checked={formData.smsConsent} onChange={handleChange} className="peer hidden" />
                            <label htmlFor="smsConsent" className={`mt-1 w-5 h-5 inline-block rounded-full border-2 ${errors.smsConsent ? 'border-red-500' : 'border-gray-400'} peer-checked:bg-red-500 peer-checked:border-red-500 flex-shrink-0 flex items-center justify-center transition-colors duration-200 cursor-pointer`}>
                                <svg className="w-3 h-3 text-white opacity-0 peer-checked:opacity-100 transition-opacity duration-200" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                            </label>
                            <label htmlFor="smsConsent" className="leading-snug cursor-pointer">I consent to receive SMS messages from <strong className="dark:text-white text-black">NexOn Packaging</strong> related to Packages at the phone number provided above. The SMS frequency may vary. Data rates may apply. For assistance reply HELP. Reply STOP to opt out. <Link href='/privacy-policy' target="_blank"
                                rel="noopener noreferrer" className="text-customRed ml-1">Privacy Policy</Link></label>
                        </div>
                        {errors.smsConsent && <p className="text-red-500 text-xs mt-1 pl-8">{errors.smsConsent}</p>}

                        <div className="text-center pt-2">
                            <button type="submit" disabled={loader} className="w-full sm:w-auto sm:max-w-[40%] bg-customRed hover:bg-customRed text-white focus-visible:outline-none font-semibold px-8 py-0 leading-custom rounded-bordercustom shadow-custom transition disabled:opacity-50 disabled:cursor-not-allowed">
                                {loader ? <>
                                    <svg aria-hidden="true" role="status" className="inline mr-3 w-4 h-4 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB"></path>
                                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"></path>
                                    </svg>

                                </> : 'Submit'}
                            </button>
                        </div>
                    </form>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 pt-[30px]">
                    {steps.map((step) => (<div key={step.number} className="flex items-start gap-6"><span className="text-6xl font-bold text-customRed leading-none mt-1">{step.number}</span><div className="flex flex-col"><h3 className="text-xl font-bold text-black dark:text-white mb-2">{step.title}</h3><p className="text-gray-700 dark:text-gray-300">{step.description}</p></div></div>))}
                </div>

            </div>
            <ProductSlider />
            <SubmissionModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
        </section>
    );
}
