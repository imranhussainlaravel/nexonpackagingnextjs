export default function ProductSpecification({data}) {
  return (
    
      <div className="bg-white text-gray-900 dark:bg-gray-900 dark:text-white transition-colors duration-300 max-w-screen-xl  mx-auto">
        <div className="container mx-auto p-6 md:p-10">
        <h2 className="text-2xl font-bold mb-4 border-b border-gray-300 dark:border-gray-700 pb-2">
          Product Specification
        </h2>
        <div className="space-y-3">
          {[
            ["Box Style", data.title],
            ["Dimension (L + W + H)", "All Custom Sizes & Shapes"],
            ["Quantities", "No Minimum Order Required"],
            ["Stock", "100lb C1S / C2S, 120lb C1S / C2S, 200lb C1S / C2S, Kraft Card Stock (80lb, & 100lb), Corrugated Stock"],
            ["Printing", "No Printing, CMYK, CMYK + 1 PMS color, CMYK + 2 PMS colors"],
            ["Finishing", "Gloss Lamination, Matte Lamination, Gloss AQ, Gloss UV, Matte UV, Spot UV, Embossing, Foiling"],
            ["Included Options", "Die Cutting, Gluing, Scored, Perforation"],
            ["Additional Options", "Eco-Friendly, Recycled Boxes, Biodegradable"],
            ["Proof", "Flat View, 3D Mock-up, Physical Sampling (On request)"],
            ["Turnaround", "4 - 8 Business Days, RUSH"],
            ["Shipping", "FLAT"],
          ].map(([label, value]) => (
            <div key={label} className="flex border-b border-gray-300 dark:border-gray-700 pb-2">
              <span className="font-semibold w-1/4 text-gray-700 dark:text-gray-300">{label}:</span>
              <span className="w-3/4 text-gray-600 dark:text-white">{value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
