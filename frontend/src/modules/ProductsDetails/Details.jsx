import { useLocation } from "react-router";
import { useState } from "react";
import { Navbar } from "../../ui/components/Navbar";

export const Details = () => {
  const location = useLocation();
  const product = location.state?.product;
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);

  // Képek generálása: Feltételezzük, hogy product.Kep pl. "1.1.3.png" vagy "1.1.3"
  let images = [];
  if (product?.Kep) {
    let base = product.Kep.endsWith(".png")
      ? product.Kep.slice(0, -4)
      : product.Kep;
    const parts = base.split(".");
    if (parts.length === 3) {
      const [brand, color] = parts;
      // Csak az első 3 kép jelenjen meg, függetlenül attól, hogy a product.Kep melyik méretet mutatja
      images = [1, 2, 3].map(
        (size) => `/img/${brand}.${color}.${size}.png`
      );
    } else {
      images = [`/img/${base}.png`];
    }
  }

  const sizes = ["XS", "S", "M", "L", "XL", "XXL"];

  return (
    <section className="relative bg-gradient-to-r from-gray-100 to-gray-200 min-h-screen">
      <Navbar />
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-0 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mx-auto max-md:px-2">
          {/* Képek */}
          <div className="flex gap-4">
            {images.length > 0 ? (
              images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Termék ${product?.Marka} - kép ${index + 1}`}
                  className="w-1/3 h-auto object-cover cursor-pointer border-2 rounded"
                />
              ))
            ) : (
              <p>Nincs elérhető kép.</p>
            )}
          </div>

          {/* Termékadatok */}
          <div className="data w-full lg:pr-8 pr-0 flex flex-col items-start space-y-4">
            <p className="text-lg font-medium leading-8 text-indigo-600">
              Termékek&nbsp;/&nbsp;Pólók
            </p>
            <h2 className="font-bold text-3xl leading-10 text-gray-900 capitalize">
              {product?.Marka || "Nincs név"}
            </h2>
            <h6 className="font-semibold text-2xl text-gray-900">
              {product?.TermekAr} Ft
            </h6>

            {/* Extra információk */}
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <div className="flex-shrink-0 bg-purple-500 rounded-full w-6 h-6 flex items-center justify-center">
                  <svg
                    className="w-4 h-4 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <p className="text-gray-700">
                  Márka: {product?.Marka || "Ismeretlen"}
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <div className="flex-shrink-0 bg-purple-500 rounded-full w-6 h-6 flex items-center justify-center">
                  <svg
                    className="w-4 h-4 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <p className="text-gray-700">Pólók többszínben</p>
              </div>
              <div className="flex items-center space-x-2">
                <div className="flex-shrink-0 bg-purple-500 rounded-full w-6 h-6 flex items-center justify-center">
                  <svg
                    className="w-4 h-4 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <p className="text-gray-700">Tiszta pamut poló</p>
              </div>
              <div className="flex items-center space-x-2">
                <div className="flex-shrink-0 bg-purple-500 rounded-full w-6 h-6 flex items-center justify-center">
                  <svg
                    className="w-4 h-4 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <p className="text-gray-700">60% - 40%</p>
              </div>
              <div className="flex items-center space-x-2">
                <div className="flex-shrink-0 bg-purple-500 rounded-full w-6 h-6 flex items-center justify-center">
                  <svg
                    className="w-4 h-4 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <p className="text-gray-700">Összes méret elérhető</p>
              </div>
            </div>

            {/* Termék leírás */}
            <p className="text-gray-500 text-base">
              {product?.description || ""}
            </p>

            {/* Méretválasztó */}
            <div className="w-full">
              <p className="text-gray-600 font-medium mb-2">Méret:</p>
              <div className="flex gap-2">
                {sizes.map((size) => (
                  <button
                    key={size}
                    className={`px-4 py-2 border rounded ${
                      selectedSize === size
                        ? "bg-indigo-600 text-white"
                        : "border-gray-300"
                    }`}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Mennyiség választó és Kosárba rakom */}
            <div className="w-full flex flex-col gap-4 bg-white p-4 rounded-lg shadow">
              <div className="w-full">
                <p className="text-gray-600 font-medium mb-2">Mennyiség:</p>
                <div className="flex items-center gap-2">
                  <button
                    className="px-3 py-1 border rounded"
                    onClick={() =>
                      setQuantity(quantity > 1 ? quantity - 1 : 1)
                    }
                  >
                    -
                  </button>
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) =>
                      setQuantity(parseInt(e.target.value, 10) || 1)
                    }
                    className="w-16 text-center border rounded"
                  />
                  <button
                    className="px-3 py-1 border rounded"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    +
                  </button>
                </div>
              </div>
              <div className="w-full">
                <button
                  className="px-6 py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 w-full"
                  onClick={() =>
                    alert(
                      `Kosárba helyezve: ${product?.Marka}, Méret: ${selectedSize}, Mennyiség: ${quantity}`
                    )
                  }
                  disabled={!selectedSize}
                >
                  Kosárba rakom
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};
