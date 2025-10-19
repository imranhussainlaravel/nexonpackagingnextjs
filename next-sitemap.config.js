/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: "https://nexonpackaging.com", // Your domain
    generateRobotsTxt: true, // Generates robots.txt too
    robotsTxtOptions: {
      policies: [
        { userAgent: "*", allow: ["/", "/category/", "/product/"] }, // Allow crawling of key paths
      ],
    },
    async additionalPaths(config) {
      try {
        // Fetch categories from your API
        const categoryResponse = await fetch("https://php.nexonpackaging.com/api/get_all_category_for_seo", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          // Adjust payload if needed
        });
        const categories = await categoryResponse.json();
  
        // Fetch products from your API
        const productResponse = await fetch("https://php.nexonpackaging.com/api/getAllProducts", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          // body: JSON.stringify({}), // Adjust payload if needed
        });
        const products = await productResponse.json();
  
        // Map categories to sitemap entries
        const categoryPaths = Array.isArray(categories?.categories)
          ? categories?.categories?.map((cat) => ({
              loc: `/category/${cat.title || cat.id}`, // Use slug or fallback to ID
              changefreq: "monthly",
              priority: 0.9,
            }))
          : [];
  
        // Map products to sitemap entries
        const productPaths = Array.isArray(products.data)
          ? products.data.map((product) => ({
              loc: `/product/${product.title || product.id}`, // Use slug or fallback to ID
              changefreq: "weekly",
              priority: 0.8,
            }))
          : [];
  
        // Combine all paths
        return [...categoryPaths, ...productPaths];
        // return [...categoryPaths];
      } catch (error) {
        console.error("Error fetching sitemap paths:", error);
        return [];
      }
    },
  };