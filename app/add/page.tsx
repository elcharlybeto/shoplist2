"use client";
import { useEffect, useState, useCallback } from "react";
import { Item, Mode } from "../lib/definitions";
import { today } from "../lib/utils";
import ItemForm from "../ui/item-form";
import HistorialCard from "../ui/historial-card";
import { TiDeleteOutline } from "react-icons/ti";
import { useMyContext } from "../lib/myContext";
import { GoBook } from "react-icons/go";
import { useRouter } from "next/navigation";
import { FaShoppingCart } from "react-icons/fa";
import { RiCloseLine, RiPlayListAddFill } from "react-icons/ri";

const Page = () => {
  const { items, setItems, settings } = useMyContext();
  const [fromHistorial, setFromHistorial] = useState<Item[]>([]);
  const [status, setStatus] = useState<Mode>('hide');
  const [search, setSearch] = useState("");
  const [showHelp, setShowHelp] = useState(settings.helpActive);

  const router = useRouter();

  const [itemCard, setItemCard] = useState<Item>({
    id: Date.now(),
    location: "list",
    name: "",
    qty: 1,
    price: 0,
    onSale: false,
    onSalePrice: 0,
    boughtDate: today(),
    categoryId: 0,
  });

  const handleSave = (updatedItem: Item) => {
    setItems([updatedItem, ...items]);

    localStorage.setItem("items", JSON.stringify([updatedItem, ...items]));

    setSearch("");
  };

  const handleSearch = (search: string) => {
    if (search.length >= 0) {
      setSearch(search);

      const newItem = {
        ...itemCard,
        name: search,
      };
      setItemCard(newItem);
    }
  };

  const filterItemsByName = useCallback(
    (searchTerm: string): Item[] => {
      return items.filter(
        (item) =>
          item.location === "historial" &&
          item.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    },
    [items]
  );

  useEffect(() => {
    if (search.length > 0) {
      const filteredItems = filterItemsByName(search);
      setFromHistorial(filteredItems);

      setStatus(filteredItems.length > 0 ? "hide" : "show");
    }else if(items.filter(item=>item.location==='historial').length > 0)
     setStatus('hide')
  }, [search, filterItemsByName, items]);

  useEffect(() => {
    setShowHelp(settings.helpActive);
  }, [settings]);

  useEffect(() => {
    setStatus(items.filter(item=>item.location === 'historial').length > 0 ? "hide": 'show');
  }, [items])
  

  return (
    <div className="pt-16 pb-4 w-full min-h-screen flex flex-col items-center">
      {showHelp && status === "hide" && (
        <div className="mt-1 bg-secondary flex mb-4">
          <span className="p-4 italic text-justify">
            Se detectaron productos previamente ingresados. Puedes agregarlos a
            la lista buscándolos manualmente recorriendo el historial de ventas
            desde el botón
            <GoBook
              size={16}
              className="inline ml-2 align-baseline cursor-pointer"
              onClick={() => router.replace("/historial")}
            />{" "}
            o tipear parte del nombre del producto para encontrarlo
            automáticamente usando la siguiente barra de búsqueda (si no se
            encuentra se muestra un formulario para incorporarlo como producto
            nuevo).
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
      {status === "hide" && (
        <div className="w-11/12 p-2">
          <form className="flex border border-text bg-accent mb-2">
            <div className="flex py-2 pl-4 w-11/12 flex-col">
              <label htmlFor="item" className="text-sm">
                Buscar en productos ingresados antes
              </label>
              <input
                type="text"
                id="item"
                value={search}
                onChange={(e) => {
                  handleSearch(e.target.value);
                }}
                className="p-1 mr-2 mb-2 border border-border-input bg-input-bg"
                autoComplete="off"
              />
            </div>
            <button
              className="w-1/12 flex justify-center pt-7"
              onClick={() => setSearch("")}
            >
              <TiDeleteOutline size={32} />
            </button>
          </form>
        </div>
      )}

      {showHelp && status === "show" && (
        <div className="mt-1 bg-secondary flex mb-4">
          <span className="p-4 italic text-justify">
            No hay productos para agregar desde el historial de compras. Puedes agregar un producto nuevo cargando sus datos en el siguiente
            formulario. Cuantos más datos completes, mejor. Se puede agregar a
            la lista, tocando el botón
            <RiPlayListAddFill
              size={16}
              className="inline ml-2 align-baseline "
            />{" "}
            o directamente al carrito de compras, si lo estamos agregando en el
            momento que estamos comprando (requiere que se haya ingresado un
            precio) tocando el botón{" "}
            <FaShoppingCart size={16} className="inline ml-2 align-baseline " />
            . Para limpiar el formulario, tocar el botón{" "}
            <RiCloseLine size={16} className="inline ml-2 align-baseline " />.
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

      {status === "show" && (
        <div className="flex w-[400px] shadow-xl rounded-2xl border border-primary items-center justify-around p-2 bg-secondary shadow-shadow-list">
          <ItemForm
            item={itemCard}
            onSave={handleSave}
            onBuy={handleSave}
            setStatus={setStatus}
          />
        </div>
      )}
      {status === "hide" && search.length > 0 && (
        <div>
          <ul className="flex flex-col gap-2 p-2 items-center">
            {fromHistorial.map((item) => (
              <li key={item.id}>
                <HistorialCard item={item} items={items} setItems={setItems} />
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Page;
