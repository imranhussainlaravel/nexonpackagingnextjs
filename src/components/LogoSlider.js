import { useEffect, useRef } from "react";
import gsap from "gsap";

const logos = [
  "https://oxopackaging.com/assets/images/4.webp",
    "https://oxopackaging.com/assets/images/4.webp",
    "https://oxopackaging.com/assets/images/4.webp",
    "https://oxopackaging.com/assets/images/4.webp",
];

export default function LogoSlider() {
  const sliderRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(".slider-track", {
        xPercent: -50,
        duration: 20,
        repeat: -1,
        ease: "linear",
      });
    }, sliderRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="overflow-hidden w-full" ref={sliderRef}>
      <div className="flex slider-track w-max">
        {[...logos, ...logos].map((logo, index) => (
          <img
            key={index}
            src={logo}
            alt={`Logo ${index}`}
            className="w-24 h-auto mx-8"
          />
        ))}
      </div>
    </div>
  );
}
