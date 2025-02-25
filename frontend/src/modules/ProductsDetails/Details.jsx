import { useLocation } from "react-router";
import { useState, useEffect } from "react";
import { Navbar } from "../../ui/components/Navbar";

const addToCart = (product) => {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const existingProduct = cart.find(
    (item) => item.id === product.id && item.Szín === product.Szín && item.Meret === product.Meret
  );

  if (existingProduct) {
    existingProduct.quantity += product.quantity;
  } else {
    cart.push({ ...product, quantity: product.quantity });
  }
  localStorage.setItem("cart", JSON.stringify(cart));
  window.dispatchEvent(new Event("cartUpdated"));
};


export const Details = () => {
  const location = useLocation();
  const product = location.state?.product;
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(null); // A nagy képhez
  // Default a product.colors tömb első elemének nevét használjuk, ha létezik
  const [selectedColor, setSelectedColor] = useState(product?.colors?.[0]?.name || "");

  let images = [];
  let brand = "";
  let defaultColor = "";
  if (product?.Kep) {
    let base = product.Kep.endsWith(".png") ? product.Kep.slice(0, -4) : product.Kep;
    const parts = base.split(".");
    if (parts.length === 3) {
      [brand, defaultColor] = parts;
      // Ha a felhasználó már választott színt, azt használjuk, egyébként a default-ot
      const colorToUse = selectedColor || defaultColor;
      images = [1, 2, 3].map(
        (size) => `/img/${brand}.${colorToUse}.${size}.png`
      );
    } else {
      images = [`/img/${base}.png`];
    }
  }

  // useEffect: amikor a selectedColor változik, állítsuk be a nagy kép URL-jét
  useEffect(() => {
    if (brand && selectedColor) {
      const newImage = `/img/${brand}.${selectedColor}.1.png`;
      setSelectedImage(newImage);
    }
  }, [selectedColor, brand]);

  // Elérhető színek: ha product.colors nem definiált, fallbackként egy alap lista kerül használatra
  let availableColors = [];
  if (product?.colors && product.colors.length > 0) {
    availableColors = product.colors;
  } else if (brand) {
    const colorMap = {
      Piros: "#ff0000",  // Piros
      Kék: "#0000ff",  // Kék
      Zöld: "#00ff00",  // Zöld
      Sárga: "#ffff00",  // Sárga
      Fekete: "#000000",  // Fekete
      Fehér: "#ffffff",  // Fehér
      Lila: "#800080",  // Lila
      Bézs: "#f5f5dc",  // Bézs
      Barna: "#a52a2a",  // Barna
      Szürke: "#808080"  // Szürke
    };
    availableColors = Object.keys(colorMap).map((name) => ({
      name,
      hex: colorMap[name]
    }));
  }

  const sizes = ["XS", "S", "M", "L", "XL", "XXL"];

  return (
    <section className="relative bg-gradient-to-r from-gray-100 to-gray-200 min-h-screen">
      <Navbar />
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-0 py-8 ">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mx-auto max-md:px-2">
          {/* Bal oldal: Képek és színválasztó */}
          <div className="flex flex-col gap-4">
            <div className="flex gap-4">
              {images.length > 0 ? (
                images.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`Termék ${product?.Marka} - kép ${index + 1}`}
                    onClick={() => setSelectedImage(image)}
                    className="w-1/3 h-auto object-cover cursor-pointer border-2 rounded"
                  />
                ))
              ) : (
                <p>Nincs elérhető kép.</p>
              )}
            </div>
            {availableColors.length > 0 && brand && (
  <div className="w-full flex flex-col items-start space-y-6 mt-6 p-4 bg-gray-100 rounded-xl shadow-md">
    <h3 className="text-lg font-semibold text-gray-800">Elérhető színek:</h3>
    <div className="flex gap-5 flex-wrap justify-start">
      {availableColors.map((color, index) => (
        <div key={color.name} className="flex flex-col items-center group w-20">
          <div className="w-16 h-16 rounded-full border-[1.5px] border-gray-300 overflow-hidden flex items-center justify-center transition-all duration-300 ease-in-out transform group-hover:scale-110 group-hover:shadow-lg group-hover:border-indigo-500">
            <img
              src={`/img/${product.Kep.split('.')[0]}.${index+1}.${product.Kep.split('.')[2]}.png`}
              alt={`${color.name} változat`}
              onClick={() => setSelectedColor(color.name)}
              className={`w-full h-full object-cover cursor-pointer transition-all duration-300 ease-in-out transform group-hover:scale-110 ${
                selectedColor === color.name ? "border-indigo-600 scale-110 shadow-lg" : "border-gray-300"
              }`}
            />
          </div>
          <span className="mt-2 text-center text-gray-700 text-sm font-medium group-hover:text-indigo-600">
            {color.name}
          </span>
        </div>
      ))}
    </div>
  </div>
)}
          </div>
          {/* Jobb oldal: Termékadatok */}
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
                    onClick={() => setQuantity(quantity > 1 ? quantity - 1 : 1)}
                  >
                    -
                  </button>
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(parseInt(e.target.value, 10) || 1)}
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
                  className="px-6 py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 w-full cursor-pointer"
                  onClick={() => {
                    if (!selectedSize) {
                      alert("Válassz egy méretet!");
                      return;
                    }
                    const productToAdd = {
                      id: product.id,
                      Marka: product.Marka,
                      TermekAr: product.TermekAr,
                      Szín: selectedColor,
                      Meret: selectedSize,
                      quantity,
                      Kep: selectedImage || product.Kep,
                    };
                    addToCart(productToAdd);
                  }}
                  disabled={!selectedSize}
                >
                  Kosárba rakom
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Nagy kép modál */}
{selectedImage && (
  <div
    className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    onClick={() => setSelectedImage(null)}
  >
    <div
      className="relative bg-white p-4 rounded shadow-lg flex items-center"
      onClick={(e) => e.stopPropagation()}
    >
      {/* Bal nyíl */}
      <button
        className="absolute left-0 ml-2 text-black p-2"
        onClick={(e) => {
          e.stopPropagation();
          const currentIndex = images.indexOf(selectedImage);
          const prevIndex = (currentIndex - 1 + images.length) % images.length;
          setSelectedImage(images[prevIndex]);
        }}
      >
        ◀
      </button>
      
      {/*if(selectedImage.split(".")[1] == "Piros")) */}
      <img
        src={selectedImage}
        alt="Nagy kép"
        className="max-w-full max-h-full rounded"
      />
      
      {/* Jobb nyíl */}
      <button
        className="absolute right-0 mr-2 text-black p-2"
        onClick={(e) => {
          e.stopPropagation();
          const currentIndex = images.indexOf(selectedImage);
          const nextIndex = (currentIndex + 1) % images.length;
          setSelectedImage(images[nextIndex]);
        }}
      >
        ▶
      </button>
      
      {/* Bezárás gomb */}
      <button
        className="absolute top-0 right-0 m-2 text-black"
        onClick={() => setSelectedImage(null)}
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>
  </div>
)}
</section>
);
};
