
import Image from "next/image";

export default function About() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white px-4 py-10">
      <div className="max-w-7xl mx-auto text-center">
        
        {/* 🚀 Hero Section */}
        <h1 className="text-4xl font-bold">About Us</h1>
        <p className="mt-3 text-lg text-gray-600 dark:text-white">
          Nexon Packaging is a forward-thinking packaging company committed to providing a wide array of custom packaging solutions designed to elevate your brand and business.

        With a strong foundation and a robust $500K monthly recurring revenue, we have established ourselves as a trusted name in the packaging industry. Our mission is to craft compelling packaging that not only protects your products but also tells your brand story and captivates your customers at first glance.

        At Nexon Packaging, our experienced professionals are dedicated to understanding your packaging challenges, offering innovative solutions, and delivering exceptional results. We provide limitless customization options to ensure your packaging perfectly aligns with your product specifications and business goals.

        Whether you require packaging tailored to specific dimensions or need expert guidance on structural design, our shape and size customization services are tailored to meet your needs with precision.

        To enhance your brand presence, we offer a variety of premium printing techniques including offset, screen, digital, and rotogravure printing. Each method ensures high-quality visuals and a distinctive finish that complements your brand aesthetic.

        Additionally, our exclusive range of finishes—such as gloss, matte, holographic, and foil stamping—adds a sophisticated and eye-catching touch to your custom packaging.

        At Nexon Packaging, we adopt a customer-first mindset. We are committed to delivering personalized, high-quality packaging solutions that reflect your brand’s identity and exceed your expectations.
        </p>

        {/* 🏢 Company Info Section */}
        <div className="mt-10 p-8">
          <h2 className="text-2xl font-semibold">Our Mission</h2>
          <p className="mt-3 text-gray-600 dark:text-white">
            Our mission is to deliver innovative, high-quality, and efficient digital solutions that empower businesses to grow and succeed in the competitive market.
          </p>
        </div>

        

        {/* 👥 Team Section */}
        {/* <div className="mt-10">
          <h2 className="text-3xl font-semibold">Meet Our Team</h2>
          <p className="text-gray-600 dark:text-white mt-3">The minds behind our success</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 mt-6">
            
           <div className="bg-white dark:bg-gray-800 p-12 rounded-2xl text-center shadow-custom   transition duration-300 transform">
              <Image src="https://images.nexonpackaging.com/profession.jpg" alt="elena-herman" width={150} height={150} className="mx-auto rounded-full" />
              <h3 className="text-lg font-semibold mt-3 text-gray-900 dark:text-white">Elena herman</h3>
              <p className="text-gray-600 dark:text-gray-300">Customer Relations Manager</p>
            </div>
            

             <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl text-center shadow-custom  transition duration-300 transform scale-105 hover:shadow-custom">
              <Image src="https://images.nexonpackaging.com/founder.jpg" alt="imran-hussain" width={200} height={200} className="mx-auto rounded-full" />
              <h3 className="text-lg font-semibold mt-3 text-gray-900 dark:text-white">Imran Hussain</h3>
              <p className="text-gray-600 dark:text-gray-300">CEO & Founder</p>
            </div>


            <div className="bg-white dark:bg-gray-800 p-12 rounded-2xl text-center shadow-custom  transition duration-300 transform ">
              <Image src="https://lh3.googleusercontent.com/a/ACg8ocJM83bCqlttU7zOppIzMHEwdu5WhKRGwYg3qadSDWD4mWooWkS7=s360-c-no" alt="m-daniyal" width={150} height={150} className="mx-auto rounded-full" />
              <h3 className="text-lg font-semibold mt-3 text-gray-900 dark:text-white">M Daniyal</h3>
              <p className="text-gray-600 dark:text-gray-300">Lead Developer</p>
            </div>

           

          </div>
        </div> */}
      </div>
    </div>
  );
}
