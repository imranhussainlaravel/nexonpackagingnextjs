"use client";  // ✅ Required for useState, useEffect

import React, { createContext, useState, useEffect } from "react";
import useApiHook from "../usehook/useApiHook";
import { usePathname } from "next/navigation";
export const ShopContext = createContext();

const ShopProvider = ({ children }) => {
  const [navCategories, setNavCategories] = useState([]);
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [allSliders, setAllSliders] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const pathname = usePathname();

  const { get_industry, get_all_category, get_sliders_products } = useApiHook();

  useEffect(() => {
    navbarData(); all_category()
  }, []);
  useEffect(() => {
    get_sliders_products_all()
  }, [pathname]);
  useEffect(() => {

  }, []);

  const get_sliders_products_all = async () => {
    let paths = null
    if (typeof window !== "undefined") {
      paths = window.location.pathname.split("/").filter(Boolean); // ["category", "bakery-boxes"]

    }
    const payload = {
      id: paths[1] || '',
      type: paths[0]|| '',
      // / type:category/product,
    }
    try {
      const data = await get_sliders_products(payload);
      if (data?.status === 200) {
        setAllSliders(data.product);
      }
    } catch (err) {
      console.error("Error fetching navbar data:", err);
      setError(err);
    }
  };
  const navbarData = async () => {
    try {
      const data = await get_industry();
      if (data?.status === 200) {
        setNavCategories(data);
      }
    } catch (err) {
      console.error("Error fetching navbar data:", err);
      setError(err);
    }
  };

  const all_category = async () => {
    try {
      const data = await get_all_category();
      if (data?.status === 200) {
        setCategories(data.categories);
      }
    } catch (err) {
      console.error("Error fetching navbar data:", err);
      setError(err);
    }
  };

  return (
    <ShopContext.Provider
      value={{
        categories,
        products,
        navbarData,
        all_category,
        navCategories,
        loading,
        error,
        allSliders,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export default ShopProvider;  // ✅ Ensure correct export
