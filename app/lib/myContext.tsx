'use client'
import React, { createContext, useContext, useState } from 'react';
import { Item } from './definitions';


interface myContextType {
  items : Item[];
  setItems : React.Dispatch<React.SetStateAction<Item[]>>;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const myContext = createContext<myContextType | undefined>(undefined);


export const useMyContext = () => {
  const context = useContext(myContext);
  if (!context) {
    throw new Error('useMyContext debe ser usado dentro de un ContextProvider');
  }
  return context;
};

export const MyContextProvider = ({ children }) => {

  const [items, setItems] = useState<Item[]>(JSON.parse(localStorage.getItem("items") || "[]"));

  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <myContext.Provider value={{ items, setItems, isOpen, setIsOpen }}>
      {children}
    </myContext.Provider>
  );
};