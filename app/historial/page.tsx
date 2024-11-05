'use client'
import { useEffect, useState } from "react";
import { Item } from "../lib/definitions";
import HistorialCard from "../ui/historial-card";
import { useMyContext } from "../lib/myContext";

const Page = () => {
  const {items, setItems } = useMyContext();
  const [historialItems,setHistorialItems] = useState<Item[]>([]);

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
