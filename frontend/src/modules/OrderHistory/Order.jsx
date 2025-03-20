import { useState, useEffect } from "react";
import { Navbar } from "../../ui/components/Navbar"; // Mivel a navbar mindig ott van

export const Order = () => {
    const [orderDetails, setOrderDetails] = useState(null);

    useEffect(() => {
        // Betöltjük a rendelési adatokat a localStorage-ból
        const storedOrderDetails = JSON.parse(localStorage.getItem("orderDetails"));
        if (storedOrderDetails) {
            setOrderDetails(storedOrderDetails);
        }
    }, []);

    return (
        <section className="py-0 relative">
            <Navbar />
            <div className="w-full max-w-7xl mx-auto px-4 md:px-8 py-12">
                <h2 className="font-manrope font-extrabold text-3xl leading-10 text-black mb-9 py-8">Rendelés összesítő</h2>

                {orderDetails ? (
                    <>
                        <div className="mt-10">
                            <h3 className="font-semibold text-xl text-gray-800 mb-4">Megrendelt termékek:</h3>
                            <div className="space-y-4">
                                {orderDetails.cartItems.map((item, index) => (
                                    <div key={index} className="flex justify-between p-4 border-b border-gray-300">
                                        <div>
                                            <h4 className="font-semibold text-lg text-gray-800">{item.Marka}</h4>
                                            <p className="text-gray-600">Mennyiség: {item.quantity}</p>
                                            <img src={`img/${item.Kep}.png`} alt={item.Marka} className="w-24 h-24 object-cover" />
                                        </div>
                                        <p className="font-semibold text-lg text-gray-800">{(item.TermekAr * item.quantity).toFixed(2)} Ft</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="mt-8">
                            <h3 className="font-semibold text-lg text-gray-800">Rendelési információk:</h3>
                            <p><strong>Rendelés szám:</strong> {orderDetails.orderNumber}</p>
                            <p><strong>Dátum:</strong> {orderDetails.orderDate}</p>
                            <p><strong>Fizetési mód:</strong> {orderDetails.paymentMethod}</p>
                            <p><strong>Név:</strong> {orderDetails.name}</p>
                            <p><strong>Szállítási cím:</strong> {orderDetails.shippingAddress}</p>
                        </div>
                    </>
                ) : (
                    <p className="text-gray-600">Nincs rendelési adat.</p>
                )}
            </div>
        </section>
    );
};
