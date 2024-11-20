'use client'
import { GoBook } from "react-icons/go";
import { useMyContext } from "../lib/myContext";
import HistorialCard from "../ui/historial-card";

const Page = () => {
  const {items, setItems } = useMyContext();
 
  return (
    <div className="pt-16 pb-4 min-w-full min-h-screen flex flex-col items-center">
      { items.filter(item => item.location === 'historial').length === 0 ? 
        <div className="flex h-full items-center justify-center">
        <GoBook size={150} />
      </div> :
      <ul className="flex flex-col gap-2 p-2 items-center">
        {items.map((item) => (
          item.location==='historial' &&
          <li key={item.id}>
            <HistorialCard item={item} items={items} setItems={setItems} />
          </li>
        ))}
      </ul>
}
    </div>
  );
};

export default Page;
