import { useState, useCallback } from "react";
import axios from "axios";
// import { errorMessage } from "../../CommonFuntions";

const API_BASE_URL = "https://php.nexonpackaging.com/api"; // Your PHP backend URL

const useApi = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Generic API request handler
  const request = useCallback(async (method, endpoint, data = null) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios({
        method,
        url: `${API_BASE_URL}/${endpoint}`,
        data,
        headers: {
          "Content-Type": data instanceof FormData ? "multipart/form-data" : "application/json",
          Authorization: `Bearer ${localStorage.getItem('token')}`
        },
      });
      return response.data;
    } catch (err) {
        // errorMessage(err.response?.data?.message || "Something went wrong")
      setError(err.response?.data?.message || "Something went wrong");
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  // Login API
  const get_industry = async () => {
    return await request("GET", "get_industry", );
  };
  const get_all_category  = async () => {
    return await request("GET", "get_all_category ", );
  };
  const get_portfolio  = async () => {
    return await request("GET", "get_portfolio ", );
  };
  const get_category_by_id   = async (payload) => {
    return await request("POST", "get_category_by_id", );
  };
  const get_product_by_id    = async (payload) => {
    return await request("POST", "get_product_by_id ", );
  };
  const sendEmail = async (payload) => {
    return await request("POST", "sendEmail",payload );
  };
  const get_sliders_products  = async (payload) => {
    return await request("POST", "get_sliders_products ",payload );
  };
  const subscribe_us  = async (payload) => {
    return await request("POST", "subscribe_us ",payload );
  };
  const contact_us  = async (payload) => {
    return await request("POST", "contact_us ",payload );
  };
  const search  = async (payload) => {
    return await request("POST", "search ",payload );
  };
  const get_blog_detail_with_id  = async (payload) => {
    return await request("POST", "get_blog_detail_with_id ",payload );
  };
  const get_all_blogs  = async () => {
    return await request("GET", "get_all_blogs ", );
  };
  const beat_my_quote  = async (payload) => {
    return await request("POST", "beatmyquote ",payload );
  };

  return {
    loading,
    error,
    get_industry,
    get_all_category,
    get_category_by_id ,
    get_product_by_id ,
    get_portfolio,
    sendEmail,
    get_sliders_products,
    subscribe_us,
    contact_us,
    search,
    get_all_blogs,
    get_blog_detail_with_id,
    beat_my_quote,
  };
};

export default useApi;
