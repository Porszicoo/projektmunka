import { useNavigate } from "react-router";
import { useState, useEffect } from "react";

export const Cart = () => {
    const navigate = useNavigate();
    const [cartItems, setCartItems] = useState([]);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    useEffect(() => {
        const updateCartFromStorage = () => {
            const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
            setCartItems(storedCart);
        };

        updateCartFromStorage(); // Azonnali frissítés

        window.addEventListener("storage", updateCartFromStorage);
        window.addEventListener("cartUpdated", updateCartFromStorage);

        return () => {
            window.removeEventListener("storage", updateCartFromStorage);
            window.removeEventListener("cartUpdated", updateCartFromStorage);
        };
    }, []);

    const updateCart = (updatedCart) => {
        setCartItems(updatedCart);
        localStorage.setItem("cart", JSON.stringify(updatedCart));
        window.dispatchEvent(new Event("cartUpdated")); // Egyedi esemény küldése
    };

    const addToCart = (newItem) => {
        let updatedCart = [...cartItems];

        const existingIndex = updatedCart.findIndex(
            (item) => item.id === newItem.id && item.Szín === newItem.Szín && item.Méret === newItem.Méret
        );

        if (existingIndex !== -1) {
            updatedCart[existingIndex] = {
                ...updatedCart[existingIndex],
                quantity: updatedCart[existingIndex].quantity + 1,
            };
        } else {
            updatedCart.push({ ...newItem, quantity: 1 });
        }

        updateCart(updatedCart);
    };

    const removeItem = (id, szin, meret) => {
        const updatedCart = cartItems.filter(item => !(item.id === id && item.Szín === szin && item.Méret === meret));
        updateCart(updatedCart);
    };

    const totalAmount = cartItems.reduce((sum, item) => sum + item.TermekAr * item.quantity, 0);
    const tax = totalAmount * 0.27;
    const finalTotal = totalAmount + tax;

    return (
        <div className="relative w-12 flex justify-center items-center -mt-3">
            <div 
                className="relative py-2" 
                onMouseEnter={() => setIsDropdownOpen(true)}
                onMouseLeave={() => setIsDropdownOpen(false)}
            >
                {cartItems.length > 0 && (
                    <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                        {cartItems.reduce((acc, item) => acc + item.quantity, 0)}
                    </div>
                )}
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 22 24" strokeWidth="1.7" stroke="white" className="mt-3.5 h-8 w-7 cursor-pointer">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"/>
                </svg>
                {isDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-64 bg-white border border-gray-300 rounded shadow-lg z-10">
                        <div className="p-2">
                            <h3 className="font-bold text-lg">Kosár</h3>
                            {cartItems.length > 0 ? (
                                cartItems.map(item => (
                                    <div key={`${item.id}-${item.Szín}-${item.Méret}`} className="flex items-center gap-3 py-2 border-b">
                                        <img src={`img/${item.Kep}.png`} alt={item.Nev} className="w-14 h-14 object-cover rounded"/>
                                        <div className="flex-1">
                                            <p className="font-semibold">{item.Nev}</p>
                                            <p className="text-sm text-gray-500">Méret: {item.Méret}</p>
                                            <p className="text-sm text-gray-500">Szín: {item.Szín}</p>
                                            <p className="text-sm font-semibold">{item.quantity} x {item.TermekAr} Ft</p>
                                        </div>
                                        <button onClick={() => removeItem(item.id, item.Szín, item.Méret)} className="text-red-500 text-sm">✖</button>
                                    </div>
                                ))
                            ) : (
                                <div className="text-center text-gray-500">A kosár üres</div>
                            )}
                        </div>
                        <div className="p-2 border-t">
                            <p className="font-semibold">Végösszeg: {finalTotal.toFixed(2)} Ft</p>
                            <button
                                onClick={() => navigate("/cart")}
                                className="w-full bg-blue-500 text-white py-1 rounded hover:bg-blue-600"
                            >
                                Kosár megtekintése
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
