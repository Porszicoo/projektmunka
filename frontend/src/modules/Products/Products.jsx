import { useEffect, useState, useRef, useCallback } from "react";
import { CartIcon } from "../../ui/icons/CartIcon";
import { FormProvider, useForm } from "react-hook-form";
import { Input } from "../../ui/components/Input";
import { getProducts } from "./_api";
import { Select } from "../../ui/components/Select";
import { useNavigate } from "react-router";
import { PriceRange } from "../../ui/components/PriceRange";
import { Skeleton } from "../../ui/components/Skeleton";

export const Products = () => {
  const useFormHooks = useForm();
  const { handleSubmit, watch } = useFormHooks;

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const navigate = useNavigate();

  const [toastMessage, setToastMessage] = useState(null);
  const showToast = (message) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(20000);

  const fetchProducts = useCallback(
    async (field, size, brand, color, searchTerm, minPrice, maxPrice, page = 1) => {
      console.log("Fetching products...", page);
      setLoading(true);
      
      const limit = 20; // Limit beállítása 20-ra
      const offset = (page - 1) * limit; // Offset számítása

      try {
        const response = await getProducts(
          field, 
          size, 
          brand, 
          color, 
          searchTerm,
          minPrice,
          maxPrice,
          limit, // Limit átadása
          offset // Offset átadása
        );
        console.log("Válasz a backendtől:", response);
  
        if (response.length > 0) {
          setProducts((prevProducts) => {
            const newProducts = response.filter(
              (newProduct) =>
                !prevProducts.some((prevProduct) => prevProduct.id === newProduct.id)
            );
  
            return page === 1 ? response : [...prevProducts, ...newProducts];
          });
        } else {
          setHasMore(false);
        }
      } catch (error) {
        console.error("Hiba történt a termékek lekérése közben:", error);
      } finally {
        setLoading(false);
      }
    },
    []
  );

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const observer = useRef(null);
  const lastProductElementRef = useCallback(
    (node) => {
      if (loading || !hasMore) return;

      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          setPage((prevPage) => prevPage + 1);
        }
      });

      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  const searchField = watch("search_field");
  const size = watch("size");
  const brand = watch("brand");
  const color = watch("color");
  const search = watch("search");

  useEffect(() => {
    if (page > 1) {
      fetchProducts(searchField, size, brand, color, search, minPrice, maxPrice, page);
    }
  }, [page, minPrice, maxPrice]);

  const handleFilter = async () => {
    const field = watch("search_field");
    const size = watch("size");
    const brand = watch("brand");
    const color = watch("color");
    const searchTerm = watch("search");
  
    const hasFilter = field || size || brand || color || searchTerm;
  
    setPage(1);
    setHasMore(true);
    setProducts([]);
  
    if (!hasFilter) {
      await fetchProducts();
    } else {
      await fetchProducts(
        field,
        size === "Válassz Méretet" ? undefined : size,
        brand === "Válassz Márkát" ? undefined : brand,
        color === "Válassz Színt" ? undefined : color,
        searchTerm,
        minPrice,
        maxPrice
      );
    }
  };

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
    window.dispatchEvent(new Event("cartUpdated"));

    showToast(`${product.Marka} (${product.Meret}, ${product.Szín}) hozzáadva a kosárhoz!`);
  };

  return (
    <FormProvider {...useFormHooks}>
      <div
        className="fixed top-0 left-0 w-full h-full bg-cover bg-center bg-no-repeat z-[-1]"
        style={{ backgroundImage: "url(/background.2.png)" }}
      ></div>

      <main className="p-12">
        <header className="mb-12 flex flex-wrap items-center justify-center gap-4">
          <Input name="search" label="Keresés" id="search" />

          <Select
            name="size"
            label="Méret"
            id="size"
            options={[
              { value: undefined, label: "Válassz Méretet" },
              { value: "XS", label: "XS" },
              { value: "S", label: "S" },
              { value: "M", label: "M" },
              { value: "L", label: "L" },
              { value: "XL", label: "XL" },
              { value: "XXL", label: "XXL" },
            ]}
          />

          <Select
            name="brand"
            label="Márka"
            id="brand"
            options={[
              { value: undefined, label: "Válassz Márkát" },
              { value: "Adidas", label: "Adidas" },
              { value: "Nike", label: "Nike" },
              { value: "Levis", label: "Levis" },
              { value: "Under Armour", label: "Under Armour" },
              { value: "Gucci", label: "Gucci" },
              { value: "Emporio Armani", label: "Emporio Armani" },
              { value: "Reebok", label: "Reebok" },
              { value: "Versace", label: "Versace" },
              { value: "Zara", label: "Zara" },
            ]}
          />

          <Select
            name="color"
            label="Szín"
            id="color"
            options={[
              { value: undefined, label: "Válassz Színt" },
              { value: "Piros", label: "Piros" },
              { value: "Kék", label: "Kék" },
              { value: "Zöld", label: "Zöld" },
              { value: "Sárga", label: "Sárga" },
              { value: "Fekete", label: "Fekete" },
              { value: "Fehér", label: "Fehér" },
              { value: "Lila", label: "Lila" },
              { value: "Bézs", label: "Bézs" },
              { value: "Barna", label: "Barna" },
              { value: "Szürke", label: "Szürke" },
            ]}
          />

          <PriceRange
            onPriceChange={({ minPrice, maxPrice }) => {
              setMinPrice(minPrice);
              setMaxPrice(maxPrice);
              console.log(`Received minPrice: ${minPrice}, maxPrice: ${maxPrice}`); // Debugging

              // Azonnali termékek lekérése a frissített árakkal
              fetchProducts(searchField, size, brand, color, search, minPrice, maxPrice, page);
            }}
          />

          <button
            onClick={handleSubmit(handleFilter)}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Szűrés
          </button>
        </header>

        <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
          {loading && page === 1 ? (
            <p className="text-center text-gray-500 flex-row grid grid-cols-1">
              <Skeleton />
              Betöltés...
            </p>
          ) : products.length > 0 ? (
            products.map((termekview, index) => (
              <div
                key={`${termekview.TermekID || "no-id"}-${termekview.Szín}-${termekview.Meret}-${index}`}
                className="relative flex w-full max-w-xs flex-col overflow-hidden rounded-lg border border-gray-100 bg-gray-100 shadow-md transition duration-300 ease-in-out hover:shadow-lg hover:-translate-y-2 cursor-pointer"
                onClick={() => navigate("/details", { state: { product: termekview } })}
              >
                <div className="relative h-60 p-2 bg-gray-100 flex items-center justify-center border border-gray-300 overflow-hidden rounded-lg">
                  <img
                    className="w-full h-full object-contain shadow-md rounded-md transition-transform duration-300 ease-in-out hover:scale-105 hover:opacity-90"
                    src={`img/${termekview.Kep}.png` || "/outofstock.png"}
                    alt={termekview?.Ar || "Nincs kép"}
                    loading="lazy"
                  />
                </div>

                <div className="mt-4 px-5 pb-5">
                  <h5 className="text-xl tracking-tight text-slate-900">{termekview.Marka}</h5>
                  <div className="mt-2 flex justify-between items-center">
                    <p className="text-sm text-slate-700">Szín: <span className="font-semibold">{termekview.Szín}</span></p>
                    <p className="text-sm text-slate-700">Méret: <span className="font-semibold">{termekview.Meret}</span></p>
                    <p className="text-3xl font-bold text-slate-900">{termekview.TermekAr} Ft</p>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      addToCart(termekview);
                    }}
                    className="flex items-center justify-center mt-2 rounded-md bg-slate-900 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gray-700"
                  >
                    <CartIcon />
                    <p>Kosárba</p>
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">Nincs találat a szűrés alapján.</p>
          )}
        </section>
      </main>

      {/* Toast message for cart update */}
      {toastMessage && (
        <div
          className="fixed top-20 right-4 bg-black text-white py-2 px-4 rounded-md shadow-md"
          style={{ zIndex: 9999 }}
        >
          {toastMessage}
        </div>
      )}
    </FormProvider>
  );
};
