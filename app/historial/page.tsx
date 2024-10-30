'use client'
import { useEffect, useState } from "react";
import { Item } from "../lib/definitions";
import HistorialCard from "../ui/historial-card";

const Page = () => {

  const [historialItems,setHistorialItems] = useState<Item[]>([]);
  
  useEffect(() => {
    const items: Item[] = JSON.parse(localStorage.getItem("items") || "[]");
    setHistorialItems(items.filter((item) => item.location === "historial"));
  }, []);

  return (
    <div className="pt-16 pb-4 min-w-full min-h-screen flex flex-col items-center">
      <ul className="flex flex-col gap-2 p-2 items-center">
        {historialItems.map((item) => (
          <li key={item.id}>
            <HistorialCard item={item} setHistorialItems={setHistorialItems} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Page;
