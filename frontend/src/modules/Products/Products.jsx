import { useEffect, useState } from "react";
import { Skeleton } from "../../ui/components/Skeleton";
import { CartIcon } from "../../ui/icons/CartIcon";
import { FormProvider, useForm } from "react-hook-form";
import { Input } from "../../ui/components/Input";
import { getProducts } from "./_api";
import { Select } from "../../ui/components/Select";

export const Products = () => {
  const useFormHooks = useForm();
  const search = useFormHooks.watch("search");
  const searchField = useFormHooks.watch("search_field");

  const [pageSize, SetPageSize] = useState(12);
  const [pageNumber, SetPageNumber] = useState(0);

  const searchOptions = [
    { value: undefined, label: "Select Option" },
    { value: "Marka", label: "Márka" },
    { value: "Szín", label: "Színek" },
    { value: "Meret", label: "Méretek"}
  ];

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchMoreProducts = async () => {
    setLoading(true);
    try {
      const response = await getProducts(
        search,
        searchField,
        pageSize,
        pageNumber
      );
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

  return (
    <FormProvider {...useFormHooks}>
      <main className="p-12">
        <header className="mb-12 flex items-center justify-center space-x-4">
          <Select
            name="search_field"
            label="Keresés"
            id="search_field"
            options={searchOptions}
          />
          <Input name="search" label="Keresés" id="search" />
        </header>
        <section className="grid grid-cols-4 gap-10">
          {loading ? (
            <>
              <Skeleton />
              <Skeleton />
              <Skeleton />
              <Skeleton />
            </>
          ) : (
            products.map((termekview) => (
              <div
                key={termekview.id}
                className="relative flex w-full max-w-xs flex-col overflow-hidden rounded-lg border border-gray-100 bg-gray-100 shadow-md transition duration-300 ease-in-out hover:shadow-lg hover:-translate-y-2"
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
                      Szín:{" "}
                      <span className="font-semibold">{termekview.Szín}</span>
                    </p>
                    <p className="text-sm text-slate-700">
                      Méret:{" "}
                      <span className="font-semibold">{termekview.Meret}</span>
                    </p>
                    <p className="text-3xl font-bold text-slate-900">
                      {termekview.TermekAr} Ft
                    </p>
                  </div>
                  <div className="flex items-center justify-center mt-2 rounded-md bg-slate-900 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-300">
                    <CartIcon />
                    <p>Kosarba</p>
                  </div>
                </div>
              </div>
            ))
          )}
          {loading && (
            <p className="text-center text-gray-500">
              További termékek betöltése...
            </p>
          )}
        </section>
      </main>
    </FormProvider>
  );
};
