import { useNavigate } from "react-router";
import { Navbar } from "../../ui/components/Navbar";
import { useState } from "react";
import axios from "axios";

export const Register = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        phone: "",
        email: "",
        password: ""
    });
    const [isTermsAccepted, setIsTermsAccepted] = useState(false); // New state for terms acceptance
    const [errorMessage, setErrorMessage] = useState(""); // New state for error message
    const [emailError, setEmailError] = useState(""); // New state for email error message
    const [phoneError, setPhoneError] = useState(""); // New state for phone error message

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        if (type === "checkbox") {
            setIsTermsAccepted(checked); // Update checkbox state
        } else {
            setFormData({ ...formData, [name]: value });
            if (name === "email") {
                setEmailError(""); // Reset email error when user types
            }
            if (name === "phone") {
                setPhoneError(""); // Reset phone error when user types
            }
        }
    };

    const validateEmail = (email) => {
        // Simple regex for email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const validatePhone = (phone) => {
        // Check if phone starts with '+' and contains only digits afterward
        const phoneRegex = /^\+\d+$/;
        return phoneRegex.test(phone);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage(""); // Reset error message
        setEmailError(""); // Reset email error message
        setPhoneError(""); // Reset phone error message

        if (!formData.firstName || !formData.lastName || !formData.password) {
            setErrorMessage("Minden mezőt ki kell tölteni!");
            return;
        }
        if (!isTermsAccepted) { // Check if terms are accepted
            setErrorMessage("Kérjük, fogadja el a felhasználói feltételeket!");
            return;
        }
        if (!validateEmail(formData.email)) { // Validate email format
            setEmailError("Kérjük, adjon meg egy érvényes e-mail címet!");
            return;
        }
        if (!validatePhone(formData.phone)) { // Validate phone format
            setPhoneError("Kérjük, adjon meg egy érvényes telefonszámot, amely '+' jellel kezdődik!");
            return;
        }

        try {
            const response = await axios.post("http://localhost:8080/users/register", formData, {
                headers: { "Content-Type": "application/json" }
            });

            const token = response.data.token;
            localStorage.setItem("token", token);
            alert("Sikeres regisztráció és bejelentkezés!");
            navigate("/");
        } catch (error) {
            console.error("Hiba a regisztráció során:", error.response?.data || error.message);
            setErrorMessage(error.response?.data?.message || "Hiba a regisztráció során");
        }
    };

    return (
        <div className='w-[100svw] h-[100svh]'>
            <Navbar />
            <div className="font-[sans-serif] bg-white max-w-4xl flex items-center mx-auto h-[80%] p-4">
                <div className="grid md:grid-cols-3 items-center shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] rounded-xl overflow-hidden bg-gray">
                    <div className="max-md:order-1 flex flex-col justify-center md:space-y-16 space-y-8 max-md:mt-16 min-h-full bg-gradient-to-r from-gray-900 to-gray-700 lg:px-8 px-4 py-4">
                        <div className="text-center border-b border-gray-600 pb-4">
                            <h4 className=" text-lg">Üdvözlünk az oldalon! Hozd létre fiókod most!</h4>
                        </div>
                        <div className="text-center border-t border-gray-600 pt-4">
                            <h4 className="text- text-lg">Egyszerű és biztonságos regisztráció</h4>
                        </div>
                    </div>

                    <form className="md:col-span-2 w-full py-6 px-6 sm:px-16 max-md:max-w-xl mx-auto">
                        <div className="mb-6">
                            <h3 className="text-gray-800 text-xl font-bold">Fiók létrehozása</h3>
                        </div>

                        <div className="space-y-6">
                            <div>
                                <label className="text-gray-600 text-sm mb-2 block">Keresztnév</label>
                                <input 
                                    name="firstName" 
                                    type="text" 
                                    value={formData.firstName || ""} 
                                    onChange={handleChange} 
                                    required 
                                    className="text-gray-800 bg-white border border-gray-300 w-full text-sm pl-4 pr-8 py-2.5 rounded-md outline-blue-500" 
                                    placeholder="Keresztnév" 
                                />
                            </div>

                            <div>
                                <label className="text-gray-600 text-sm mb-2 block">Családnév</label>
                                <input 
                                    name="lastName" 
                                    type="text" 
                                    value={formData.lastName || ""} 
                                    onChange={handleChange} 
                                    required 
                                    className="text-gray-800 bg-white border border-gray-300 w-full text-sm pl-4 pr-8 py-2.5 rounded-md outline-blue-500" 
                                    placeholder="Családnév" 
                                />
                            </div>

                            <div>
                                <label className="text-gray-600 text-sm mb-2 block">Telefonszám</label>
                                <input 
                                    name="phone" 
                                    type="tel" 
                                    value={formData.phone || ""} 
                                    onChange={handleChange} 
                                    required 
                                    className="text-gray-800 bg-white border border-gray-300 w-full text-sm pl-4 pr-8 py-2.5 rounded-md outline-blue-500" 
                                    placeholder="Telefonszám (+36...)"
                                />
                                {phoneError && ( // Conditionally render phone error message
                                    <p className="text-red-500 text-sm mt-2">{phoneError}</p>
                                )}
                            </div>

                            <div>
                                <label className="text-gray-600 text-sm mb-2 block">Email</label>
                                <input 
                                    name="email" 
                                    type="email" 
                                    value={formData.email || ""} 
                                    onChange={handleChange} 
                                    required 
                                    className="text-gray-800 bg-white border border-gray-300 w-full text-sm pl-4 pr-8 py-2.5 rounded-md outline-blue-500" 
                                    placeholder="E-mail" 
                                />
                                {emailError && ( // Conditionally render email error message
                                    <p className="text-red-500 text-sm mt-2">{emailError}</p>
                                )}
                            </div>

                            <div>
                                <label className="text-gray-600 text-sm mb-2 block">Jelszó</label>
                                <input 
                                    name="password" 
                                    type="password" 
                                    value={formData.password || ""} 
                                    onChange={handleChange} 
                                    required 
                                    className="text-gray-800 bg-white border border-gray-300 w-full text-sm pl-4 pr-8 py-2.5 rounded-md outline-blue-500" 
                                    placeholder="Jelszó" 
                                />
                            </div>

                            <div className="flex items-center">
                                <input 
                                    id="remember-me" 
                                    name="remember-me" 
                                    type="checkbox" 
                                    className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-2 border-gray-300 rounded" // Updated classes for better visibility
                                    checked={isTermsAccepted} // Bind checkbox to state
                                    onChange={handleChange} // Handle checkbox change
                                />
                                <label htmlFor="remember-me" className="ml-3 block text-sm text-gray-600">
                                    Elfogadom <a href="javascript:void(0);" className="text-gray-600 font-semibold hover:underline ml-1">Felhasználói feltételeket</a>
                                </label>
                            </div>

                            {errorMessage && ( // Conditionally render general error message
                                <p className="text-red-500 text-sm mt-2">{errorMessage}</p>
                            )}
                        </div>

                        <div className="mt-8">
                            <button 
                                type="submit" 
                                className="w-full py-2.5 px-4 tracking-wider text-sm rounded-md text-white bg-gray-950 hover:bg-gray-500 focus:outline-none" 
                                onClick={handleSubmit}
                            >
                                Hozz létre egy fiókot
                            </button>
                        </div>
                        <p className="text-gray-600 text-sm mt-6 text-center">
                            Már van fiókod? <a href="javascript:void(0);" className="text-gray-600 font-semibold hover:underline ml-1" onClick={() => navigate ("/login")}>Jelentkezz be itt</a>
                        </p>
                        <p className="text-gray-600 text-sm mt-6 text-center">
                            Vissza szeretnél menni a termékekhez? <a href="javascript:void(0);" className="text-gray-600 font-semibold hover:underline ml-1" onClick={() => navigate ("/")}>Menj vissza itt</a>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
}