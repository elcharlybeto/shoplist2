'use client';
import { useEffect, useState } from "react";
import { FaSortAlphaDown } from "react-icons/fa";
import { GoBook } from "react-icons/go";
import { IoTimeOutline } from "react-icons/io5";
import { useMyContext } from "../lib/myContext";
import { FaPlus } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import HistorialCard from "../ui/historial-card";

const Page = () => {
  const { items, setItems, settings } = useMyContext();
  const [sorted, setSorted] = useState(false);
  const [showHelp, setShowHelp] = useState(settings.helpActive);

  const unsorted = [...items]; 
  const sortedItems = [...items].sort((a, b) => a.name.localeCompare(b.name));

  useEffect(() => {
    setShowHelp(settings.helpActive);
  }, [settings]);


  return (
    <div className="pt-16 pb-4 min-w-full min-h-screen flex flex-col items-center">
      <button
        className="fixed right-3 bottom-4 p-2 bg-secondary border border-primary rounded-xl "
        onClick={() => setSorted((prev)=>!prev)}
      >
      {sorted ?  <IoTimeOutline  size={32}/> : <FaSortAlphaDown size={32} />}
      </button>

      {showHelp &&  (
        <div className="mt-1 bg-secondary flex mb-4">
          <span className="p-4 italic text-justify">
            Este es el historial de compras, aquí se muestran los productos comprados comenzando por los más recientes. Puedes agregarlos a
            la lista tocando su botón
            <FaPlus
              size={16}
              className="inline ml-2 align-baseline"
            />{" "}
            o eliminarlos definitivamente de la app tocando su botón <RiDeleteBin6Line
              size={16}
              className="inline ml-2 align-baseline"
            /> .
          </span>
          <div className="flex justify-start mr-2">
            <button
              className="h-2 w-2 p-2 opacity-50"
              onClick={() => setShowHelp(false)}
            >
              X
            </button>
          </div>
        </div>
      )}

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
      {showHelp &&  (
        <div className="mt-4 bg-secondary flex mb-4">
          <span className="p-4 italic text-justify">
            El botón flotante permite ordenar los productos del historial alfabéticamente cuando muestra el ícono 
            <FaSortAlphaDown
              size={16}
              className="inline ml-2 align-baseline"
            />{" "}
            o por orden de compra empezando por los más recientemente comprados cuando muestra el ícono <IoTimeOutline
              size={16}
              className="inline ml-2 align-baseline"
            /> .
          </span>
          <div className="flex justify-start mr-2">
            <button
              className="h-2 w-2 p-2 opacity-50"
              onClick={() => setShowHelp(false)}
            >
              X
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;

