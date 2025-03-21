import { useState, useEffect } from "react";
import { Navbar } from "../../ui/components/Navbar"; // Mivel a navbar mindig ott van

export const Order = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        // Betöltjük a rendelési előzményeket a localStorage-ból
        const storedOrders = JSON.parse(localStorage.getItem("orderHistory")) || [];
        setOrders(storedOrders);
    }, []);

    return (
        <section className="py-0 relative">
            <Navbar />
            <div className="w-full max-w-7xl mx-auto px-4 md:px-8 py-12">
                <h2 className="font-manrope font-extrabold text-3xl leading-10 text-black mb-9 py-8">Rendelési előzmények</h2>

                {orders.length > 0 ? (
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
                                                    <h5 className="font-semibold text-md text-gray-800">{item.Marka}</h5>
                                                    <p className="text-gray-600">Mennyiség: {item.quantity}</p>
                                                    <img src={`img/${item.Kep}.png`} alt={item.Marka} className="w-16 h-16 object-cover" />
                                                </div>
                                                <p className="font-semibold text-md text-gray-800">{(item.TermekAr * item.quantity).toFixed(2)} Ft</p>
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