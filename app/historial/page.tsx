'use client'
import { useState } from "react";
import { Item } from "../lib/definitions";
import HistorialCard from "../ui/historial-card";

const Page = () => {
  const items: Item[] = JSON.parse(localStorage.getItem('items') || '[]');
  const [historialItems,setHistorialItems] = useState( items.filter((item) => item.location === "historial"));

  return (
    <div className="pt-16 pb-4 min-w-full min-h-screen flex flex-col items-center bg-red-100">
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
