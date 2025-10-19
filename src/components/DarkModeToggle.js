"use client";

import { useState, useEffect } from "react";
import { BsSun, BsMoon } from "react-icons/bs";

const DarkModeToggle = () => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const isDarkMode = localStorage.getItem("darkMode") === "true";
    setDarkMode(isDarkMode);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  return (
    <div className="bg-customRed p-3 w-[80px] h-[44px] fixed right-[-40px] hover:right-0 top-1/2 rounded-l-[5px] transform -translate-y-1/2 transition-all duration-500 ease-out flex items-center justify-start z-[9]">
      <button
        onClick={() => setDarkMode(!darkMode)}
        className="text-white dark:text-white flex items-center space-x-2"
      >
        {darkMode ? <BsSun size={20} /> : <BsMoon size={20} />}
        <span className="text-sm font-medium">{darkMode ? "Light" : "Dark"}</span>
      </button>
    </div>
  );
};

export default DarkModeToggle;
