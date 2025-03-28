import { useState, useEffect } from "react";
import { useNavigate } from "react-router"; 
import { Navbar } from "../../ui/components/Navbar";
import axios from "axios";

export const Account = () => {
    const [email, setEmail] = useState(""); 
    const [firstName, setFirstName] = useState(""); // Keresztnév állapota
    const [lastName, setLastName] = useState(""); // Vezetéknév állapota
    const [currentPassword, setCurrentPassword] = useState(""); 
    const [newPassword, setNewPassword] = useState(""); 
    const [showConfirmModal, setShowConfirmModal] = useState(false); // A törlés megerősítő modál állapota
    const [confirmText, setConfirmText] = useState(""); // A szöveg beírásához
    const navigate = useNavigate(); 

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            const decodedToken = JSON.parse(atob(token.split('.')[1])); 
            setEmail(decodedToken.email); 

            // Név lekérése a localStorage-ből
            const storedFirstName = localStorage.getItem('userFirstName');
            const storedLastName = localStorage.getItem('userLastName');
            if (storedFirstName && storedLastName) {
                setFirstName(storedFirstName);
                setLastName(storedLastName);
            }
        }
    }, []);

    const handlePasswordChange = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        try {
            const response = await axios.put('http://localhost:8080/account/password', {
                currentPassword,
                newPassword
            }, {
                headers: {
                    authorization: token
                }
            });

            alert("Jelszó sikeresen megváltoztatva!");
            setCurrentPassword("");
            setNewPassword("");
        } catch (error) {
            console.error("Hiba:", error);
            alert(error.response?.data?.message || "Hiba történt a jelszó megváltoztatása közben.");
        }
    };

    const handleAccountDeletion = () => {
        setShowConfirmModal(true); // A modál megjelenítése
    };

    const handleConfirmDelete = async () => {
        if (confirmText !== "TÖRLÉS") {
            alert("A törléshez írd be: TÖRLÉS");
            return;
        }

        try {
            const token = localStorage.getItem('token');
            const decodedToken = JSON.parse(atob(token.split('.')[1]));
            const userId = decodedToken.id;  // JWT-ből olvasd ki a felhasználó ID-ját

            await axios.delete(`http://localhost:8080/users/account`, {
                headers: {
                    authorization: token
                }
            });

            localStorage.removeItem('token');
            localStorage.removeItem('userFirstName'); // Név törlése a localStorage-ből
            localStorage.removeItem('userLastName');  // Név törlése a localStorage-ből
            alert("A fiókod sikeresen törölve.");
            setTimeout(() => navigate('/'), 2000); // 2 másodperc múlva átirányítjuk a főoldalra
        } catch (error) {
            console.error("Hiba a fiók törlése közben:", error.message);
            alert("Hiba történt a fiók törlése közben.");
        }

        setShowConfirmModal(false);
        setConfirmText(""); // Reseteljük a szöveget
    };

    return (
        <div>
            <Navbar/>
            <div className="mx-4 min-h-screen max-w-screen-xl sm:mx-8 xl:mx-auto">
                <h1 className="border-b py-6 text-4xl font-semibold">Fiók</h1>
                <div className="grid grid-cols-8 pt-3 sm:grid-cols-10">
                    <div className="relative my-4 w-56 sm:hidden">
                        <input className="peer hidden" type="checkbox" name="select-1" id="select-1" />
                        <label htmlFor="select-1" className="flex w-full cursor-pointer select-none rounded-lg border p-2 px-3 text-sm text-gray-700 ring-blue-700 peer-checked:ring">Accounts </label>
                        <svg xmlns="http://www.w3.org/2000/svg" className="pointer-events-none absolute right-0 top-3 ml-auto mr-5 h-4 text-slate-700 transition peer-checked:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                        </svg>
                    </div>

                    <div className="col-span-2 hidden sm:block">
                        <ul>
                            <li className="mt-5 cursor-pointer border-l-2 border-l-blue-700 px-2 py-2 font-semibold text-blue-700 transition hover:border-l-blue-700 hover:text-blue-700">Fiók</li>
                        </ul>
                    </div>

                    <div className="col-span-8 overflow-hidden rounded-xl sm:bg-gray-50 sm:px-8 sm:shadow">
                        <div className="pt-4">
                            <h1 className="py-2 text-2xl font-semibold">Fiók beállítások</h1>
                            <p className="font- text-slate-600">A fiókod beállítása </p>
                        </div>
                        <hr className="mt-4 mb-8" />
                        <p className="py-2 text-xl font-semibold">Személyes adatok</p>
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                            <p className="text-gray-600">A neved: <strong>{firstName} {lastName}</strong></p> {/* Teljes név megjelenítése */}
                        </div>
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                            <p className="text-gray-600">Az e-mail címed: <strong>{email}</strong></p>
                            <button className="inline-flex text-sm font-semibold text-blue-600 underline decoration-2">Változtatás</button>
                        </div>
                        <hr className="mt-4 mb-8" />
                        <p className="py-2 text-xl font-semibold">Jelszó</p>
                        <form onSubmit={handlePasswordChange}>
                            <div className="flex items-center">
                                <div className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-3">
                                    <label htmlFor="login-password">
                                        <span className="text-sm text-gray-500">Jelenlegi jelszavad</span>
                                        <div className="relative flex overflow-hidden rounded-md border-2 transition focus-within:border-blue-600">
                                            <input 
                                                type="password" 
                                                id="login-password" 
                                                className="w-full flex-shrink appearance-none border-gray-300 bg-white py-2 px-4 text-base text-gray-700 placeholder-gray-400 focus:outline-none" 
                                                placeholder="***********" 
                                                value={currentPassword}
                                                onChange={(e) => setCurrentPassword(e.target.value)}
                                            />
                                        </div>
                                    </label>
                                    <label htmlFor="login-password">
                                        <span className="text-sm text-gray-500">Új jelszó</span>
                                        <div className="relative flex overflow-hidden rounded-md border-2 transition focus-within:border-blue-600">
                                            <input 
                                                type="password" 
                                                id="login-password" 
                                                className="w-full flex-shrink appearance-none border-gray-300 bg-white py-2 px-4 text-base text-gray-700 placeholder-gray-400 focus:outline-none" 
                                                placeholder="***********" 
                                                value={newPassword}
                                                onChange={(e) => setNewPassword(e.target.value)}
                                            />
                                        </div>
                                    </label>
                                </div>
                            </div>
                            <button type="submit" className="mt-4 rounded-lg bg-blue-600 px-4 py-2 text-white">Jelszó mentése</button>
                        </form>
                        <hr className="mt-4 mb-8" />

                        {/* Fiók törlés */}
                        <div className="mb-10">
                            <p className="py-2 text-xl font-semibold">Fiók törlése</p>
                            <p className="inline-flex items-center rounded-full bg-rose-100 px-4 py-1 text-rose-600">
                                <svg xmlns="http://www.w3.org/2000/svg" className="mr-2 h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                </svg>
                                Figyelem!
                            </p>
                            <p className="mt-2">Legyen biztonsági mentésed a fiókodról. Teljesen töröljük a fiókod. A fiókod törlése után nem tudsz hozzáférni semmilyen információhoz ezzel kapcsolatban.</p>
                            <button 
                                onClick={handleAccountDeletion}
                                className="ml-auto text-sm font-semibold text-rose-600 underline decoration-2"
                            >
                                Törlöm a fiókom
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Megerősítő modál */}
            {showConfirmModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                        <h2 className="text-xl font-bold text-red-600">Biztosan törölni akarod a fiókodat?</h2>
                        <p className="mt-2 text-gray-600">A törléshez írd be: <strong className="text-red-600">TÖRLÉS</strong></p>
                        <input
                            type="text"
                            value={confirmText}
                            onChange={(e) => setConfirmText(e.target.value)}
                            className="mt-4 p-2 border rounded-md"
                        />
                        <div className="mt-4">
                            <button 
                                onClick={handleConfirmDelete}
                                className="px-4 py-2 bg-red-600 text-white rounded-md"
                            >
                                Törlés
                            </button>
                            <button 
                                onClick={() => setShowConfirmModal(false)}
                                className="ml-2 px-4 py-2 bg-gray-300 text-gray-700 rounded-md"
                            >
                                Mégse
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
