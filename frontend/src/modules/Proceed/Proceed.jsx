import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router";

export const Proceed = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { orderNumber, orderDate, paymentMethod, name, shippingAddress } = location.state || {};

    useEffect(() => {
        localStorage.removeItem("cart"); // Kosár tartalmának ürítése
    }, []);

    return (
        <section className="bg-white py-8 antialiased dark:bg-gray-900 md:py-16">
            <div className="mx-auto max-w-2xl px-4 2xl:px-0">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl mb-2">
                    Köszönjük a vásárlásod!
                </h2>
                <p className="text-gray-500 dark:text-gray-400 mb-6 md:mb-8">
                    A megrendelésed{" "}
                    <span className="font-medium text-gray-900 dark:text-white">
                        {orderNumber}
                    </span>{" "}
                    feldolgozás alatt van.
                </p>
                <div className="space-y-4 sm:space-y-2 rounded-lg border border-gray-100 bg-gray-50 p-6 dark:border-gray-700 dark:bg-gray-800 mb-6 md:mb-8">
                    <div className="sm:flex items-center justify-between gap-4">
                        <span className="font-normal mb-1 sm:mb-0 text-gray-500 dark:text-gray-400">Dátum:</span>
                        <span className="font-medium text-gray-900 dark:text-white sm:text-end">{orderDate}</span>
                    </div>
                    <div className="sm:flex items-center justify-between gap-4">
                        <span className="font-normal mb-1 sm:mb-0 text-gray-500 dark:text-gray-400">Fizetési mód:</span>
                        <span className="font-medium text-gray-900 dark:text-white sm:text-end">{paymentMethod}</span>
                    </div>
                    <div className="sm:flex items-center justify-between gap-4">
                        <span className="font-normal mb-1 sm:mb-0 text-gray-500 dark:text-gray-400">Név:</span>
                        <span className="font-medium text-gray-900 dark:text-white sm:text-end">{name}</span>
                    </div>
                    <div className="sm:flex items-center justify-between gap-4">
                        <span className="font-normal mb-1 sm:mb-0 text-gray-500 dark:text-gray-400">Szállítási cím:</span>
                        <span className="font-medium text-gray-900 dark:text-white sm:text-end">{shippingAddress}</span>
                    </div>
                </div>
                <div className="flex items-center space-x-4">
                    <button
                        onClick={() => navigate("/")}
                        className="py-2.5 px-5 text-sm font-medium text-white bg-blue-500 rounded-lg border border-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800"
                    >
                        Vissza a főoldalra
                    </button>
                </div>
            </div>
        </section>
    );
};
