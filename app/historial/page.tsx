'use client'
import { useEffect, useState } from "react";
import { Item } from "../lib/definitions";
import HistorialCard from "../ui/historial-card";

const Page = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [historialItems,setHistorialItems] = useState<Item[]>([]);

  useEffect(() => {
    setItems(JSON.parse(localStorage.getItem("items") || "[]"));
  }, []);
  
  useEffect(() => {
    setHistorialItems(items.filter((item) => item.location === "historial"));
  }, [items]);

  return (
    <div className="pt-16 pb-4 min-w-full min-h-screen flex flex-col items-center">
      <ul className="flex flex-col gap-2 p-2 items-center">
        {historialItems.map((item) => (
          <li key={item.id}>
            <HistorialCard item={item} items={items} setItems={setItems} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Page;
