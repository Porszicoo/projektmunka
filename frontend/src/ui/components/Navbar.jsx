import { useNavigate } from "react-router";
import { useLocation } from "react-router";
import { useState } from "react";
import { Cart } from "./Cart";
import { DropDown } from "./DropDown";

export const Navbar = ({Brand, setBrand}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const showSearchBar = location.pathname === "/webshop";

  // State a lenyíló menü kezelésére
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <nav className="flex flex-col bg-black w-full px-20 py-4">
      {/* Felső sor: Menü és Kosár */}
      <section className="flex justify-between items-center">
        <div className="flex items-center gap-x-12">
          <img src={"logo.png"} alt="Logo" className="w-16 h-auto" />
          <ul className="flex items-center space-x-6">
            <li className="font-semibold text-white hover:text-gray-300 cursor-pointer" onClick={() => navigate("/")}>Kezdőoldal</li>
            <li className="font-semibold text-white hover:text-gray-300 cursor-pointer" onClick={() => navigate("/partnerek")}>Partnereink</li>
            <li className="font-semibold text-white hover:text-gray-300 cursor-pointer" onClick={() => navigate("/webshop")}>Termékeink</li>
            <li className="font-semibold text-white hover:text-gray-300 cursor-pointer" onClick={() => navigate("/rolunk")}>Rólunk</li>
            <li className="font-semibold text-white hover:text-gray-300 cursor-pointer" onClick={() => navigate("/kapcsolat")}>Kapcsolat</li>
          </ul>
        </div>

        <div className="flex items-center gap-x-6">
          <Cart />
          <DropDown />
        </div>
      </section>

      {/* Második sor: Keresőmező */}
      {showSearchBar && (
        <section className="flex justify-center mt-4">
          <form className="relative w-full max-w-lg">
            <div className="flex w-full">
              {/* Kategória választó gomb */}
              <button
                type="button"
                className="shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-gray-900 bg-gray-100 border border-gray-300 rounded-s-lg hover:bg-gray-200 focus:outline-none"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                Márkák
                <svg className="w-2.5 h-2.5 ml-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                </svg>
              </button>

              {/* Dropdown menü (ha isDropdownOpen true, akkor megjelenik) */}
              {isDropdownOpen && (
                <div className="absolute mt-10 left-0 bg-white divide-y divide-gray-100 rounded-lg shadow-md w-44 dark:bg-gray-700 z-50">
                  <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
                    <li><button  type="button" className="w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Adidas</button></li>
                    <li><button type="button" className="w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Nike</button></li>
                    <li><button type="button" className="w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Gucci</button></li>
                    <li><button type="button" className="w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Underarmour</button></li>
                    <li><button type="button" className="w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Reebok</button></li>
                    <li><button type="button" className="w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Armani</button></li>
                    <li><button type="button" className="w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Levis</button></li>
                    <li><button type="button" className="w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Puma</button></li>
                    <li><button type="button" className="w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Levis</button></li>
                  </ul>
                </div>
              )}

              {/* Keresőmező */}
              <input type="search" id="search-dropdown" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-e-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500" placeholder="Keresés..." required />
              <button type="submit" className="absolute top-0 right-0 p-2.5 text-sm font-medium h-full text-white bg-yellow-500 rounded-e-lg border border-yellow-700 hover:bg-yellow-600">
                <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                </svg>
                <span className="sr-only">Keresés</span>
              </button>
            </div>
          </form>
        </section>
      )}
    </nav>
  );
};
