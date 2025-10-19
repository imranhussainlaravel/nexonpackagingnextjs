"use client";  // ✅ This tells Next.js it's a client component

import ShopProvider from "@/context/ShopContext";  

export default function ClientWrapper({ children }) {
  return <ShopProvider>{children}</ShopProvider>;
}
