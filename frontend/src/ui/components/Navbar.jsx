import { useNavigate } from "react-router";
import { useLocation } from "react-router";
import { useState } from "react";
import { Cart } from "./Cart";
import { DropDown } from "./DropDown";
import FilterComponent from "./FilterWithSearcBar";

export const Navbar = () => {
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

      {/* Kereső megjelenítése csak a Termékeink oldalon */}
      {showSearchBar && (
        <div className="flex justify-center mt-4">
          <FilterComponent />
        </div>
      )}
    </nav>
  );
};
