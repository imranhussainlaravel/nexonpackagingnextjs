import Image from "next/image";

const PremiumFinishes = () => {
  const finishes = [
    {
      title: "Gold Foiling",
      image: "https://images.nexonpackaging.com/goldfoil.webp", // Replace with actual URL
    },
    {
      title: "Silver Foiling",
      image: "https://images.nexonpackaging.com/silverfoil.webp", // Replace with actual URL
    },
    {
      title: "Embossing",
      image: "https://images.nexonpackaging.com/embossed.webp", // Replace with actual URL
    },
    {
      title: "Debossing",
      image: "https://images.nexonpackaging.com/debossed.webp", // Replace with actual URL
    },
    {
      title: "Holographic Foiling",
      image: "https://images.nexonpackaging.com/holographic.webp", // Replace with actual URL
    },
    {
        title: "Spot UV",
        image: "https://images.nexonpackaging.com/colorvision.webp", // Replace with actual URL
      },
    {
      title: "Matte",
      image: "https://images.nexonpackaging.com/matte.jpeg", // Replace with actual URL
    },
    {
      title: "Soft Touch Lamination",
      image: "https://images.nexonpackaging.com/softtouchlamination.jpg", // Replace with actual URL
    },
  ];

  return (
    <section className="container max-w-screen-xl mx-auto text-center px-4 py-12">
      <h2 className="text-3xl font-bold text-center dark:text-white">PREMIUM FINISHES</h2>
      <p className="text-center dark:text-white mt-2 md:text-lg lg:text-lg">
        Variety of finishing options to ensure spectacular looks and premium feel of custom boxes
      </p>

      {/* Responsive Grid */}
       <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-4 gap-6 mt-8">
        {finishes.map((finish, index) => (
          <div key={index} className="relative rounded-lg overflow-hidden shadow-lg group">
            <Image
              src={finish.image}
              alt={finish.title}
              width={400}
              height={400}
              className="w-full h-[300px] object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 p-3">
              <p className="text-white font-bold">{finish.title}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PremiumFinishes;
