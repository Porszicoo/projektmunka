import { useEffect, useState } from "react";
import { Skeleton } from "../../ui/components/Skeleton";
import { CartIcon } from "../../ui/icons/CartIcon";
import { FormProvider, useForm } from "react-hook-form";
import { Input } from "../../ui/components/Input";
import { getProducts } from "./_api";
import { Select } from "../../ui/components/Select";
import { Dialog } from "@headlessui/react";

export const Products = () => {
  const useFormHooks = useForm();
  const search = useFormHooks.watch("search");
  const searchField = useFormHooks.watch("search_field");

  const [pageSize, setPageSize] = useState(12);
  const [pageNumber, setPageNumber] = useState(0);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(1); // Start with the first image

  const searchOptions = [
    { value: undefined, label: "Select Option" },
    { value: "Marka", label: "Márka" },
    { value: "Szín", label: "Színek" },
    { value: "Meret", label: "Méretek" }
  ];

  const addToCart = (product) => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingProduct = cart.find(
      (item) => item.id === product.id && item.Szín === product.Szín && item.Meret === product.Meret
    );
    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }
    localStorage.setItem("cart", JSON.stringify(cart));
  };

  const fetchMoreProducts = async () => {
    setLoading(true);
    try {
      const response = await getProducts(search, searchField, pageSize, pageNumber);
      setProducts(response.data);
    } catch (error) {
      console.error("Hiba történt a termékek lekérése közben:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMoreProducts();
  }, [search, searchField, pageSize, pageNumber]);

  useEffect(() => {
    if (selectedProduct) {
      setCurrentImageIndex(1); // Reset image index when a new product is selected
    }
  }, [selectedProduct]);

  const handleNextImage = () => {
    if (currentImageIndex < 6) {
      setCurrentImageIndex(currentImageIndex + 1); // Increment the image index
    }
  };

  const handlePrevImage = () => {
    if (currentImageIndex > 1) {
      setCurrentImageIndex(currentImageIndex - 1); // Decrement the image index
    }
  };

  return (
    <FormProvider {...useFormHooks}>
      <main className="p-12 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: 'url(/background.2.png)' }}>
        <header className="mb-12 flex items-center justify-center space-x-4">
          <Select name="search_field" label="Keresés" id="search_field" options={searchOptions} />
          <Input name="search" label="Keresés" id="search" />
        </header>
        <section className="grid grid-cols-4 gap-10">
          {loading ? (
            Array(4).fill().map((_, index) => <Skeleton key={index} />)
          ) : (
            products.map((termekview) => (
              <div
                key={termekview.id}
                onClick={() => setSelectedProduct(termekview)}
                className="cursor-pointer bg-white relative flex w-full max-w-xs flex-col overflow-hidden rounded-2xl border border-gray-200 shadow-md transition duration-300 ease-in-out hover:shadow-lg hover:-translate-y-2 p-4"
              >
                <img
                  className="w-full h-60 object-contain transition-transform duration-300 ease-in-out hover:scale-105 hover:opacity-90"
                  src={`img/${termekview.Kep}.png`}
                  alt={termekview?.Marka || "Nincs kép"}
                  loading="lazy"
                />
                <div className="mt-4 px-5 pb-5">
                  <h5 className="text-xl tracking-tight text-slate-900">{termekview.Marka}</h5>
                  <p className="text-3xl font-bold text-slate-900">{termekview.TermekAr} Ft</p>
                </div>
              </div>
            ))
          )}
        </section>
        <Dialog open={selectedProduct !== null} onClose={() => setSelectedProduct(null)}>
  <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
    <div className="bg-white border border-gray-300 rounded-2xl p-8 w-[450px] max-w-full relative flex flex-col items-center shadow-xl">

      {/* Image Navigation */}
      <div className="flex justify-between items-center w-full mb-6">
        <button
          onClick={handlePrevImage}
          className="bg-gray-200 hover:bg-gray-300 p-3 rounded-full text-2xl font-bold transition-all duration-200 ease-in-out"
        >
          ◀
        </button>
        <img
          className="w-full h-60 object-contain mb-4 shadow-lg rounded-lg"
          src={`img/${selectedProduct?.Kep}.png`}  // Dynamically change image based on currentImageIndex
          alt={selectedProduct?.Marka || 'No Image'}
          loading="lazy"
        />
        <button
          onClick={handleNextImage}
          className="bg-gray-200 hover:bg-gray-300 p-3 rounded-full text-2xl font-bold transition-all duration-200 ease-in-out"
        >
          ▶
        </button>
      </div>

      {/* Product Details */}
      <div className="flex flex-col items-center w-full text-center mb-6">
        <h2 className="text-2xl font-bold text-slate-900 mb-2">{selectedProduct?.Marka}</h2>
        <p className="text-lg text-gray-600 mb-2">Szín: <span className="font-semibold">{selectedProduct?.Szín}</span></p>
        <p className="text-lg text-gray-600 mb-2">Méretek: <span className="font-semibold">{selectedProduct?.Meret}</span></p>
        <p className="text-xl font-bold text-green-600 mb-4">{selectedProduct?.TermekAr} Ft</p>
      </div>

      {/* Action Buttons */}
      <div className="flex space-x-4 w-full justify-center">
        <button
          onClick={() => addToCart(selectedProduct)}
          className="bg-green-500 text-white px-6 py-3 rounded-lg text-lg font-medium hover:bg-green-600 transition-all duration-200"
        >
          Kosárba
        </button>
        <button
          onClick={() => setSelectedProduct(null)}
          className="bg-red-500 text-white px-6 py-3 rounded-lg text-lg font-medium hover:bg-red-600 transition-all duration-200"
        >
          Bezárás
        </button>
      </div>
    </div>
  </div>
</Dialog>
      </main>
    </FormProvider>
  );
};
