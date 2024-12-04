'use client'
import React, { createContext, useContext, useEffect, useState } from 'react';
import { Category, Item, Settings } from './definitions';


interface myContextType {
  items : Item[];
  setItems : React.Dispatch<React.SetStateAction<Item[]>>;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  categories : Category[];
  setCategories : React.Dispatch<React.SetStateAction<Category[]>>;
  settings: Settings;
  updateSettings: (updated: Partial<Settings>) => void;
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
  const [categories, setCategories] = useState<Category[]>([]);

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const [settings, setSettings] = useState<Settings>( { helpActive: true, sorting: false, miscPosition: 'end' });
  
  const updateSettings = (updated: Partial<Settings>) => {
    setSettings((prev) => ({ ...prev, ...updated }));
  };

  useEffect(() => {
    setItems(JSON.parse(localStorage.getItem("items") || "[]"))
    setCategories(JSON.parse(localStorage.getItem("categories") || '[{"id":0,"name":"misceláneos","active":true}]'));
      const storedSettings = localStorage.getItem('settings');
      if(storedSettings) setSettings(JSON.parse(storedSettings));
  }, []);

  useEffect(() => {
    localStorage.setItem('settings', JSON.stringify(settings));
  }, [settings]);

    
  return (
    <myContext.Provider value={{ items, setItems, isOpen, setIsOpen, categories, setCategories, settings, updateSettings }}>
      {children}
    </myContext.Provider>
  );
};