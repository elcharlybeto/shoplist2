'use client';
import { useState } from "react";
import { FaSortAlphaDown } from "react-icons/fa";
import { GoBook } from "react-icons/go";
import { IoTimeOutline } from "react-icons/io5";
import { useMyContext } from "../lib/myContext";
import HistorialCard from "../ui/historial-card";

const Page = () => {
  const { items, setItems } = useMyContext();
  const [sorted, setSorted] = useState(false);

  const unsorted = [...items]; 
  const sortedItems = [...items].sort((a, b) => a.name.localeCompare(b.name));

  return (
    <div className="pt-16 pb-4 min-w-full min-h-screen flex flex-col items-center">
      <button
        className="fixed right-3 bottom-4 p-2 bg-secondary border border-primary rounded-xl "
        onClick={() => setSorted((prev)=>!prev)}
      >
      {sorted ?  <IoTimeOutline  size={32}/> : <FaSortAlphaDown size={32} />}
      </button>
      {items.filter(item => item.location === 'historial').length === 0 ? (
        <div className="flex h-full items-center justify-center">
          <GoBook size={150} />
        </div>
      ) : sorted ? (
        <ul className="flex flex-col gap-2 p-2 items-center">
          {sortedItems.map((item) => (
            item.location === 'historial' && (
              <li key={item.id}>
                <HistorialCard item={item} items={items} setItems={setItems} />
              </li>
            )
          ))}
        </ul>
      ) : (
        <ul className="flex flex-col gap-2 p-2 items-center">
          {unsorted.map((item) => (
            item.location === 'historial' && (
              <li key={item.id}>
                <HistorialCard item={item} items={items} setItems={setItems} />
              </li>
            )
          ))}
        </ul>
      )}
    </div>
  );
};

export default Page;

