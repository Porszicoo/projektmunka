import { useEffect, useState, useRef } from "react";
import { Skeleton } from "../../ui/components/Skeleton";
import { CartIcon } from "../../ui/icons/CartIcon";
import { FormProvider, useForm } from "react-hook-form";
import { Input } from "../../ui/components/Input";
import { getProducts } from "./_api";
import { Select } from "../../ui/components/Select";
import { useNavigate } from "react-router"; 

export const Products = () => {
  const useFormHooks = useForm();
  const search = useFormHooks.watch("search");
  const searchField = useFormHooks.watch("search_field");

  const [pageSize] = useState(12);
  const [pageNumber, setPageNumber] = useState(0);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const observerRef = useRef(null);

  const navigate = useNavigate(); 

  const fetchMoreProducts = async () => {
    setLoading(true);
    try {
      const response = await getProducts(search, searchField, pageSize, pageNumber);
      if (response.data.length > 0) {
        setProducts(prevProducts => [...prevProducts, ...response.data]);
        setPageNumber(prevPageNumber => prevPageNumber + 1);
      }
    } catch (error) {
      console.error("Hiba történt a termékek lekérése közben:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMoreProducts();
  }, [search, searchField]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading) {
          fetchMoreProducts();
        }
      },
      { threshold: 1.0 }
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => {
      if (observerRef.current) {
        observer.unobserve(observerRef.current);
      }
    };
  }, [loading]);

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
              { value: undefined, label: "Select Option" },
              { value: "Marka", label: "Márka" },
              { value: "Szín", label: "Színek" },
              { value: "Meret", label: "Méretek" }
            ]}
          />
          <Input name="search" label="Keresés" id="search" />
        </header>
        
        <section className="grid grid-cols-4 gap-10">
          {products.map((termekview) => (
            <div
              key={termekview.id}
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
                                      e.stopPropagation(); // Megakadályozza, hogy a kattintás a kártyára is érvényes legyen
                                      addToCart(termekview);
                                    }}
                                    className="flex items-center justify-center mt-2 rounded-md bg-slate-900 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gray-700"
                                  >
                                    <CartIcon />
                                    <p>Kosárba</p>
                                  </button>
                                </div>
                              </div>
                            ))}
                            
                            {/* Ha az observer eléri ezt a divet, betölti a következő oldalt */}
                            <div ref={observerRef} className="h-10 w-full"></div>
                  
                            {loading && (
                              <p className="text-center text-gray-500">További termékek betöltése...</p>
                            )}
                          </section>
                        </main>
                      </FormProvider>
                    );
                  };