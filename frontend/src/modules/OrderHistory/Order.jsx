import { useState, useEffect } from "react";
import { Navbar } from "../../ui/components/Navbar";

// Manuális JWT dekódoló függvény
const decodeToken = (token) => {
    try {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(
            atob(base64)
                .split('')
                .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
                .join('')
        );
        return JSON.parse(jsonPayload);
    } catch (error) {
        console.error("Hiba a token dekódolása során:", error);
        return null;
    }
};

export const Order = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        console.log("Token:", token); // Hibakeresés

        if (token) {
            try {
                const decodedToken = decodeToken(token);
                console.log("Dekódolt token:", decodedToken); // Hibakeresés

                if (!decodedToken) {
                    throw new Error("Érvénytelen token.");
                }

                const userEmail = decodedToken.email;
                console.log("Felhasználó email címe:", userEmail); // Hibakeresés

                // Kérjük le a rendelési előzményeket a localStorage-ból
                const storedOrders = localStorage.getItem("orderHistory");
                console.log("orderHistory a localStorage-ból:", storedOrders); // Hibakeresés

                if (storedOrders) {
                    const allOrders = JSON.parse(storedOrders);
                    console.log("Összes rendelés:", allOrders); // Hibakeresés

                    const userOrders = allOrders.filter(order => order.email === userEmail);
                    console.log("Felhasználó rendelései:", userOrders); // Hibakeresés

                    setOrders(userOrders);
                } else {
                    setError("Nincsenek rendelési előzmények a localStorage-ban.");
                    setOrders([]);
                }
            } catch (error) {
                console.error("Hiba történt a rendelési előzmények betöltésekor:", error);
                setError("Hiba történt a rendelési előzmények betöltésekor.");
                setOrders([]);
            } finally {
                setLoading(false); // A betöltés befejeződik
            }
        } else {
            console.error("Nincs token, a felhasználónak be kell jelentkeznie.");
            setError("Nincs bejelentkezve felhasználó.");
            setLoading(false);
            setOrders([]);
        }
    }, []);

    return (
        <section className="py-0 relative">
            <Navbar />
            <div className="w-full max-w-7xl mx-auto px-4 md:px-8 py-12">
                <h2 className="font-manrope font-extrabold text-3xl leading-10 text-black mb-9 py-8">Rendelési előzmények</h2>

                {loading ? (
                    <p className="text-gray-600">Töltés...</p>
                ) : error ? (
                    <p className="text-red-500">{error}</p> // Hiba üzenet
                ) : orders.length > 0 ? (
                    <div className="space-y-8">
                        {orders.map((order, orderIndex) => (
                            <div key={orderIndex} className="border p-6 rounded-lg shadow-md bg-white">
                                <h3 className="font-semibold text-lg text-gray-800 mb-2">Rendelés #{order.orderNumber}</h3>
                                <p><strong>Dátum:</strong> {order.orderDate}</p>
                                <p><strong>Fizetési mód:</strong> {order.paymentMethod}</p>
                                <p><strong>Név:</strong> {order.name}</p>
                                <p><strong>Szállítási cím:</strong> {order.shippingAddress}</p>

                                <div className="mt-4">
                                    <h4 className="font-semibold text-md text-gray-800 mb-2">Megrendelt termékek:</h4>
                                    <div className="space-y-2">
                                        {order.cartItems.map((item, index) => (
                                            <div key={index} className="flex justify-between p-2 border-b border-gray-300">
                                                <div>
                                                    <h5 className="font-semibold text-md text-gray-800">{item?.Marka || "Ismeretlen termék"}</h5>
                                                    <p className="text-gray-600">Mennyiség: {item?.quantity || 0}</p>
                                                    <img src={`img/${item?.Kep || "default.png"}.png`} alt={item?.Marka || "Termék"} className="w-16 h-16 object-cover" />
                                                </div>
                                                <p className="font-semibold text-md text-gray-800">{(item?.TermekAr * item?.quantity || 0).toFixed(2)} Ft</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-600">Nincsenek korábbi rendeléseid.</p>
                )}
            </div>
        </section>
    );
};
