"use client";
import React, { useState } from "react";

const SubmissionModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white dark:bg-gray-900 p-6 md:p-10 rounded-2xl shadow-lg text-center w-11/12 max-w-md">
        {/* Checkmark Animation */}
        <div className="flex flex-col items-center justify-center mb-4">
          <div className="relative w-24 h-24 flex items-center justify-center bg-gradient-to-br from-customRed  to-customRed  rounded-full shadow-md animate-bounce">
            <svg
              viewBox="0 0 65 51"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-12 stroke-white"
            >
              <path
                d="M7 25L27.3077 44L58.5 7"
                strokeWidth="5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>

        {/* Text */}
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Thanks for submitting!
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mt-2">
          Your message has been sent successfully.
        </p>

        {/* Button */}
        <button
          className="mt-4 px-6 py-2 bg-customRed hover:bg-customRed  text-white font-semibold rounded-full transition-transform transform hover:scale-105"
          onClick={onClose}
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default SubmissionModal;
