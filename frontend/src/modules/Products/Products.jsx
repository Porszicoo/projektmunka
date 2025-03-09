import { useEffect, useState, useRef, useCallback } from "react";
import { CartIcon } from "../../ui/icons/CartIcon";
import { FormProvider, useForm } from "react-hook-form";
import { Input } from "../../ui/components/Input";
import { getProducts } from "./_api"; // A getProducts API hívás
import { Select } from "../../ui/components/Select";
import { useNavigate } from "react-router";

export const Products = () => {
  const useFormHooks = useForm();
  const { handleSubmit, watch } = useFormHooks;

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1); // Az aktuális oldalszám
  const [hasMore, setHasMore] = useState(true); // Van-e még betöltendő adat
  const navigate = useNavigate();

  // Toast állapotkezelés
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (message) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000); // 3 másodperc után eltűnik
  };

  // Termékek lekérdezése
  const fetchProducts = useCallback(
    async (field, size, brand, color, searchTerm, page = 1) => {
      setLoading(true);
      try {
        const response = await getProducts(field, size, brand, color, searchTerm); // Keresőmező és oldalszám átadása
        console.log("Válasz a backendtől:", response); // Válasz logolása

        if (response.length > 0) {
          setProducts((prevProducts) =>
            page === 1 ? response : [...prevProducts, ...response]
          ); // Hozzáadjuk az új termékeket a meglévőkhöz
        } else {
          setHasMore(false); // Nincs több betöltendő adat
        }
      } catch (error) {
        console.error("Hiba történt a termékek lekérése közben:", error);
      } finally {
        setLoading(false);
      }
    },
    []
  );

  // Alapból lekérdezzük a termékeket
  useEffect(() => {
    fetchProducts(); // Alapból lekérdezzük a termékeket
  }, [fetchProducts]);

  // Intersection Observer beállítása
  const observer = useRef(null);
  const lastProductElementRef = useCallback(
    (node) => {
      if (loading || !hasMore) return;

      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          setPage((prevPage) => prevPage + 1); // Növeljük az oldalszámot
        }
      });

      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  // Oldalszám változásakor új adatok betöltése
  useEffect(() => {
    if (page > 1) {
      fetchProducts(
        watch("search_field"),
        watch("size"),
        watch("brand"),
        watch("color"),
        watch("search"),
        page
      );
    }
  }, [page, fetchProducts, watch]);

  const handleFilter = async () => {
    const field = watch("search_field");
    const size = watch("size");
    const brand = watch("brand");
    const color = watch("color");
    const searchTerm = watch("search"); // Keresőmező értékének lekérdezése

    // Reseteljük az oldalszámot és a "hasMore" állapotot
    setPage(1);
    setHasMore(true);

    // Szűrési feltételek dinamikus kezelése
    await fetchProducts(
      field,
      size,
      brand === "Válassz Márkát" ? undefined : brand, // Ha a márka "Válassz Márkát", akkor ne küldjük el
      color === "Válassz Színt" ? undefined : color, // Ha a szín "Válassz Színt", akkor ne küldjük el
      searchTerm // Keresőmező átadása
    );
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

    // Toast megjelenítése
    showToast(`${product.Marka} (${product.Meret}, ${product.Szín}) hozzáadva a kosárhoz!`);
  };

  return (
    <FormProvider {...useFormHooks}>
      {/* Fix háttér */}
      <div
        className="fixed top-0 left-0 w-full h-full bg-cover bg-center bg-no-repeat z-[-1]"
        style={{ backgroundImage: "url(/background.2.png)" }}
      ></div>

      <main className="p-12">
        <header className="mb-12 flex items-center justify-center space-x-4">
          <Select
            name="search_field"
            label="Keresés"
            id="search_field"
            options={[
              { value: undefined, label: "Válassz" },
              { value: "Marka", label: "Márka" },
              { value: "Szín", label: "Színek" },
              { value: "Meret", label: "Méretek" },
            ]}
          />
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
              // További méretek...
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
              // További márkák...
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
              // További színek...
            ]}
          />

          <button
            onClick={handleSubmit(handleFilter)}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Szűrés
          </button>
        </header>

        <section className="grid grid-cols-4 gap-10">
          {loading && page === 1 ? (
            <p className="text-center text-gray-500">Betöltés...</p>
          ) : products.length > 0 ? (
            products.map((termekview, index) => {
              if (products.length === index + 1) {
                return (
                  <div
                    ref={lastProductElementRef}
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
                      <h5 className="text-xl tracking-tight text-slate-900">
                        {termekview.Marka}
                      </h5>
                      <div className="mt-2 flex justify-between items-center">
                        <p className="text-sm text-slate-700">
                          Szín: <span className="font-semibold">{termekview.Szín}</span>
                        </p>
                        <p className="text-sm text-slate-700">
                          Méret: <span className="font-semibold">{termekview.Meret}</span>
                        </p>
                        <p className="text-3xl font-bold text-slate-900">
                          {termekview.TermekAr} Ft
                        </p>
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
                );
              } else {
                return (
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
                      <h5 className="text-xl tracking-tight text-slate-900">
                        {termekview.Marka}
                      </h5>
                      <div className="mt-2 flex justify-between items-center">
                        <p className="text-sm text-slate-700">
                          Szín: <span className="font-semibold">{termekview.Szín}</span>
                        </p>
                        <p className="text-sm text-slate-700">
                          Méret: <span className="font-semibold">{termekview.Meret}</span>
                        </p>
                        <p className="text-3xl font-bold text-slate-900">
                          {termekview.TermekAr} Ft
                        </p>
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
                );
              }
            })
          ) : (
            <p className="text-center text-gray-500">Nincs találat a szűrés alapján.</p>
          )}
        </section>
      </main>

      {/* Toast üzenet */}
      {toastMessage && (
        <div className="fixed top-28 right-4 bg-gray-800 text-white px-4 py-2 rounded-md shadow-md transition-opacity duration-4000">
          {toastMessage}
        </div>
      )}
    </FormProvider>
  );
};