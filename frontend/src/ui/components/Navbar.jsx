import { useNavigate } from "react-router";
import { SearchIcon } from "../icons/SearchIcon";
import { Cart } from "./Cart";

export const Navbar = () => {
  const navigate = useNavigate();

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
            Rolunk
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
        <div className="border w-fit rounded-xl m-5 shadow-sm flex items-center">
          <button className="px-4 py-2 rounded-l-xl text-white m-0 bg-red-500 hover:bg-red-600 transition">
            Belépés
          </button>
          <button className="px-4 py-2 rounded-r-xl bg-neutral-50 hover:bg-neutral-100 transition">
            Regisztráció
          </button>
        </div>
      </section>
    </nav>
  );
};
