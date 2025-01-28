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
        <Cart/>
      </section>
    </nav>
  );
};
