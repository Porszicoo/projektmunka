import { useState } from "react";

export const PriceRange = ({ onPriceChange }) => {
  const [priceRange, setPriceRange] = useState([0, 20000]); // Min és Max ár

  const handlePriceChange = (event) => {
    const { name, value } = event.target;
    const numericValue = Number(value);

    setPriceRange((prevRange) => {
      const newRange =
        name === "minPrice"
          ? [Math.min(numericValue, prevRange[1]), prevRange[1]]
          : [prevRange[0], Math.max(numericValue, prevRange[0])];

      // Visszaküldjük a frissített árakat a szülő komponensnek
      onPriceChange && onPriceChange({
        minPrice: newRange[0],
        maxPrice: newRange[1],
      });
      return newRange;
    });
  };

  return (
    <div className="flex flex-col w-full max-w-md bg-white p-4 shadow-md rounded-md">
      <label className="mb-2 text-sm font-medium text-gray-700">Árkategória</label>

      {/* Megjelenített minimum és maximum ár */}
      <div className="flex items-center justify-between text-sm text-gray-700 mb-2">
        <span>{priceRange[0].toLocaleString()} Ft</span>
        <span>{priceRange[1].toLocaleString()} Ft</span>
      </div>

      {/* Csúszka (range input) */}
      <input
        type="range"
        name="minPrice"
        min="0"
        max="20000"
        step="500"
        value={priceRange[0]}
        onChange={handlePriceChange}
        className="w-full accent-blue-500"
      />
      <input
        type="range"
        name="maxPrice"
        min="0"
        max="20000"
        step="500"
        value={priceRange[1]}
        onChange={handlePriceChange}
        className="w-full accent-blue-500"
      />
    </div>
  );
};