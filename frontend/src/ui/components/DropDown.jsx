import { useState } from "react";
import { Navigate, useNavigate } from "react-router";

export const DropDown = () => {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div 
            className="relative inline-flex m-1"
            onMouseEnter={() => setIsOpen(true)}
            onMouseLeave={() => setIsOpen(false)}
        >
            {/* Gomb */}
            <button
                className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none"
                aria-haspopup="menu"
                aria-expanded={isOpen}
                aria-label="Dropdown"
            >
                Fiók
                <svg className={`size-4 transition-transform ${isOpen ? "rotate-180" : ""}`} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m6 9 6 6 6-6"/>
                </svg>
            </button>

            {/* Lenyíló menü (csak ha nyitva van) */}
            {isOpen && (
                <div className="absolute left-0 top-full mt-0.5 min-w-40 bg-white shadow-md rounded-lg p-1 space-y-0.5 border border-gray-200">
                    <a className="block py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100" href="#" onClick={() => navigate("/register")}>Fióklétrehozása</a>
                    <a className="block py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100" href="#" onClick={() => navigate("/login")}>Bejelentkezés</a>
                    <a className="block py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100" href="#">Vásárlás vendégként</a>
                    <a className="block py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100" href="#" onClick={() => navigate("/kapcsolat")}>Kapcsolat</a>
                </div>
            )}
        </div>
    );
};
