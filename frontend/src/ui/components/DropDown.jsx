import { useState, useEffect } from "react";
import { useNavigate } from "react-router";

export const DropDown = () => {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setIsLoggedIn(true);
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsLoggedIn(false);
        navigate("/");
    };

    return (
        <div
            className="relative inline-flex m-1 overflow-visible"
            onMouseEnter={() => setIsOpen(true)}
            onMouseLeave={() => setIsOpen(false)}
        >
            <button
                className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none"
                aria-haspopup="menu"
                aria-expanded={isOpen}
                aria-label="Dropdown"
            >
                Fiók
                <svg className={`size-4 transition-transform ${isOpen ? "rotate-180" : ""}`} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m6 9 6 6 6-6" />
                </svg>
            </button>

            {isOpen && (
                <div className="absolute left-0 top-full mt-0.5 min-w-40 bg-white shadow-md rounded-lg p-1 space-y-0.5 border border-gray-200 z-50">
                    {!isLoggedIn && (
                        <>
                            <a className="block py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100" href="#" onClick={() => navigate("/register")}>Fióklétrehozása</a>
                            <a className="block py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100" href="#" onClick={() => navigate("/login")}>Bejelentkezés</a>
                        </>
                    )}
                    {isLoggedIn && (
                        <>
                            <a className="block py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100" href="#" onClick={() => navigate("/account")}>Fiók</a>
                            <a className="block py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100" href="#" onClick={handleLogout}>Kijelentkezés</a>
                        </>
                    )}
                    
                    <a className="block py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100" href="#" onClick={() => navigate("/kapcsolat")}>Kapcsolat</a>
                    {isLoggedIn && (
                        <a className="block py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100" href="#" onClick={() => navigate("/order")}>Vásárlási előzmények</a>
                    )}
                </div>
            )}
        </div>
    );
};