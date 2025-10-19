"use client";
import { FaFacebookF, FaTwitter, FaYoutube, FaPinterestP, FaInstagram } from "react-icons/fa";
import { MdPhone, MdEmail, MdLocationOn } from "react-icons/md";
import { FaCcVisa, FaCcDiscover } from "react-icons/fa";
import { LiaCcAmex } from "react-icons/lia";
import { FaCcPaypal } from "react-icons/fa6";
import Link from "next/link";
import useApi from "@/usehook/useApiHook";
import { useState } from "react";
import SubmissionModal from "./SubmissionModal";
// import Image from "next/image";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [loader, setLoader] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)

  const {subscribe_us}=useApi()
  const subcribe =async()=>{
    if (!email) {
      return null
    }
    setLoader(true)
    const data = await subscribe_us({email:email})
    if (data.status === 200) {
      setEmail('')
      setModalOpen(true)
      setLoader(false)
    }
  }
  return (
    <footer className="bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-300 py-10">
      <div className="container mx-auto px-6">
        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">

          {/* Logo & Newsletter */}
          <div>
            <h2 className="text-2xl font-bold flex items-center space-x-2">
              {/* <Image src="/logo.png" alt="Logo" width={40} height={40} /> */}
              <span>Packaging</span>
            </h2>
            <p className="mt-4 text-gray-600 dark:text-gray-400">Let's build something great together.</p>
            <p className="mt-2 text-gray-600 dark:text-gray-400">Sign up for exclusive offers and updates!</p>
            <div className="mt-4 flex">
              <input
                type="email"
                placeholder="Your Email"
                value={email}
                className="px-4 py-2 w-full rounded-l-lg bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-none focus:outline-none"
                onChange={(e)=>{
                  setEmail(e.target.value)
                }}
              />
              <button className=" w-40 bg-customRed hover:bg-customRed px-4 py-2 rounded-r-lg text-white"
              onClick={subcribe}>
                 {loader ? (
                <>
                  <svg aria-hidden="true" role="status" class="inline mr-3 w-4 h-4 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB"></path>
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"></path>
                  </svg>
                 
                </>
              ) : (
                "Subscribe"
              )}
                
              </button>
            </div>
          </div>

          {/* Information Links */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Information</h3>
            <ul className="space-y-2 text-gray-600 dark:text-gray-400">
              <li className="hover:text-customRed dark:hover:text-customRed cursor-pointer">
                <Link href='/privacy-policy' >Privacy & Security</Link></li>
              <li className="hover:text-customRed dark:hover:text-customRed cursor-pointer">
                <Link href='/terms-conditions' >Terms & Conditions</Link></li>
              <li className="hover:text-customRed dark:hover:text-customRed cursor-pointer">
                <Link href='/about' >About Us</Link></li>
              <li className="hover:text-customRed dark:hover:text-customRed cursor-pointer">
                <Link href='/contact' >Contact Us</Link></li>
              {/* <li className="hover:text-customRed dark:hover:text-customRed cursor-pointer">Sitemap</li> */}
              <li className="hover:text-customRed dark:hover:text-customRed cursor-pointer">
                <Link href='/portfolio' >Portfolio</Link></li>
            </ul>
          </div>

          {/* Packaging Products */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Packaging Products</h3>
            <ul className="space-y-2 text-gray-600 dark:text-gray-400">
              <li>
                <Link href="https://nexonpackaging.com/category/soap-boxes" className="hover:text-customRed dark:hover:text-customRed">
                  Soap Boxes
                </Link>
              </li>
              <li>
                <Link href="https://nexonpackaging.com/category/pillow-boxes" className="hover:text-customRed dark:hover:text-customRed">
                  Pillow Boxes
                </Link>
              </li>
              <li>
                <Link href="https://nexonpackaging.com/category/rigid-boxes" className="hover:text-customRed dark:hover:text-customRed">
                  Rigid Boxes
                </Link>
              </li>
              <li>
                <Link href="https://nexonpackaging.com/category/mylar-bags" className="hover:text-customRed dark:hover:text-customRed">
                  Mylar Bags
                </Link>
              </li>
              <li>
                <Link href="https://nexonpackaging.com/category/jewelry-boxes" className="hover:text-customRed dark:hover:text-customRed">
                  Jewelry Boxes
                </Link>
              </li>
              <li>
                <Link href="https://nexonpackaging.com/category/cbd-boxes" className="hover:text-customRed dark:hover:text-customRed">
                  CBD Boxes
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Contact Us</h3>
            <p className="flex items-start space-x-2">
              <MdPhone className="text-customRed w-5 h-5" />
              <span>(904) 706-8883</span>
            </p>

            <p className="flex items-start space-x-2 mt-2">
              <MdEmail className="text-customRed w-5 h-5" />
              <span>sales@nexonpackaging.com</span>
            </p>

            <p className="flex items-start space-x-2 mt-2">
              <MdLocationOn className="text-customRed w-5 h-5 self-start" />
              <span>7901 4th St N # 22564<br /> St. Petersburg, FL 33702</span>
            </p>
            {/* Social Icons */}
            <h3 className="mt-6 text-lg font-semibold text-gray-900 dark:text-gray-100">Follow Us:</h3>
            <div className="flex space-x-4 mt-2">
              <FaFacebookF className="text-gray-600 dark:text-gray-400 hover:text-customRed dark:hover:text-customRed cursor-pointer" />
              <FaTwitter className="text-gray-600 dark:text-gray-400 hover:text-customRed dark:hover:text-customRed cursor-pointer" />
              <FaYoutube className="text-gray-600 dark:text-gray-400 hover:text-customRed dark:hover:text-customRed cursor-pointer" />
              <FaPinterestP className="text-gray-600 dark:text-gray-400 hover:text-customRed dark:hover:text-customRed cursor-pointer" />
              <FaInstagram className="text-gray-600 dark:text-gray-400 hover:text-customRed dark:hover:text-customRed cursor-pointer" />
            </div>
          </div>
        </div>

        {/* Payment Methods & Copyright */}
        <div className="mt-10 border-t border-gray-300 dark:border-gray-700 pt-6 text-center text-gray-600 dark:text-gray-400">
          <p>SSL 100% Secure Transactions:</p>
          <div className="flex justify-center mt-2 space-x-4">
            <FaCcVisa width={50} height={30} />
            {/* <Image src="/visa.png" alt="Visa" width={50} height={30} /> */}
            <LiaCcAmex width={50} height={30} />
            {/* <Image src="/amex.png" alt="Amex" width={50} height={30} /> */}
            <FaCcDiscover width={50} height={30} />
            {/* <Image src="/discover.png" alt="Discover" width={50} height={30} /> */}
            <FaCcPaypal width={50} height={30} />
            {/* <Image src="/paypal.png" alt="PayPal" width={50} height={30} /> */}
          </div>
          <p className="mt-4">© 2025 Nexon Packaging.  All rights reserved.</p>
        </div>
      </div>
      <SubmissionModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </footer>
  );
}
