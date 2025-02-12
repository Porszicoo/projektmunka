import { Navbar } from "../../ui/components/Navbar";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";

export const ShoppingCart = () => {
    const navigate = useNavigate();
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
        setCartItems(storedCart);
    }, []);

    const updateCart = (updatedCart) => {
        setCartItems(updatedCart);
        localStorage.setItem("cart", JSON.stringify(updatedCart));
    };

    const removeItem = (id, szin, meret) => {
        const updatedCart = cartItems.filter(item => !(item.id === id && item.Szín === szin && item.Meret === meret));
        updateCart(updatedCart);
    };

    const changeQuantity = (id, szin, meret, amount) => {
        const updatedCart = cartItems.map(item => {
            if (item.id === id && item.Szín === szin && item.Meret === meret) {
                return { ...item, quantity: Math.max(1, item.quantity + amount) };
            }
            return item;
        });
        updateCart(updatedCart);
    };

    const addToCart = (newItem) => {
        let updatedCart = [...cartItems];
        
        // Keresünk egy megegyező terméket (azonos ID, Szín és Méret)
        const existingIndex = updatedCart.findIndex(
            (item) => item.id === newItem.id && item.Szín === newItem.Szín && item.Meret === newItem.Meret
        );

        if (existingIndex !== -1) {
            // Ha már létezik ez a variáns, csak növeljük a quantity-t
            updatedCart[existingIndex] = {
                ...updatedCart[existingIndex],
                quantity: updatedCart[existingIndex].quantity + 1,
            };
        } else {
            // Ha nem létezik, hozzáadjuk új elemként a listához
            updatedCart.push({ ...newItem, quantity: 1 });
        }

        updateCart(updatedCart);
    };

    const totalAmount = cartItems.reduce((sum, item) => sum + item.TermekAr * item.quantity, 0);
    const tax = totalAmount * 0.27;
    const finalTotal = totalAmount + tax;

    return (
        <div className="font-sans bg-white h-full w-full">
            <div className="w-full">
                <Navbar />
            </div>
            <div className="max-w-5xl max-md:max-w-xl mx-auto py-4">
                <div className="grid md:grid-cols-3 gap-8 mt-16 h-full w-full">
                    <div className="md:col-span-2 space-y-4">
                        {cartItems.length === 0 ? (
                            <p className="text-center text-gray-500">A kosár üres</p>
                        ) : (
                            cartItems.map(item => (
                                <div key={`${item.id}-${item.Szín}-${item.Meret}`} className="grid grid-cols-3 items-start gap-4">
                                    <div className="col-span-2 flex items-start gap-4">
                                        <div className="w-28 h-28 bg-gray-100 p-2 rounded-md">
                                            <img src={`img/${item.Kep}.png`} className="w-full h-full object-contain" alt={item.Marka} />
                                        </div>
                                        <div className="flex flex-col">
                                            <h3 className="text-base font-bold text-gray-800">{item.Marka}</h3>
                                            <p className="text-xs font-semibold text-gray-500">Szín: {item.Szín}, Méret: {item.Meret}</p>
                                            <button className="mt-6 text-red-500 text-xs font-semibold" onClick={() => removeItem(item.id, item.Szín, item.Meret)}>Törlés</button>
                                        </div>
                                    </div>
                                    <div className="ml-auto text-right">
                                        <p className="text-lg font-bold">{item.TermekAr} Ft</p>
                                        <div className="mt-2 flex items-center">
                                            <button className="px-2 py-1 border" onClick={() => changeQuantity(item.id, item.Szín, item.Meret, -1)}>-</button>
                                            <span className="mx-3">{item.quantity}</span>
                                            <button className="px-2 py-1 border" onClick={() => changeQuantity(item.id, item.Szín, item.Meret, 1)}>+</button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                    <div className="bg-gray-100 rounded-md p-4 h-max">
                        <h3 className="text-lg font-bold border-b pb-2">Rendelés összesítő</h3>
                        <ul className="text-gray-800 mt-6 space-y-3">
                            <li className="flex justify-between text-sm">Összeg: <span className="font-bold">{totalAmount.toFixed(2)} Ft</span></li>
                            <li className="flex justify-between text-sm">Áfa: <span className="font-bold">{tax.toFixed(2)} Ft</span></li>
                            <hr className="border-gray-300" />
                            <li className="flex justify-between text-sm font-bold">Végösszeg: <span>{finalTotal.toFixed(2)} Ft</span></li>
                        </ul>
                        <div className="mt-6 space-y-3">
                            <button className="text-sm px-4 py-2.5 w-full font-semibold bg-gray-800 text-white rounded-md" onClick={() => navigate}>Fizetés</button>
                            <button className="text-sm px-4 py-2.5 w-full font-semibold border border-gray-300" onClick={() => navigate("/")}>Vásárlás folytatása</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
