"use client";
import { useEffect, useState } from "react";
import { FaArrowUp } from "react-icons/fa";

const BackToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-20 right-6 p-3 rounded-full bg-customRed text-white shadow-lg hover:bg-customRed transition-all duration-300 ${
        isVisible ? "opacity-100 scale-100" : "opacity-0 scale-0"
      }`}
    >
      <FaArrowUp size={14} />
    </button>
  );
};

export default BackToTopButton;
