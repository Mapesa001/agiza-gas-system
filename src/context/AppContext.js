import React, { createContext, useState } from 'react';
import './AppContext.css';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);

  const addOrder = (order) => setOrders([...orders, order]);
  const addProduct = (product) => setProducts([...products, product]);

  return (
    <AppContext.Provider value={{ orders, products, addOrder, addProduct }}>
      {children}
    </AppContext.Provider>
  );
};
