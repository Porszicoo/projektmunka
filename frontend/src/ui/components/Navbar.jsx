import { useNavigate } from "react-router";
import { SearchIcon } from "../icons/SearchIcon";
import { Cart } from "./Cart";
import { useLocation } from "react-router";

export const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const hideAuthButton = location.pathname === "/login" || location.pathname === "/register";

  return (
    <nav className="flex justify-between px-20 py-10 items-center bg-black w-full">
      <section className="flex items-center gap-x-12">
        <img src={"logo.png"} alt="Logo" className="w-16 h-auto" />
        <ul className="flex items-center space-x-6">
          <li
            className="font-semibold text-white hover:text-gray-300 cursor-pointer"
            onClick={() => {
              navigate("/");
            }}
          >
            Kezdőoldal
          </li>
          <li
            className="font-semibold text-white hover:text-gray-300 cursor-pointer"
            onClick={() => {
              navigate("/partnerek");
            }}
          >
            Partnereink
          </li>
          <li
            className="font-semibold text-white hover:text-gray-300 cursor-pointer"
            onClick={() => {
              navigate("/webshop");
            }}
          >
            Termékeink
          </li>
          <li
            className="font-semibold text-white hover:text-gray-300 cursor-pointer"
            onClick={() => {
              navigate("/rolunk");
            }}
          >
            Rólunk
          </li>
          <li
            className="font-semibold text-white hover:text-gray-300 cursor-pointer"
            onClick={() => {
              navigate("/kapcsolat");
            }}
          >
            Kapcsolat
          </li>
        </ul>
      </section>
      <section className="flex items-center ">
        <div className="flex items-center border rounded-lg mx-4 bg:bg-black">
          <SearchIcon />
          <input
            className="ml-2 outline-none bg-transparent p-2"
            type="text"
            name="search"
            id="search"
            placeholder="Keresés..."
          />
        </div>
        <Cart />
      </section>
      
      <section className="flex items-center gap-x-2">
        {!hideAuthButton && (
          <>
            <button
              className="px-4 py-2 rounded-xl text-white m-0 bg-red-500 hover:bg-red-600 transition"
              onClick={() => navigate("/login")}
            >
              Belépés
            </button>
            <button
              className="px-4 py-2 rounded-xl bg-neutral-50 hover:bg-neutral-100 transition"
              onClick={() => navigate("/register")}
            >
              Regisztráció
            </button>
          </>
        )}
      </section>
    </nav>
  );
};
