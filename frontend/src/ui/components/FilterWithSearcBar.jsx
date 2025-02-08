import React, { useState } from "react";

const FilterComponent = () => {
  const [showFilters, setShowFilters] = useState(false);
  const [expandedSections, setExpandedSections] = useState({
    category: false,
    price: false,
  });
  const [priceRange, setPriceRange] = useState([0, 5000]);

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const handleSearchFocus = () => {
    setShowFilters(true);
  };

  const handleClearAll = () => {
    setShowFilters(false);
    setExpandedSections({ category: false, price: false });
    setPriceRange([0, 30000]);
  };

  const handlePriceChange = (e) => {
    const value = parseInt(e.target.value, 10);
    const range = e.target.name === "min" ? [value, priceRange[1]] : [priceRange[0], value];
    setPriceRange(range);
  };

  return (
    <div className="p-2 bg-white rounded-lg shadow-lg w-64">
      <div className="mb-1,5">
        <input
          type="text"
          placeholder="Search keywords..."
          onFocus={handleSearchFocus}
          className="w-full p-2 border rounded-lg"
        />
      </div>
      {showFilters && (
        <>
          <div>
            <div
              className="font-semibold text-lg mb-2 cursor-pointer"
              onClick={() => toggleSection("category")}
            >
              Kategória
            </div>
            {expandedSections.category && (
              <div className="ml-2 mb-4">
                <label className="block">
                  <input type="checkbox" className="mr-2" /> Adidas
                </label>
                <label className="block">
                  <input type="checkbox" className="mr-2" /> Nike
                </label>
                <label className="block">
                  <input type="checkbox" className="mr-2" /> Puma
                </label>
                <label className="block">
                  <input type="checkbox" className="mr-2" /> Reebok
                </label>
                <label className="block">
                  <input type="checkbox" className="mr-2" /> UnderArmour
                </label>
                <label className="block">
                  <input type="checkbox"  className="mr-2"/> Gucci
                </label>
                <label className="block" >
                  <input type="checkbox"  className="mr-2"/> Versace
                </label>
                <label className="block" >
                  <input type="checkbox"  className="mr-2"/> Armani
                </label>
                <label className="block" >
                  <input type="checkbox"  className="mr-2"/> Levi's
                </label>
                <label className="block" >
                  <input type="checkbox"  className="mr-2"/> Zara
                </label>
              </div>
              
            )}
          </div>
          <div>
            <div
              className="font-semibold text-lg mb-2 cursor-pointer"
              onClick={() => toggleSection("price")}
            >
              Ár
            </div>
            {expandedSections.price && (
              <div className="ml-2 mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span>Ft{priceRange[0]}</span>
                  <span>Ft{priceRange[1]}</span>
                </div>
                <input
                  type="range"
                  name="min"
                  min="0"
                  max="5000"
                  value={priceRange[0]}
                  onChange={handlePriceChange}
                  className="w-full mb-2"
                />
                <input
                  type="range"
                  name="max"
                  min="0"
                  max="30000"
                  value={priceRange[1]}
                  onChange={handlePriceChange}
                  className="w-full"
                />
              </div>
            )}
          </div>
          <div className="flex justify-between mt-4">
            <button
              className="bg-blue-500 text-white py-2 px-4 rounded-lg"
              onClick={() => console.log("Save view")}
            >
              Keresés
            </button>
            <button
              className="text-blue-500 underline"
              onClick={handleClearAll}
            >
              Törlés
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default FilterComponent;
