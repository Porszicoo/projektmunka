import { createContext, useContext, useState } from "react";

// Kosár kontextus létrehozása
const CartContext = createContext({

});

// Context Provider komponens
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // Termék hozzáadása a kosárhoz
  const addToCart = (product) => {
    setCart((prevCart) => [...prevCart, product]);
  };

  // Termék eltávolítása a kosárból
  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};

// Hook a könnyebb használathoz
export const useCart = () => useContext(CartContext);
