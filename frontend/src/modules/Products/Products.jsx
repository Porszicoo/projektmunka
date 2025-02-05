import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';

export const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const observer = useRef(null);
  const lastProductRef = useRef();
  

  const fetchMoreProducts = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/termek/termekview/${page}`); 
      setProducts((prevProducts) => [...prevProducts, ...response.data]);
      setPage((prevPage) => prevPage + 1);
    } catch (error) {
      console.error('Hiba történt a termékek lekérése közben:', error);
    } finally {
      setLoading(false);
    }
  };
  const fetchFilteredProducts = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/termek/filtertermek`, {
        params: {
          marka: 'Adidas',
        },
      }); 
      setProducts((prevProducts) => [...prevProducts, ...response.data]);
      setPage((prevPage) => prevPage + 1);
    } catch (error) {
      console.error('Hiba történt a termékek lekérése közben:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMoreProducts();
  }, []);

  useEffect(() => {
    fetchFilteredProducts();
  }, []);


  useEffect(() => {
    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        fetchMoreProducts();
      }
    });
    if (lastProductRef.current) {
      observer.current.observe(lastProductRef.current);
    }
    return () => observer.current.disconnect();
  }, [products]);

  if (loading && products.length === 0) {
    return <p>Betöltés...</p>;
  } else if (products.length === 0) {
    return <p>Nincsenek elérhető termékek.</p>;
  }

  return (
    <div className="grid grid-cols-4 gap-0">
      {products.map((termekview, index) => (
        <div 
          key={termekview.Marka} 
          className="relative m-10 flex w-full max-w-xs flex-col overflow-hidden rounded-lg border border-gray-100 bg-gray-100 shadow-md
                     transition duration-300 ease-in-out hover:shadow-lg hover:-translate-y-2"
          ref={index === products.length - 1 ? lastProductRef : null}
        >
          <a className="relative mx-3 mt-3 flex h-60 overflow-hidden rounded-xl" href="#">
            <img 
              className="object-cover w-full h-full" 
              src={termekview.kepUrl} 
              alt={termekview.Ar} 
              loading="lazy" 
            />
          </a>
  
          <div className="mt-4 px-5 pb-5">
            <a href="#">
              <h5 className="text-xl tracking-tight text-slate-900">{termekview.Marka}</h5>
            </a>
  
            {/* Szín, Méret és Ár egy sorban */}
            <div className="mt-2 flex justify-between items-center">
              <p className="text-sm text-slate-700">Szín: <span className="font-semibold">{termekview.Szín}</span></p>
              <p className="text-sm text-slate-700">Méret: <span className="font-semibold">{termekview.Meret}</span></p>
              <p className="text-3xl font-bold text-slate-900">{termekview.TermekAr} Ft</p>
            </div>
  
            <a
              href="#"
              className="flex items-center justify-center rounded-md bg-slate-900 px-5 py-2.5 text-center text-sm font-medium text-white 
                         hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-300"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="mr-2 h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              Kosárba
            </a>
          </div>
        </div>
      ))}
      {loading && <p className="text-center text-gray-500">További termékek betöltése...</p>}
    </div>
  );
  
  
  
  
  
};
