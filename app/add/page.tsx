"use client";
import { useEffect, useState, useCallback} from "react";
import { Item, Mode } from "../lib/definitions";
import { today } from "../lib/utils";
import ItemForm from "../ui/item-form";
import HistorialCard from "../ui/historial-card";
import { TiDeleteOutline } from "react-icons/ti";

const Page = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [fromHistorial, setFromHistorial] = useState<Item[]>([]);
  const [status, setStatus] = useState<Mode>("show");
  const [search, setSearch] = useState("");

  const [itemCard, setItemCard] = useState<Item>({
    id: Date.now(),
    location: "list",
    name: "",
    qty: 1,
    price: 0,
    onSale: false,
    onSalePrice: 0,
    boughtDate: today(),
  });

  const handleSave = (updatedItem: Item) => {
    setItems([updatedItem, ...items]);

    localStorage.setItem("items", JSON.stringify([updatedItem, ...items]));

    setStatus("show");
  };

  const handleSearch = (search: string) => {
    setSearch(search);

    setStatus("show");

    const newItem = {
      ...itemCard,
      name: search,
    };
    setItemCard(newItem);
  };

  const filterItemsByName = useCallback((searchTerm: string): Item[] => {
    return items.filter(
      (item) =>
        item.location === "historial" &&
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [items]);

  useEffect(() => {
    setItems(JSON.parse(localStorage.getItem("items") || "[]"));
  }, []);
  
  useEffect(() => {
    if (search.length > 0) {
      const filteredItems = filterItemsByName(search);
      setFromHistorial(filteredItems);

      setStatus(filteredItems.length > 0 ? "hide" : "show");
    }
  }, [search, filterItemsByName]);

  return (
    <div className="pt-16 pb-4 w-full min-h-screen flex flex-col items-center">
      <div className="w-11/12 p-2">
        <form className="flex border border-text bg-accent mb-2">
          <div className="flex py-2 pl-4 w-11/12 flex-col">
            <label htmlFor="item" className="text-sm">
              Buscar en Historial
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
          <button className="w-1/12 flex justify-center pt-7" onClick={() => setSearch("")}>
          <TiDeleteOutline size={32}/>
          </button>
        </form>
      </div>

      {status === "show" && (
        <div className="flex w-[400px] shadow-lg items-center justify-around p-2 bg-secondary shadow-shadow-list">
          <ItemForm
            item={itemCard}
            onSave={handleSave}
            onBuy={handleSave}
            setStatus={setStatus}
          />
        </div>
      )}
      {status === "hide" && (
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
