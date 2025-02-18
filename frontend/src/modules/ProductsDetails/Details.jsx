import { useLocation } from "react-router";
import { useState } from "react";
import { Navbar } from "../../ui/components/Navbar";

export const Details = () => {
  const location = useLocation();
  const product = location.state?.product; // Access the product from the state
  const [quantity, setQuantity] = useState(1); // State to manage quantity
  const [selectedSize, setSelectedSize] = useState(""); // State to manage selected size

  const addToCart = (product) => {
    if (!selectedSize) {
      alert("Válassz méretet mielőtt kosárhoz adod.");
      return;
    }

    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingProduct = cart.find(
      (item) => item.id === product.id && item.Szín === product.Szín && item.Meret === selectedSize
    );

    if (existingProduct) {
      existingProduct.quantity += quantity; // Increase quantity based on user input
    } else {
      cart.push({ ...product, quantity, Meret: selectedSize });
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    window.dispatchEvent(new Event("cartUpdated"));
  };

  const increaseQuantity = () => {
    setQuantity(prevQuantity => prevQuantity + 1);
  };

  const decreaseQuantity = () => {
    setQuantity(prevQuantity => (prevQuantity > 1 ? prevQuantity - 1 : 1));
  };

  const handleSizeSelect = (size) => {
    setSelectedSize(size);
  };

  return (
    <section className="relative ">
      <Navbar />
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-0">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mx-auto max-md:px-2 ">
          <div className="img">
            <div className="img-box h-full max-lg:mx-auto ">
              <img 
                src={`img/${product?.Kep}.png`} 
                alt={product?.Ar || "Nincs kép"} 
                className="max-lg:mx-auto lg:ml-auto h-full object-cover" 
              />
            </div>
          </div>
          <div className="data w-full lg:pr-8 pr-0 xl:justify-start justify-center flex items-center max-lg:pb-10 xl:my-2 lg:my-5 my-0">
            <div className="data w-full max-w-xl">
              <p className="text-lg font-medium leading-8 text-indigo-600 mb-4">Termékek&nbsp; /&nbsp; Polók</p>
              <h2 className="font-manrope font-bold text-3xl leading-10 text-gray-900 mb-2 capitalize">{product?.Marka || "Nincs név"}</h2>
              <div className="flex flex-col sm:flex-row sm:items-center mb-6">
                <h6 className="font-manrope font-semibold text-2xl leading-9 text-gray-900 pr-5 sm:border-r border-gray-200 mr-5">
                  {product?.TermekAr} Ft
                </h6>
                <div className="flex items-center gap-2">
                 
                </div>
              </div>
              <p className="text-gray-500 text-base font-normal mb-5">
                {product?.description || ""} 
              </p>
              
              {/* Size Selection */}
              <p className="text-gray-900 text-lg leading-8 font-medium mb-4">Válassz méretet</p>
              <div className="flex gap-3 mb-5">
                {["S", "M", "L", "XL", "XXL"].map(size => (
                  <button 
                    key={size} 
                    onClick={() => handleSizeSelect(size)} 
                    className={`py-2 px-4 border rounded-full transition duration-300 ${selectedSize === size ? 'bg-indigo-600 text-white' : 'bg-white text-gray-900 border-gray-300 hover:bg-gray-50'}`}
                  >
                    {size}
                  </button>
                ))}
              </div>

              <ul className="grid gap-y-4 mb-8">
                <li className="flex items-center gap-3">
                  <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="26" height="26" rx="13" fill="#4F46E5" />
                    <path d="M7.66669 12.629L10.4289 15.3913C10.8734 15.8357 11.0956 16.0579 11.3718 16.0579C11.6479 16.0579 11.8701 15.8357 12.3146 15.3913L18.334 9.37183" stroke="white" strokeWidth="1.6" strokeLinecap="round" />
                  </svg>
                  <span className="font-normal text-base text-gray-900 ">Márkás poló</span>
                </li>
                <li className="flex items-center gap-3">
                  <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="26" height="26" rx="13" fill="#4F46E5" />
                    <path d="M7.66669 12.629L10.4289 15.3913C10.8734 15.8357 11.0956 16.0579 11.3718 16.0579C11.6479 16.0579 11.8701 15.8357 12.3146 15.3913L18.334 9.37183" stroke="white" strokeWidth="1.6" strokeLinecap="round" />
                  </svg>
                  <span className="font-normal text-base text-gray-900 ">Többszínben</span>
                </li>
                <li className="flex items-center gap-3">
                  <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="26" height="26" rx="13" fill="#4F46E5" />
                    <path d="M7.66669 12.629L10.4289 15.3913C10.8734 15.8357 11.0956 16.0579 11.3718 16.0579C11.6479 16.0579 11.8701 15.8357 12.3146 15.3913L18.334 9.37183" stroke="white" strokeWidth="1.6" strokeLinecap="round" />
                  </svg>
                  <span className="font-normal text-base text-gray-900 ">Tiszta pamut poló  60%  40%</span>
                </li>
                <li className="flex items-center gap-3">
                  <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="26" height="26" rx="13" fill="#4F46E5" />
                    <path d="M7.66669 12.629L10.4289 15.3913C10.8734 15.8357 11.0956 16.0579 11.3718 16.0579C11.6479 16.0579 11.8701 15.8357 12.3146 15.3913L18.334 9.37183" stroke="white" strokeWidth="1.6" strokeLinecap="round" />
                  </svg>
                  <span className="font-normal text-base text-gray-900 ">Összes méret elérhető</span>
                </li>
              </ul>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 py-8">
                <div className="flex sm:items-center sm:justify-center w-full">
                  <button 
                    onClick={decreaseQuantity} 
                    className="group py-4 px-6 border border-gray-400 rounded-l-full bg-white transition-all duration-300 hover:bg-gray-50 hover:shadow-sm hover:shadow-gray-300"
                  >
                    <svg className="stroke-gray-900 group-hover:stroke-black" width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M16.5 11H5.5" stroke="" strokeWidth="1.6" strokeLinecap="round" />
                    </svg>
                  </button>
                  <input 
                    type="number" 
                    value={quantity} 
                    onChange={(e) => setQuantity(Number(e.target.value))} 
                    className="font-semibold text-gray-900 cursor-pointer text-lg py-[13px] px-6 w-full sm:max-w-[118px] outline-0 border-y border-gray-400 bg-transparent placeholder:text-gray-900 text-center hover:bg-gray-50" 
                    placeholder="1" 
                    min="1" 
                  />
                  <button 
                    onClick={increaseQuantity} 
                    className="group py-4 px-6 border border-gray-400 rounded-r-full bg-white transition-all duration-300 hover:bg-gray-50 hover:shadow-sm hover:shadow-gray-300"
                  >
                    <svg className="stroke-gray-900 group-hover:stroke-black" width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M11 5.5V16.5M16.5 11H5.5" stroke="#9CA3AF" strokeWidth="1.6" strokeLinecap="round" />
                    </svg>
                  </button>
                </div>
                <button 
                  onClick={() => addToCart(product)} 
                  className="group py-4 px-5 rounded-full bg-indigo-50 text-indigo-600 font-semibold text-lg w-full flex items-center justify-center gap-2 transition-all duration-500 hover:bg-indigo-100"
                >
                  <svg className="stroke-indigo-600 " width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10.7394 17.875C10.7394 18.6344 10.1062 19.25 9.32511 19.25C8.54402 19.25 7.91083 18.6344 7.91083 17.875M16.3965 17.875C16.3965 18.6344 15.7633 19.25 14.9823 19.25C14.2012 19.25 13.568 18.6344 13.568 17.875M4.1394 5.5L5.46568 12.5908C5.73339 14.0221 5.86724 14.7377 6.37649 15.1605C6.88573 15.5833 7.61377 15.5833 9.06984 15.5833H15.2379C16.6941 15.5833 17.4222 15.5833 17.9314 15.1605C18.4407 14.7376 18.5745 14.0219 18.8421 12.5906L19.3564 9.84059C19.7324 7.82973 19.9203 6.8243 19.3705 6.16215C18.8207 5.5 17.7979 5.5 15.7522 5.5H4.1394ZM4.1394 5.5L3.66797 2.75" stroke="" strokeWidth="1.6" strokeLinecap="round" />
                  </svg>
                  Kosárhoz adás
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};