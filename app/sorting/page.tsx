"use client";
import { useEffect, useState } from "react";
import { BsEmojiSmile } from "react-icons/bs";
import {
  FaSortDown,
  FaSortUp,
  FaToggleOff,
  FaToggleOn
} from "react-icons/fa";
import { useMyContext } from "../lib/myContext";
import { countActiveCategories } from "../lib/utils";
import RadioForm from "../ui/radio-form";
import SortingCard from "../ui/sorting-card";

const Page = () => {
  const { categories, settings, updateSettings } = useMyContext();

  const [showHelp, setShowHelp] = useState(settings.helpActive);

  const toggleSort = () => {
    updateSettings({ sorting: !settings.sorting });
  };

  useEffect(() => {
    setShowHelp(settings.helpActive);
  }, [settings]);

  return (
    <div className="pt-16 pb-4 w-full min-h-screen flex flex-col items-center">
      {countActiveCategories(categories) !== 0 && (
        <button
          className="fixed right-3 bottom-4 p-2 bg-secondary border border-primary rounded-xl disabled:hidden "
          onClick={toggleSort}
        >
          {settings.sorting ? <FaToggleOn size={32} /> : <FaToggleOff size={32} />}
        </button>
      )}

      <div>
        {showHelp && (
          <div className="mt-1 bg-secondary flex">
            <div className="flex flex-col">
              <p className="p-4 italic text-justify">
                Si bien podemos ordenar manualmente los productos en la lista
                arrastrándolos, es más práctico que se ordenen automáticamente
                según su categoría y al momento de incorporarlos, siguiendo un
                orden previamente especificado que puede coincidir, por ejemplo,
                con el orden en que recorremos las secciones del supermercado.{" "}
                <BsEmojiSmile
                  size={18}
                  className="inline ml-1 align-baseline"
                />{" "}
              </p>
              <p className="p-4 italic text-justify">
                Lo primero que tenemos que indicar es en qué parte de la lista
                deseamos que aparezcan los productos que no hemos categorizado:
              </p>
            </div>
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

        <RadioForm />

        {showHelp && (
          <div className="mt-1 bg-secondary flex mb-4">
            <span className="p-4 italic text-justify">
              Mediante los botones
              <FaSortUp size={16} className="inline ml-2 align-baseline" />
              <span className="ml-1"> y </span>
              <FaSortDown size={16} className="inline ml-2 align-baseline" />
              <span className="ml-1">
                podemos ordenar las categorías según el criterio que deseemos.
              </span>
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

        <ul className="flex flex-col gap-2 p-2 items-center mb-4">
          {categories.map((category) => {
            if (category.id !== 0)
              return (
                <li key={category.id}>
                  <SortingCard category={category} />
                </li>
              );
          })}
        </ul>

        {showHelp && (
          <div className="mt-1 bg-secondary flex">
            <span className="p-4 italic text-justify">
              Finalmente con el botón flotante
              <FaToggleOff size={16} className="inline ml-2 align-baseline" />
              <span className="ml-1">
                , activamos el ordenamiento automático de los productos de la
                lista según su categoría en el orden preestablecido. Si lo
                queremos desactivar, usamos el mismo botón ahora con el ícono{" "}
              </span>
              <FaToggleOn size={16} className="inline ml-2 align-baseline" />
              <span className="ml-1">{" . (NOTA: Si ya está activo, es decir con el ícono en "}</span>
              <FaToggleOn size={16} className="inline ml-2 align-baseline" />
              <span className="ml-1">{" y modificamos el orden de las categorías, no es necesario volver a tocar el botón ya que los items se ordenarán como corresponde automáticamente.) "}</span>
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
    </div>
  );
};

export default Page;
