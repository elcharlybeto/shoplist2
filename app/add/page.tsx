"use client";
import { useEffect, useState } from "react";
import { Item, Mode } from "../lib/definitions";
import { today } from "../lib/utils";
import ItemForm from "../ui/item-form";

const Page = () => {
  const [items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    setItems(JSON.parse(localStorage.getItem("items") || "[]"));
  }, []);

  const [status, setStatus] = useState<Mode>('show');
  const itemCard : Item = {
    id: Date.now(),
    location: "list",
    name: "",
    qty: 1,
    price: 0,
    onSale: false,
    onSalePrice: 0,
    boughtDate: today(),
  };
  
  const handleSave = (updatedItem: Item) => {
    setItems((prevItems) => [...prevItems, updatedItem]);
  
    localStorage.setItem("items", JSON.stringify([...items, updatedItem]));
  
    setStatus('show');
  };
  

  return (
    <div className="pt-16 pb-4 w-full min-h-screen flex flex-col items-center">
      {status === 'show' && (
        <div className="flex w-[400px] shadow-lg items-center justify-around p-2 bg-secondary shadow-shadow-list">
          <ItemForm
            item={itemCard}
            onSave={handleSave}
            onBuy={handleSave}
            setStatus={setStatus}
          />
        </div>
      )}
    </div>
  );
};

export default Page;
