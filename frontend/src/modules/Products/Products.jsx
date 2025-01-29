// Products.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

 export const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Adatok lekérése az API-ból
    axios.get('http://localhost:8080/termek')
      .then((response) => {
        setProducts(response.data);  // Az API válaszának beállítása
        setLoading(false);  // Betöltés befejeződött
      })
      .catch((error) => {
        console.error('Hiba történt a termékek lekérése közben:', error);
        setLoading(false);
      });
  }, []); // Csak egyszer fut le, amikor a komponens betöltődik

 // React komponens módosítása hiba kezelésével
if (loading) {
    return <p>Betöltés...</p>;
  } else if (products.length === 0) {
    console.log(products);
    return <p>Nincsenek elérhető termékek.</p>;
  }
  
  return (
    <div className="grid grid-cols-3 gap-4">
      {products.map((termek) => (
        <div key={termek.id} className="p-4 border rounded shadow-lg">
          <h3 className="font-bold">{termek.nev}</h3>
          <p className="font-semibold">${termek.ar}</p>
        </div>
      ))}
    </div>
  );
  
};


