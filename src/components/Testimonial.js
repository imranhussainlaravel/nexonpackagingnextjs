"use client";
import Image from "next/image";
import React from "react";

export default function Testimonial() {
  return (
    <section className="bg-white dark:bg-gray-900 py-12 px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
        
        

        {/* Right Side - Content (6 Columns) */}
        <div className="md:col-span-6">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">CLIENT TESTIMONIAL</h2>
          <p className="text-gray-600 dark:text-white mt-2 md:text-lg lg:text-lg">
            GET TO KNOW ALL ABOUT OUR SERVICE THROUGH VARIOUS BUSINESS CLIENTS.
          </p>

          {/* Quote & Client Info */}
          <div className="mt-6 bg-customRed dark:bg-customRed p-6 rounded-lg shadow-custom">
            <span className="text-6xl text-white">“</span>
            <p className="text-white dark:text-white font-medium mt-2 italic">
            Tristan has been an absolute pleasure to work with from beginning to end. He was always quick to respond to my numerous questions and requests, ensuring everything was handled smoothly. His collaboration with my graphic designer ....
            </p>

            {/* Client Details */}
            <div className="flex items-center mt-4">
              <div className="w-12 h-12 bg-white text-customRed flex items-center justify-center rounded-md font-bold">
                FG
              </div>
              <div className="ml-3">
                <p className="font-semibold text-white dark:text-white"> Frank Godman</p>
                <p className="text-sm text-white dark:text-gray-300">Greatest Printer Ever!!!</p>
              </div>
            </div>
          </div>
        </div>
        {/* Left Side - Image (6 Columns) */}
        <div className="md:col-span-6 flex justify-center h-full">
          <Image
            src="https://images.nexonpackaging.com/main_review.webp" // Replace with actual image
            alt="Client" className="object-contain"
            width={400} 
            height={400}
          />
        </div>

      </div>
    </section>
  );
}
