import React from 'react'
import Image from "next/image";
import Link from 'next/link';
import { FaArrowDown, FaBox } from "react-icons/fa6";
import ButtonAnimation from './ButtonAnimation';

export default function HeroSectionCat({data}) {
    return (
        <section className="bg-white dark:bg-gray-900">
            <div className="grid max-w-screen-xl px-4 py-4 mx-auto lg:gap-8 xl:gap-0 lg:py-4 lg:grid-cols-12">

                <div className="hidden lg:mt-0 lg:col-span-5 lg:flex">
                    <Image
                        src={data?.category?.header_img}
                        alt="mockup"
                        width={500}
                        height={500}
                        priority
                    />
                </div>
                <div className="mr-auto place-self-center lg:col-span-7">
                    <h1 className="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-5xl text-gray-900 dark:text-white">
                        Custom {data?.category?.title}
                    </h1>
                    <p className="max-w-2xl mb-6 lg:mb-8 md:text-lg lg:text-lg text-gray-600 dark:text-white">
                        {data?.category?.description}
                    </p>
                    <a
                        href="#quote"
                        className="inline-flex items-center justify-center text-base font-medium text-center text-main-color border border-white-300 hover:bg-customRed hover:text-white focus:ring-4 focus:ring-gray-100 dark:text-customRed dark:bg-white dark:border-gray-700 dark:hover:bg-customRed dark:hover:text-white dark:focus:ring-gray-800 px-[24px] py-0 leading-custom rounded-bordercustom shadow-custom text-gray-900"
                       
                    >
                        Get Quote
                        <span className='pl-2'>
                            <FaArrowDown className="animate-bounce" />
                        </span>
                    </a>
                    <Link
                        href="/beat-my-quote"
                         className="inline-flex items-center justify-center ml-3 text-base font-medium text-center text-white hover:text-gray-900 hover:bg-white bg-customRed  px-[24px] py-0 leading-custom rounded-bordercustom shadow-custom"
                    >
                        Beat My Quote
                        <span className='pl-2'>
                            <FaBox className="animate-bounce" />
                        </span>
                    </Link>
                </div>
            </div>
        </section>
    )
}
