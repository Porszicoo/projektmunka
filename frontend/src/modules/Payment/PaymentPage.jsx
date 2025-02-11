import { useState, useEffect } from "react";
import { useNavigate } from "react-router";

export const PaymentPage = () => {
    const navigate = useNavigate();
    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
        setCartItems(storedCart);
        const total = storedCart.reduce((acc, item) => acc + item.price * item.quantity, 0);
        setTotalPrice(total);
    }, []);

    return (
        <div className="font-[sans-serif] bg-white">
            <div className="max-lg:max-w-xl mx-auto w-full">
                <div className="grid lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 max-lg:order-1 p-6 !pr-0 max-w-4xl mx-auto w-full">
                        <div className="text-center max-lg:hidden">
                            <h2 className="text-3xl font-bold text-gray-800 inline-block border-b-2 border-gray-800 pb-1">Checkout</h2>
                        </div>
                        
                        <form className="lg:mt-16">
                            <h2 className="text-xl font-bold text-gray-800">Személyes adatok</h2>
                            <div className="grid sm:grid-cols-2 gap-8 mt-8">
                                <input type="text" placeholder="Név" className="px-2 pb-2 bg-white text-gray-800 w-full text-sm border-b focus:border-blue-600 outline-none" />
                                <input type="email" placeholder="Email" className="px-2 pb-2 bg-white text-gray-800 w-full text-sm border-b focus:border-blue-600 outline-none" />
                                <input type="text" placeholder="Utca" className="px-2 pb-2 bg-white text-gray-800 w-full text-sm border-b focus:border-blue-600 outline-none" />
                                <input type="text" placeholder="Város" className="px-2 pb-2 bg-white text-gray-800 w-full text-sm border-b focus:border-blue-600 outline-none" />
                                <input type="text" placeholder="Megye" className="px-2 pb-2 bg-white text-gray-800 w-full text-sm border-b focus:border-blue-600 outline-none" />
                                <input type="number" placeholder="Irányítószám" className="px-2 pb-2 bg-white text-gray-800 w-full text-sm border-b focus:border-blue-600 outline-none" />
                            </div>

                            <div className="mt-16">
                                <h2 className="text-xl font-bold text-gray-800">Fizetési lehetőségek</h2>
                                <div className="grid gap-4 sm:grid-cols-2 mt-4">
                                    <label className="flex items-center cursor-pointer">
                                        <input type="radio" name="payment" className="w-5 h-5" defaultChecked />
                                        <span className="ml-4">Bankkártya</span>
                                    </label>
                                    <label className="flex items-center cursor-pointer">
                                        <input type="radio" name="payment" className="w-5 h-5" />
                                        <span className="ml-4">PayPal</span>
                                    </label>
                                </div>
                            </div>

                            <div className="flex flex-wrap gap-4 mt-8">
                                <button type="button" className="min-w-[150px] px-6 py-3.5 text-sm bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300">Vissza</button>
                                <button type="button" className="min-w-[150px] px-6 py-3.5 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700">Fizetés {totalPrice.toFixed(2)} Ft</button>
                            </div>
                        </form>
                    </div>
                    
                    <div className="bg-gray-100 lg:h-screen lg:sticky lg:top-0 lg:max-w-[430px] w-full lg:ml-auto">
                        <div className="relative h-full p-6 overflow-auto max-lg:max-h-[450px] lg:h-[calc(100vh-50px)]">
                            <h2 className="text-xl font-bold text-gray-800">Rendelés összesítő</h2>
                            <div className="space-y-6 mt-8">
                                {cartItems.map((item, index) => (
                                    <div key={index} className="flex gap-4">
                                        <div className="w-[100px] h-[100px] bg-gray-200 rounded-lg flex items-center justify-center p-4">
                                            <img src={item.image} alt={item.name} className="w-full object-contain" />
                                        </div>
                                        <div className="w-full">
                                            <h3 className="text-sm font-bold text-gray-800">{item.name}</h3>
                                            <ul className="text-xs text-gray-800 mt-2 space-y-1">
                                                <li>Méret: <span className="float-right">{item.size}</span></li>
                                                <li>Mennyiség: <span className="float-right">{item.quantity}</span></li>
                                                <li>Ár: <span className="float-right">{(item.price * item.quantity).toFixed(2)} Ft</span></li>
                                            </ul>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="lg:absolute lg:left-0 lg:bottom-0 bg-gray-200 w-full p-4">
                                <h4 className="flex flex-wrap gap-4 text-sm font-bold text-gray-800">Összesen: <span className="ml-auto">{totalPrice.toFixed(2)} Ft</span></h4>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
