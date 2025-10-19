

"use client";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function AnimationComponent() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 15000); // Hide after 5 seconds

    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null; // Hide component after timeout

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[#F2F2F2] z-[9999] animate-fadeOut">
      <div className="p-6 rounded-xl flex items-center justify-center ">

        <Image
          src="https://images.nexonpackaging.com/preloader.gif"
          alt="Loading Animation"
          width={900} // 64 * 4 = 256px
          height={900} // 64 * 4 = 256px
          unoptimized // Required for external GIFs to work properly
        />
      </div>
    </div>
  );
}
