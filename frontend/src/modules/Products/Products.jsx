import { useEffect, useState } from "react";
import { CartIcon } from "../../ui/icons/CartIcon";
import { FormProvider, useForm } from "react-hook-form";
import { Input } from "../../ui/components/Input";
import { getProducts } from "./_api";
import { Select } from "../../ui/components/Select";
import { useNavigate } from "react-router"; 

export const Products = () => {
  const useFormHooks = useForm();
  const { handleSubmit } = useFormHooks;

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
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
  const fetchProducts = async (field, size, brand, color) => {
    console.log("Fetching products..."); // Debugging
    setLoading(true);
    try {
      const response = await getProducts(field, size, brand, color);
      console.log("Válasz a backendtől:", response); // Válasz logolása

      if (response.length > 0) {
        setProducts(response); // Frissítjük a termékek állapotát
      } else {
        console.log("Nincs találat a szűrés alapján."); // Debugging
        setProducts([]); // Ha nincs találat, ürítsük a termékek listáját
      }
    } catch (error) {
      console.error("Hiba történt a termékek lekérése közben:", error);
    } finally {
      setLoading(false);
    }
  };

  // Alapból lekérdezzük a termékeket
  useEffect(() => {
    fetchProducts(); // Alapból lekérdezzük a termékeket
  }, []);

  const handleFilter = async () => {
    const field = useFormHooks.watch("search_field");
    const size = useFormHooks.watch("size");
    const brand = useFormHooks.watch("brand");
    const color = useFormHooks.watch("color");

    // Ellenőrizzük, hogy van-e kiválasztott feltétel
    if (!field && !size && !brand && !color) {
      console.log("Nincs kiválasztott feltétel, reseteljük a termékeket.");
      setProducts([]); // Reseteljük a termékek listáját
      return; // Kilépünk a függvényből
    }

    await fetchProducts(field, size, brand, color); // Szűrési feltételek alapján lekérdezzük a termékeket
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
      <div className="fixed top-0 left-0 w-full h-full bg-cover bg-center bg-no-repeat z-[-1]" 
           style={{ backgroundImage: 'url(/background.2.png)' }}>
      </div>

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
              { value: "Meret", label: "Méretek" }
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
          
          <button onClick={handleSubmit(handleFilter)} className="bg-blue-500 text-white px-4 py-2 rounded">Szűrés</button>
        </header>

        <section className="grid grid-cols-4 gap-10">
          {loading ? (
            <p className="text-center text-gray-500">Betöltés...</p>
          ) : products.length > 0 ? (
            products.map((termekview, index) => (
              <div
                key={`${termekview.id || 'no-id'}-${termekview.Szín}-${termekview.Meret}-${index}`} // Alternatív kulcs
                className="relative flex w-full max-w-xs flex-col overflow-hidden rounded-lg border border-gray-100 bg-gray-100 shadow-md transition duration-300 ease-in-out hover:shadow-lg hover:-translate-y-2 cursor-pointer"
                onClick={() => navigate('/details', { state: { product: termekview } })}
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
            ))
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