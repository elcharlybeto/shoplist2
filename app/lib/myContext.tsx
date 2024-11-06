'use client'
import React, { createContext, useContext, useEffect, useState } from 'react';
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

export const MyContextProvider = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {

  const [items, setItems] = useState<Item[]>([]);

  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    setItems(JSON.parse(localStorage.getItem("items") || "[]"))
  }, []);
  

  return (
    <myContext.Provider value={{ items, setItems, isOpen, setIsOpen }}>
      {children}
    </myContext.Provider>
  );
};