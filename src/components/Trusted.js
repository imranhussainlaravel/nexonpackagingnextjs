import Image from "next/image";
import { imgUrl } from "./CommonFuntion";

export default function Trusted() {
  return (
    <section className="p-6 md:p-10 bg-gray-white dark:bg-gray-900 mt-8">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Trusted Section */}
        <div>
          <h2 className="text-lg md:text-xl font-bold mb-4 md:mb-6 dark:text-white text-center md:text-left">
            WHERE WE’RE TRUSTED
          </h2>
          <div className="flex flex-wrap justify-center md:justify-start gap-4 items-center md:gap-6">
            <Image
              src={`${imgUrl}google-logo.webp`}
              alt="Google Reviews"
              width={130} 
              height={45}         
              className="rounded-lg max-w-full h-full object-fill"
            />
            <Image
              src={`${imgUrl}Trustpilot-dark.webp`}
              alt="Trustpilot"
              width={130} 
              height={45} 
              className="rounded-lg max-w-full h-full object-fill"
            />
            <Image
              src={`${imgUrl}reviews-dark.webp`}
              alt="Reviews.io"
              width={130} 
              height={45} 
              className="rounded-lg max-w-full h-full object-fill"
            />
          </div>
        </div>

        {/* Logistics Partners */}
        <div>
          <h2 className="text-lg md:text-xl font-bold mb-4 md:mb-6 dark:text-white text-center md:text-left">
            OUR LOGISTICS PARTNERS
          </h2>
          <div className="flex flex-wrap justify-center md:justify-start items-center gap-4 md:gap-6">
            <Image
              src={`${imgUrl}usps-logo.webp`}
              alt="USPS"
              width={130} 
              height={45} 
              className="rounded-lg max-w-full h-full object-fill"
            />
            <Image
              src={`${imgUrl}dhl.webp`}
              alt="DHL"
              width={130} 
              height={45} 
              className="rounded-lg max-w-full h-full object-fill"
            />
            <Image
              src={`${imgUrl}fedex.webp`}
              alt="FedEx"
              width={130} 
              height={45} 
              className="rounded-lg max-w-full h-full object-fill"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
