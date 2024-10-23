"use client";
import { Dispatch, SetStateAction, useState } from "react";
import { Item, Mode } from "../lib/definitions";
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { TbRosetteDiscountCheck } from "react-icons/tb";
import clsx from "clsx";
import { roundToTwoDecimals } from "../lib/utils";
import ItemForm from "./item-form";
import OnSaleForm from "./on-sale-form";

const CartCard = ({
  item,
  setCartItems,
}: {
  item: Item;
  setCartItems: Dispatch<SetStateAction<Item[]>>;
}) => {
  const items: Item[] = JSON.parse(localStorage.getItem("items") || "[]");
  const [status, setStatus] = useState<Mode>("show");
  const total = roundToTwoDecimals(item.qty * item.onSalePrice);

  const updateCart = (item: Item) => {
    const newCart = items.map((itemCart) =>
      itemCart.id === item.id ? item : itemCart
    );
    localStorage.setItem("items", JSON.stringify(newCart));
    setCartItems(
      ...[newCart.filter((itemCart) => itemCart.location === "cart")]
    );
  };

  const handleSave = (updatedItem: Item) => {
    updateCart(updatedItem);
    setStatus("show");
  };

  const deleteItem = () => {
    const deletedItem: Item = {
      ...item,
      location: "list",
      onSalePrice: item.price
    };
    updateCart(deletedItem);
  };

  return (
    <>
      <div
        className={clsx("flex items-center justify-around rounded-md border border-blue-950 bg-slate-300 p-3 shadow-xl", {
          hidden: status === "edit" || status === "onsale",
        })}
      >
        <div className="flex flex-col px-4">
          <div>
            <span className="py-2 px-1 w-6">{item.qty}</span>
            <span className="py-2 px-1 text-xl w-40">{item.name}</span>
            <span>{` ( $ ${total} )`}</span>
          </div>
          <div className="pl-2 text-xs font-bold w-60">
            <span> {`$ ${item.onSalePrice} uni/Kg, ${item.boughtDate}`}</span>
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
            onClick={() => setStatus("onsale")}
          >
            <TbRosetteDiscountCheck size={24} />
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

export default CartCard;
