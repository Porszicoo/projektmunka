import { useState } from "react";
import { useNavigate } from "react-router";
import { Cart } from "./Cart";
import { DropDown } from "./DropDown";

export const Navbar = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-black w-full px-6 md:px-20 py-4 relative z-50">
      {/* Felső sor: Menü és Kosár */}
      <section className="flex justify-between items-center">
        <div className="flex items-center gap-x-6 md:gap-x-12">
          {/* Logo */}
          <img src={"logo.png"} alt="Logo" className="w-12 md:w-16 h-auto" />

          {/* Hamburger ikon mobil nézetben */}
          <button
            className="md:hidden text-white focus:outline-none z-50 relative"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <svg
              className="w-8 h-8"
              fill="none"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {menuOpen ? (
                // X ikon, ha a menü nyitva van
                <path
                  d="M6 18L18 6M6 6l12 12"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              ) : (
                // Hamburger ikon, ha a menü zárva van
                <path
                  d="M4 6h16M4 12h16m-16 6h16"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              )}
            </svg>
          </button>

          {/* Navigációs menü (mobilon rejtett, hamburger ikonra nyílik) */}
          <ul
            className={`${
              menuOpen
                ? "flex flex-col space-y-4 fixed top-16 left-0 w-full bg-black z-40 py-4 text-center"
                : "hidden"
            } md:flex md:flex-row md:items-center md:space-x-6 md:space-y-0 md:static md:bg-transparent`}
          >
            {[
              { text: "Kezdőoldal", path: "/" },
              { text: "Partnereink", path: "/partnerek" },
              { text: "Termékeink", path: "/webshop" },
              { text: "Rólunk", path: "/rolunk" },
              { text: "Kapcsolat", path: "/kapcsolat" },
            ].map(({ text, path }) => (
              <li
                key={text}
                className="font-semibold text-white cursor-pointer relative group py-2 md:py-0"
                onClick={() => {
                  navigate(path);
                  setMenuOpen(false); // Menü bezárása kattintás után mobilon
                }}
              >
                {text}
                {/* Aláhúzás hover hatás */}
                <span className="absolute left-0 right-0 bottom-0 h-0.5 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
              </li>
            ))}
          </ul>
        </div>

        {/* Kosár és DropDown - mobilon is fix helyen marad */}
        <div className="flex items-center gap-x-4 md:gap-x-6">
          <Cart />
          <DropDown />
        </div>
      </section>
    </nav>
  );
};
