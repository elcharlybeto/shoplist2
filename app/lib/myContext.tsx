'use client'
import React, { createContext, useContext, useEffect, useState } from 'react';
import { Category, Item } from './definitions';


interface myContextType {
  items : Item[];
  setItems : React.Dispatch<React.SetStateAction<Item[]>>;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  categories : Category[];
  setCategories : React.Dispatch<React.SetStateAction<Category[]>>;
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

  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    setItems(JSON.parse(localStorage.getItem("items") || "[]"))
    setCategories(JSON.parse(localStorage.getItem("categories") || '[{"id":0,"name":"misceláneos","active":true}]'))
  }, []);
  

  return (
    <myContext.Provider value={{ items, setItems, isOpen, setIsOpen, categories, setCategories }}>
      {children}
    </myContext.Provider>
  );
};