"use client";
import { Dispatch, SetStateAction, useState } from "react";
import { Field, Item, Mode } from "../lib/definitions";
import { FaShoppingCart } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { TbRosetteDiscountCheck } from "react-icons/tb";
import clsx from "clsx";
import { roundToTwoDecimals, today } from "../lib/utils";
import OnSaleForm from "./on-sale-form";
import EditForm from "./edit-form";

const Listcard = ({
  item,
  items,
  setItems,
}: {
  item: Item;
  items: Item[];
  setItems: Dispatch<SetStateAction<Item[]>>;
}) => {
  const [status, setStatus] = useState<Mode>("show");
  const [editField, setEditField] = useState<Field>("qty");
  const total = roundToTwoDecimals(item.qty * item.price);

  const editValue = (field: Field) => {
    setEditField(field);
    setStatus("edit");
  };

  const updateList = (item: Item) => {
    const newList = items.map((itemList) =>
      itemList.id === item.id ? item : itemList
    );
    
    localStorage.setItem("items", JSON.stringify(newList));
    setItems(newList);
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
    const newList = items.filter((itemList) => itemList.id !== deletedItem.id);
    localStorage.setItem("items", JSON.stringify([deletedItem, ...newList]));
    setItems([deletedItem, ...newList]);
  };

  const buyItem = () => {
    if (item.price !== 0 && item.onSalePrice !== 0) {
      const boughtItem: Item = {
        ...item,
        location: "cart",
        boughtDate: today(),
      };
      const newList = items.filter((itemList) => itemList.id !== boughtItem.id);
      localStorage.setItem("items", JSON.stringify([boughtItem, ...newList]));
      setItems([boughtItem, ...newList]);
    }
  };

  return (
    <>
      <div
        className={clsx(
          "flex items-center justify-around rounded-md border border-border-list bg-bg-list p-3 shadow-xl shadow-shadow-list",
          {
            hidden: status === "edit" || status === "onsale",
          }
        )}
      >
        <div className="flex flex-col pr-4 ">
          <div className="flex flex-wrap w-60">
            <div className="flex ">
              <span
                className="py-2 px-1 text-lg cursor-pointer"
                onClick={() => editValue("qty")}
              >
                {item.qty}
              </span>
              <span
                className="py-2 px-1 text-lg cursor-pointer"
                onClick={() => editValue("name")}
              >
                {item.name}
              </span>
            </div>
            <span className="py-2 px-1 text-lg font-bold">{` ( $ ${total} )`}</span>
          </div>
          <div className=" pl-2 text-xs font-bold w-60">
            <span className="cursor-pointer" onClick={() => editValue("price")}>
              {" "}
              {`$ ${item.price} uni/Kg, ${item.boughtDate}`}
            </span>
          </div>
        </div>
        <div className="flex gap-4 mr-2">
          <button
            className="text-icon-list hover:text-hover-icon-list cursor-pointer transition-colors"
            onClick={deleteItem}
          >
            <RiDeleteBin6Line size={24} />
          </button>
          <button
            className="text-icon-list hover:text-hover-icon-list cursor-pointer transition-colors disabled:opacity-40 disabled:pointer-events-none"
            disabled={item.price === 0}
            onClick={() => {
              if (item.price > 0) setStatus("onsale");
            }}
          >
            <TbRosetteDiscountCheck size={24} />
          </button>
          <button
            className="text-icon-list hover:text-hover-icon-list cursor-pointer transition-colors disabled:opacity-40 disabled:pointer-events-none"
            disabled={item.price === 0 || item.qty === 0}
          >
            <FaShoppingCart size={24} onClick={buyItem} />
          </button>
        </div>
      </div>
      <div
        className={clsx(
          "flex w-[400px] px-4 shadow-xl rounded-md items-center justify-around bg-secondary shadow-shadow-list p-2",
          {
            hidden: status === "show" || status === "onsale",
          }
        )}
      >
        <EditForm
          item={item}
          field={editField}
          onSave={handleSave}
          setStatus={setStatus}
        />
      </div>
      <div
        className={clsx(
          "flex items-center rounded-md shadow-xl justify-around shadow-shadow-list bg-accent p-2 border border-border-list",
          {
            hidden: status === "show" || status === "edit",
          }
        )}
      >
        <OnSaleForm item={item} onSave={handleSave} setStatus={setStatus} />
      </div>
    </>
  );
};

export default Listcard;
