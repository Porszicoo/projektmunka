import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { Navbar } from "../../ui/components/Navbar";
import axios from "axios";

export const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            console.log("Felhasználó bejelentkezve!");
        }
    }, []);

    const handleLogin = async (e) => {
        e.preventDefault();

        if (!email || !password) {
            setError("Kérjük, töltsd ki mindkét mezőt!");
            return;
        }

        try {
            const response = await axios.post("http://localhost:8080/users/login", { email, password });
            const token = response.data.token;
            localStorage.setItem("token", token);
            console.log("Bejelentkezett felhasználó:", response.data.user);
            setError("");
            navigate("/");
        } catch (err) {
            if (err.response && err.response.data.message) {
                setError(err.response.data.message);
            } else {
                setError("Hiba történt a bejelentkezés során.");
            }
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    return (
        <div style={{ overflow: "hidden", height: "100vh", margin: 0, padding: 0 }}>
            <Navbar />
            <div className="font-[sans-serif]">
                <div className="min-h-screen flex flex-col items-center justify-center py-6 px-4 mx-auto h-[80%]">
                    <div className="grid md:grid-cols-2 items-center gap-10 max-w-6xl max-md:max-w-md w-full h-[80%] p-4">
                        <div>
                            <h2 className="lg:text-5xl text-3xl font-extrabold lg:leading-[55px] text-gray-800">
                                Jelentkezz be a kedvezményeidért!
                            </h2>
                            <p className="text-sm mt-6 text-gray-800"></p>
                            <p className="text-sm mt-12 text-gray-800">
                                Nincs fiókod? <a href="javascript:void(0);" className="text-gray-600 font-semibold hover:underline ml-1 underline" onClick={() => navigate("/register")}>
                                    Regisztrálok
                                </a>
                            </p>
                            <p className="text-sm mt-2 text-gray-800">
                                Vissza szeretnél térni az oldalra? <a href="javascript:void(0);" className="text-gray-600 font-semibold hover:underline ml-1 underline" onClick={() => navigate("/")}>
                                    Kattints ide
                                </a>
                            </p>
                        </div>

                        <form className="max-w-md md:ml-auto w-full" onSubmit={handleLogin}>
                            <h3 className="text-gray-800 text-3xl font-extrabold mb-8">Bejelentkezés</h3>
                            {error && <div className="text-red-500 mb-4">{error}</div>}
                            <div className="space-y-4">
                                <div>
                                    <input name="email" type="email" required className="bg-gray-100 w-full text-sm text-gray-800 px-4 py-3.5 rounded-md outline-blue-600 focus:bg-transparent" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                                </div>
                                <div>
                                    <input name="password" type="password" required className="bg-gray-100 w-full text-sm text-gray-800 px-4 py-3.5 rounded-md outline-blue-600 focus:bg-transparent" placeholder="Jelszó" value={password} onChange={(e) => setPassword(e.target.value)} />
                                </div>
                                <div className="flex flex-wrap items-center justify-between gap-4">
                                    <div className="flex items-center">
                                        <input id="remember-me" name="remember-me" type="checkbox" className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-r-300 rounded" />
                                        <label htmlFor="remember-me" className="ml-3 block text-sm text-gray-800">Jegyezd meg</label>
                                    </div>
                                    <div className="text-sm">
                                        <a href="javascript:void(0);" className="text-gray-600 hover:text-gray-700 font-semibold underline">Elfelejtetted a jelszavad?</a>
                                    </div>
                                </div>
                            </div>
                            <div className="!mt-8">
                                <button type="submit" className="w-full shadow-xl py-2.5 px-4 text-sm font-semibold rounded text-white bg-gray-950 hover:bg-gray-500 focus:outline-none">Bejelentkezés</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};
