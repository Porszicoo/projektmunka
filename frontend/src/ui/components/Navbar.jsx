import { useNavigate } from "react-router";
import { SearchIcon } from "../icons/SearchIcon";
import { Cart } from "./Cart";
import { useLocation } from "react-router";
import { DropDown } from "./DropDown";

export const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const showSearchBar = location.pathname === "/webshop";

  return (
    <nav className="flex justify-between px-20 py-6 items-center bg-black w-full">
      {/* Bal oldal: Logo + Menü */}
      <section className="flex items-center gap-x-12">
        <img src={"logo.png"} alt="Logo" className="w-16 h-auto" />
        <ul className="flex items-center space-x-6">
          <li className="font-semibold text-white hover:text-gray-300 cursor-pointer" onClick={() => navigate("/")}>Kezdőoldal</li>
          <li className="font-semibold text-white hover:text-gray-300 cursor-pointer" onClick={() => navigate("/partnerek")}>Partnereink</li>
          <li className="font-semibold text-white hover:text-gray-300 cursor-pointer" onClick={() => navigate("/webshop")}>Termékeink</li>
          <li className="font-semibold text-white hover:text-gray-300 cursor-pointer" onClick={() => navigate("/rolunk")}>Rólunk</li>
          <li className="font-semibold text-white hover:text-gray-300 cursor-pointer" onClick={() => navigate("/kapcsolat")}>Kapcsolat</li>
        </ul>
      </section>

      {/* Jobb oldal: Searchbar (csak a Termékeink oldalon) + Kosár + DropDown */}
      <section className="flex items-center gap-x-6 justify-end relative w-full max-w-lg">
        {showSearchBar && (
          <form className="relative w-full">
            <div className="flex w-full">
              {/* Kategória választó gomb */}
              <button id="dropdown-button" data-dropdown-toggle="dropdown" className="shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-s-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600">
                Kategóriák
                <svg className="w-2.5 h-2.5 ml-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                </svg>
              </button>

              {/* Dropdown menü (megfelelően pozicionálva) */}
              <div id="dropdown" className="absolute left-0 mt-1 w-full bg-white divide-y divide-gray-100 rounded-lg shadow-md dark:bg-gray-700 z-50 hidden">
                <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdown-button">
                  <li><button type="button" className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Mockups</button></li>
                  <li><button type="button" className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Templates</button></li>
                  <li><button type="button" className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Design</button></li>
                  <li><button type="button" className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Logos</button></li>
                </ul>
              </div>

              {/* Keresőmező */}
              <div className="relative w-full">
                <input type="search" id="search-dropdown" className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-e-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500" placeholder="Keresés..." required />
                <button type="submit" className="absolute top-0 right-0 p-2.5 text-sm font-medium h-full text-white bg-yellow-500 rounded-e-lg border border-yellow-700 hover:bg-yellow-600 focus:ring-4 focus:outline-none focus:ring-yellow-300 dark:bg-yellow-600 dark:hover:bg-yellow-700 dark:focus:ring-yellow-800">
                  <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                  </svg>
                  <span className="sr-only">Keresés</span>
                </button>
              </div>
            </div>
          </form>
        )}

        <Cart />
        <DropDown />
      </section>
    </nav>
  );
};





