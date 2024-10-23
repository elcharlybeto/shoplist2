"use client";
import { Dispatch, SetStateAction, useState } from "react";
import { Item, Mode } from "../lib/definitions";
import { FaEdit, FaShoppingCart } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { TbRosetteDiscountCheck } from "react-icons/tb";
import clsx from "clsx";
import { roundToTwoDecimals } from "../lib/utils";
import ItemForm from "./item-form";
import OnSaleForm from "./on-sale-form";

const Listcard = ({
  item,
  setListItems,
}: {
  item: Item;
  setListItems: Dispatch<SetStateAction<Item[]>>;
}) => {
  const items: Item[] = JSON.parse(localStorage.getItem("items") || "[]");
  const [status, setStatus] = useState<Mode>("show");
  const total = roundToTwoDecimals(item.qty * item.price);

  const updateList = (item: Item) => {
    const newList = items.map((itemList) =>
      itemList.id === item.id ? item : itemList
    );
    localStorage.setItem("items", JSON.stringify(newList));
    setListItems(
      ...[newList.filter((itemList) => itemList.location === "list")]
    );
  };

  const handleSave = (updatedItem: Item) => {
    updateList(updatedItem);
    setStatus("show");
  };

  const deleteItem = () => {
    const deletedItem: Item = {
      ...item,
      qty: 1,
      location: "historial",
    };
    updateList(deletedItem);
  };

  const buyItem = () => {
    if (item.price !== 0 && item.onSalePrice !== 0) {
      const boughtItem: Item = {
        ...item,
        location: "cart",
      };
      updateList(boughtItem);
    }
  };

  return (
    <>
      <div
        className={clsx(
          "flex items-center justify-around rounded-md border border-blue-950 bg-slate-300 p-3 shadow-xl",
          {
            hidden: status === "edit" || status === "onsale",
          }
        )}
      >
        <div className="flex flex-col px-4">
          <div>
            <span className="py-2 px-1 w-6">{item.qty}</span>
            <span className="py-2 px-1 text-xl w-40">{item.name}</span>
            <span>{` ( $ ${total} )`}</span>
          </div>
          <div className=" pl-2 text-xs font-bold w-60">
            <span> {`$ ${item.price} uni/Kg, ${item.boughtDate}`}</span>
          </div>
        </div>
        <div className="flex gap-4 mr-2">
          <span
            className="hover:text-gray-400 text-blue-900"
            onClick={() => {
              setStatus("edit");
            }}
          >
            <FaEdit size={24} />
          </span>
          <span
            className="hover:text-gray-400 text-blue-900"
            onClick={deleteItem}
          >
            <RiDeleteBin6Line size={24} />
          </span>
          <span
            className="hover:text-gray-400 text-blue-900"
            onClick={() => {if(item.price > 0) setStatus("onsale")}}
          >
            <TbRosetteDiscountCheck size={24} />
          </span>
          <span className="hover:text-gray-400 text-blue-900">
            <FaShoppingCart size={24} onClick={buyItem} />
          </span>
        </div>
      </div>
      <div
        className={clsx(
          "flex w-[400px] px-4 shadow-xl rounded-md items-center justify-around bg-yellow-100 p-2",
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
        className={clsx("flex items-center rounded-md shadow-xl justify-around bg-green-200 p-2", {
          hidden: status === "show" || status === "edit",
        })}
      >
        <OnSaleForm item={item} onSave={handleSave} setStatus={setStatus} />
      </div>
    </>
  );
};

export default Listcard;
