
"use client"
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { CgMail } from "react-icons/cg";
import { FiSearch } from "react-icons/fi";

import { FaChevronDown, FaBox, FaEnvelope } from "react-icons/fa";
import { useContext } from "react";
import { ShopContext } from "@/context/ShopContext";
import Image from "next/image";
import { formatString } from "./CommonFuntion";
import MobileAccordion from "./MobileAccordion";
import { FaChevronUp } from "react-icons/fa";
import { useRouter } from 'next/navigation';



export default function Navbar() {
  // const [isOpen, setIsOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(null);
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");

  const { navCategories } = useContext(ShopContext);
  const [isHidden, setIsHidden] = useState(true);

  const [openIndex, setOpenIndex] = useState(null);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };




  const categories = [
    {
      name: "Boxes by Industry",
      subcategories: navCategories.industry,
    },
    {
      name: "Boxes by Material",
      subcategories: navCategories.material,
    },
    {
      name: "Boxes by Style",
      subcategories: navCategories.style,
    },

  ];



  const openNextPage = (route) => {
    router.push(route);
  }
  const openSearchPage = (route) => {
    router.push(route);
  }

  const handleSearch = () => {
    if (searchTerm.trim() !== "") {
      openSearchPage(`/search/${formatString(searchTerm)}`);
      setIsOpen('')
      setSearchTerm('') // Call parent function with search term
    }
  };

  // Handle Enter key press
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };
  return (
    <>
      <nav className="sticky top-0 z-50 bg-white dark:bg-gray-900 shadow-md pt-[10px] pb-[10px] hidden lg:block">
        <div className="container mx-auto flex items-center justify-between px-4">
          {/* Left Side: Logo & Company Name */}
          <div className="flex items-center space-x-3">
            {/* Logo */}
            <img
              src="https://images.nexonpackaging.com/logo.webp" // Replace with actual logo
              alt="Logo"
              className="h-8 w-8"
            />
            {/* Company Name */}
            <span className="text-xl font-bold text-customRed dark:text-customRed"
            >
              NexOnPackaging
            </span>
          </div>

          {/* Right Side: Email & Phone */}
          <div className="flex items-center space-x-6">
            {/* Email Section */}
            <div className="flex items-center space-x-2">
              <div className=" px-2 py-2 rounded-md">
                 <FaEnvelope className="text-customRed dark:text-customRed text-base " />
              </div>
              <Link
                href="mailto:sales@nexonpackaging.com"
                className="text-customRed transition"
              >
                sales@nexonpackaging.com
              </Link>
            </div>

            {/* Divider */}
            <span className="text-gray-400">|</span>

            {/* Phone Section */}
            <div className="flex flex-col">
              <span className="text-sm text-gray-500 dark:text-white">
                Speak with a Packaging Expert
              </span>
              <Link
                href="tel:(904) 706-8883"
                className="text-customRed dark:text-customRed font-semibold text-center"
              >
                (904) 706-8883
              </Link>
            </div>
          </div>
        </div>
      </nav>
      {/* Mobile Header */}
      <div className="lg:hidden sticky top-0 z-50 bg-white dark:bg-gray-900 shadow-md">
        <div className="flex justify-between items-center px-4 py-3">
          <div className="flex items-center space-x-3">
            <img
              src="https://images.nexonpackaging.com/logo.webp" // Replace with actual logo
              alt="Logo"
              className="h-8 w-8"
            />
            <span className="text-xl font-bold text-gray-900 dark:text-white">
              NexOnPackaging
            </span>
          </div>


          <div className="flex items-center space-x-4">
            <div className="flex space-x-6 items-center">

              <button
                onClick={() => {
                  if (isOpen === 'search') {
                    setIsOpen('');
                 
                  } else { setIsOpen('search');
                    }
                }}
                className="relative p-3 bg-customRed dark:bg-customRed rounded-full focus:outline-none transition-all absolute right-0 top-0 z-50"
              >
                <FiSearch className="text-white dark:text-white" size={15} />
              </button>
               <div
                className={`absolute left-0 w-full !m-0 top-[63px] p-5 bg-white dark:bg-gray-900 flex items-center transition-all duration-500 ease-in-out overflow-hidden shadow-custom ${isOpen === 'search' ? "max-h-[80px] translate-y-0 opacity-100" : "max-h-0 translate-y-[-50%] opacity-0"
                  }`}
              >
                <div className="w-full max-w-5xl mx-auto flex items-center justify-center px-4">
                  <div className="relative w-full max-w-md">
                    {/* Search Input */}
                    <input
                      type="text"
                      placeholder="Search..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      onKeyDown={handleKeyDown}
                      className="w-full p-3 pl-12 pr-4 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-400 dark:border-gray-700 rounded-full outline-none focus:outline-none transition-all"
                    />
                    {/* Search Icon */}
                    <button className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-300"
                      onClick={handleSearch}>
                      <FiSearch size={18} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-customRed dark:text-main-color focus:outline-none"
            >
              {menuOpen ? (
                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Desktop Navbar - Hidden on mobile */}
      <nav className="hidden lg:block bg-white dark:bg-gray-800 shadow-md sticky top-0 z-50">
        <div className="container mx-auto flex justify-center items-center h-[64px] px-[28px] py-0 gap-7">
          {/* <div className="flex items-center space-x-3">
            <div className="h-8 w-8 bg-green-500 rounded-md"></div>
            <span className="text-xl font-bold text-gray-800 dark:text-main-color dark:text-white ">
            Packaging
            </span>
          </div> */}
          <div className="flex space-x-6 items-center">
            <Link
              href="/"
              className="text-[14px] text-gray-900 dark:text-white px-2.5 py-5 hover:text-customRed dark:hover:text-customRed transition-colors duration-200"
            >
              Home
            </Link>

            {/* Dropdown: Boxes By Industry */}
            <div className="relative inline-block text-left"
              onMouseEnter={() => { setIsHidden(true);setIsOpen("industry")}}
              onMouseLeave={() => setIsOpen(null)}>
              <button className="text-[14px]  flex items-center gap-2 text-gray-900  px-2.5 py-5 hover:text-customRed dark:text-white hover:text-customRed dark:hover:text-customRed transition-colors duration-200">
                Boxes by Industry
                <FaChevronDown className={`transition-transform duration-300 ${isOpen === "industry" ? "rotate-180" : "rotate-0"}`} />
              </button>
              <div className={`absolute left-[-97px] w-[1050px] bg-white dark:bg-gray-800 border dark:border-gray-700 shadow-custom p-4 transition-all duration-300 ease-in-out transform origin-top ${
                isOpen === "industry" 
                  ? "opacity-100 scale-y-100 translate-y-0" 
                  : "opacity-0 scale-y-0 -translate-y-2 pointer-events-none"
              }`}>
                <div className="grid grid-cols-6 gap-4 text-gray-900 dark:text-white">
                  {navCategories && navCategories?.industry?.map((item, index) => (
                    <Link 
                      key={index} 
                      href={`/category/${formatString(item.title)}`} 
                      className="text-[12px] font-semibold flex items-center space-x-2 hover:text-customRed p-[10px] hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-all duration-200 transform hover:scale-105"
                      onClick={() => setIsOpen(null)}
                    >
                      <Image
                        src={item.icon}
                        alt={item.title}
                        width={30}
                        height={30}
                        className="h-15 w-15"
                      />
                      <span>{item.title}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Dropdown: Boxes By Style */}
            <div className="relative" onMouseEnter={() => { setIsHidden(true);setIsOpen("style")}} onMouseLeave={() => setIsOpen(null)}>
              <button className="text-[14px] flex items-center gap-2 px-2.5 py-5 text-gray-900 hover:text-customRed dark:text-white hover:text-customRed dark:hover:text-customRed transition-colors duration-200">
                Boxes By Style
                <FaChevronDown
                  className={`transition-transform duration-300 ${isOpen === "style" ? "rotate-180" : "rotate-0"}`}
                />
              </button>
              <div className={`absolute left-0 w-56 bg-white dark:bg-gray-800 shadow-custom border dark:border-gray-700 transition-all duration-300 ease-in-out transform origin-top ${
                isOpen === "style" 
                  ? "opacity-100 scale-y-100 translate-y-0" 
                  : "opacity-0 scale-y-0 -translate-y-2 pointer-events-none"
              }`}>
                <ul className="py-2 text-gray-800 dark:text-white">
                  {navCategories && navCategories?.style?.map((item, index) => (
                    <li key={index}>
                      <Link 
                        href={`/category/${formatString(item.title)}`} 
                        className="text-[12px] font-semibold block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-all duration-200 transform hover:scale-105"
                        onClick={() => setIsOpen(null)}
                      >
                        {item.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>


            {/* Dropdown: Boxes By Material */}
            <div className="relative inline-block text-left" onMouseEnter={() =>{ setIsHidden(true); setIsOpen("material")}} onMouseLeave={() => setIsOpen(null)}>
              <button className="text-[14px] flex items-center gap-2 px-2.5 py-5 text-gray-900 dark:text-white hover:text-customRed dark:hover:text-customRed transition-colors duration-200">
                Boxes By Material 
                <FaChevronDown className={`transition-transform duration-300 ${isOpen === "material" ? "rotate-180" : "rotate-0"}`} />
              </button>
              <div className={`absolute left-0 w-48 bg-white dark:bg-gray-800 border dark:border-gray-700 shadow-custom transition-all duration-300 ease-in-out transform origin-top ${
                isOpen === "material" 
                  ? "opacity-100 scale-y-100 translate-y-0" 
                  : "opacity-0 scale-y-0 -translate-y-2 pointer-events-none"
              }`}>
                <ul className="py-2 text-gray-900 dark:text-white">
                  {navCategories && navCategories?.material?.map((item, index) => (
                    <li key={index}>
                      <Link 
                        href={`/category/${formatString(item.title)}`} 
                        className="text-[12px] font-semibold block px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-all duration-200 transform hover:scale-105"
                        onClick={() => setIsOpen(null)}
                      >
                        {item.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <Link
              href="/portfolio"
              className="text-[14px] text-gray-900 dark:text-white px-2.5 py-5 hover:text-customRed dark:hover:text-customRed transition-colors duration-200"
            >
              Portfolio
            </Link>
            <Link
              href="/blog"
              className="text-[14px] text-gray-900 dark:text-white px-2.5 py-5 hover:text-customRed dark:hover:text-customRed transition-colors duration-200"
            >
              Blog
            </Link>


          </div>

          <div className="flex space-x-6 items-center">

            <button
             onClick={() => {
              if (isOpen === 'search') {
                setIsOpen('');
                setTimeout(() => setIsHidden(true), 150);
              } else { 
                setIsHidden(false)
                setTimeout(() => setIsOpen('search'), 100); }
            }}
              className="relative p-3 bg-customRed dark:bg-customRed rounded-full focus:outline-none transition-all absolute right-0 top-0 z-50"
            >
              <FiSearch className="text-white dark:text-white" size={15} />
            </button>
{!isHidden && 
            <div
              className={`absolute left-0 w-full !m-0 top-[63px] p-5 bg-white dark:bg-gray-900 flex items-center transition-all duration-500 ease-in-out overflow-hidden shadow-custom ${isOpen === 'search' ? "max-h-[80px] translate-y-0 opacity-100" : "max-h-0 translate-y-[-50%] opacity-0 "
                }`}
            >
              <div className="w-full max-w-5xl mx-auto flex items-center justify-center px-4">
                <div className="relative w-full max-w-md">
                  {/* Search Input */}
                  <input
                    type="text"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="w-full p-3 pl-12 pr-4 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-400 dark:border-gray-700 rounded-full outline-none focus:outline-none transition-all"
                  />
                  {/* Search Icon */}
                  <button className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-300"
                    onClick={handleSearch}>
                    <FiSearch size={18} />
                  </button>
                </div>
              </div>
            </div>}
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden fixed inset-0 z-40 transform ${menuOpen ? "translate-x-0" : "-translate-x-full"
          } transition-transform duration-300 ease-in-out bg-white dark:bg-gray-900`}
      >
        <div className="flex flex-col h-full p-4">
          <div className="flex justify-end mb-8">
            <button
              onClick={() => setMenuOpen(false)}
              className="text-main-color dark:text-main-color p-2"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <div className="flex flex-col items-start space-y-6 h-full overflow-y-auto overflow-x-hidden">
            <Link
              href="/"
              className="text-[14px] font-bold text-gray-900 dark:text-white  hover:text-customRed border-b border-gray-700 w-full pb-4"
              onClick={() => setMenuOpen(false)}
            >
              Home
            </Link>



            <Link
              href="/portfolio"
              className="text-[14px] font-bold text-gray-900 dark:text-white  hover:text-customRed border-b border-gray-700 w-full pb-4"
              onClick={() => setMenuOpen(false)}
            >
              Portfolio
            </Link>
            <Link
              href="/blog"
              className="text-[14px] font-bold text-gray-900 dark:text-white  hover:text-customRed border-b border-gray-700 w-full pb-4"
              onClick={() => setMenuOpen(false)}
            >
              Blog
            </Link>

            <div className="w-full text-black !mt-[3px]">
              {categories.map((category, index) => (
                <div key={index} className="border-b border-gray-700">
                  <button
                    onClick={() => toggleAccordion(index)}
                    className="w-full flex justify-between items-center py-4 text-[14px] font-bold  dark:text-white"
                  >
                    <span>{category.name}</span>
                    {openIndex === index ? <FaChevronUp /> : <FaChevronDown />}
                  </button>
                  <div
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${openIndex === index ? "max-h-40" : "max-h-0"}`}
                  >
                    <ul className="pt-0 pr-3 pb-3 pl-3 space-y-2 ">
                      {category && category?.subcategories?.map((sub, i) => (
                        <li key={i} className="text-gray-900 text-[12px] font-semibold dark:text-white as-link"
                          onClick={() => {
                            setMenuOpen(!menuOpen)
                            openNextPage(`/category/${formatString(sub.title)}`)

                          }}>{sub.title}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
