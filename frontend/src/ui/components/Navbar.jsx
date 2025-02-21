import { useNavigate } from "react-router";
import { Cart } from "./Cart";
import { DropDown } from "./DropDown";

export const Navbar = () => {
  const navigate = useNavigate();

  return (
    <nav className="flex flex-col bg-black w-full px-20 py-4">
      {/* Felső sor: Menü és Kosár */}
      <section className="flex justify-between items-center">
        <div className="flex items-center gap-x-12">
          <img src={"logo.png"} alt="Logo" className="w-16 h-auto" />
          <ul className="flex items-center space-x-6">
            <li
              className="font-semibold text-white cursor-pointer relative group"
              onClick={() => navigate("/")}
            >
              Kezdőoldal
              <span className="absolute left-0 right-0 bottom-0 h-0.5 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
            </li>
            <li
              className="font-semibold text-white cursor-pointer relative group"
              onClick={() => navigate("/partnerek")}
            >
              Partnereink
              <span className="absolute left-0 right-0 bottom-0 h-0.5 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
            </li>
            <li
              className="font-semibold text-white cursor-pointer relative group"
              onClick={() => navigate("/webshop")}
            >
              Termékeink
              <span className="absolute left-0 right-0 bottom-0 h-0.5 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
            </li>
            <li
              className="font-semibold text-white cursor-pointer relative group"
              onClick={() => navigate("/rolunk")}
            >
              Rólunk
              <span className="absolute left-0 right-0 bottom-0 h-0.5 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
            </li>
            <li
              className="font-semibold text-white cursor-pointer relative group"
              onClick={() => navigate("/kapcsolat")}
            >
              Kapcsolat
              <span className="absolute left-0 right-0 bottom-0 h-0.5 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
            </li>
          </ul>
        </div>

        <div className="flex items-center gap-x-6">
          <Cart />
          <DropDown />
        </div>
      </section>
    </nav>
  );
};