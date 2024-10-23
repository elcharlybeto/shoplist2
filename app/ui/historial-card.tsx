"use client";
import { Dispatch, SetStateAction, useState } from "react";
import { Item, Mode } from "../lib/definitions";
import { FaEdit, FaPlus } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import clsx from "clsx";
import ItemForm from "./item-form";
import OnSaleForm from "./on-sale-form";

const HistorialCard = ({
  item,
  setHistorialItems,
}: {
  item: Item;
  setHistorialItems: Dispatch<SetStateAction<Item[]>>;
}) => {
  const items: Item[] = JSON.parse(localStorage.getItem("items") || "[]");
  const [status, setStatus] = useState<Mode>("show");

  const updateHistorial = (item: Item) => {
    const newHistorial = items.map((itemHistorial) =>
      itemHistorial.id === item.id ? item : itemHistorial
    );
    localStorage.setItem("items", JSON.stringify(newHistorial));
    setHistorialItems(
      ...[newHistorial.filter((itemHistorial) => itemHistorial.location === "historial")]
    );
  };

  const handleSave = (updatedItem: Item) => {
    updateHistorial(updatedItem);
    setStatus("show");
  };

  const deleteItem = () => {
    const newItems = items.filter((itemList) => itemList.id !== item.id );
    localStorage.setItem("items", JSON.stringify(newItems));
    setHistorialItems(
      ...[newItems.filter((itemList) => itemList.location === "historial")]
    );
  };

  const addItemToList = () =>{
   const newListItem : Item = {
    ...item,
    qty: 1,
    location : "list"
   }
   updateHistorial(newListItem);
  }

  return (
    <>
      <div
        className={clsx("flex items-center justify-around rounded-md border border-blue-950 bg-slate-300 p-3 shadow-xl", {
          hidden: status === "edit" || status === "onsale",
        })}
      >
        <div className="flex flex-col">
          <div>
            <span className="py-2 px-1 text-xl w-40">{item.name}</span>
          </div>
          <div className="pl-2 text-xs font-bold w-60">
            <span> {`$ ${item.price} uni/Kg, ${item.boughtDate}`}</span>
          </div>
        </div>
        <div className="flex gap-4 mr-2">
          <span
            className="hover:text-gray-400 text-red-900"
            onClick={() => {
              setStatus("edit");
            }}
          >
            <FaEdit size={24} />
          </span>
          <span
            className="hover:text-gray-400 text-red-900"
            onClick={deleteItem}
          >
            <RiDeleteBin6Line size={24} />
          </span>
          <span
            className="hover:text-gray-400 text-red-900"
            onClick={addItemToList}
          >
            <FaPlus size={24} />
          </span>
        </div>
      </div>
      <div
        className={clsx(
          "flex w-[400px] shadow-lg items-center justify-around bg-yellow-300 p-2",
          {
            hidden: status === "show" || status === "onsale",
          }
        )}
      >
        <ItemForm
          item={item}
          onSave={handleSave}
          onBuy={handleSave}
          setStatus={setStatus}
        />
      </div>
      <div
        className={clsx("flex items-center justify-around bg-green-300 p-2", {
          hidden: status === "show" || status === "edit",
        })}
      >
        <OnSaleForm item={item} onSave={handleSave} setStatus={setStatus} />
      </div>
    </>
  );
};

export default HistorialCard;
