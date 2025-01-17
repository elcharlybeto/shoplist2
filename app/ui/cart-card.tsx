"use client";
import clsx from "clsx";
import { Dispatch, SetStateAction, useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { TbRosetteDiscountCheck } from "react-icons/tb";
import { Field, Item, Mode } from "../lib/definitions";
import { roundToNDecimals, Toast } from "../lib/utils";
import EditForm from "./edit-form";
import OnSaleForm from "./on-sale-form";

const CartCard = ({
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
  const total = roundToNDecimals(item.qty * item.onSalePrice, 2);

  const editValue = (field: Field) => {
    setEditField(field);
    setStatus("edit");
  };

  const updateCart = (item: Item) => {
    const newCart = items.map((itemCart) =>
      itemCart.id === item.id ? item : itemCart
    );
    localStorage.setItem("items", JSON.stringify(newCart));
    setItems(newCart);
  };

  const handleSave = (updatedItem: Item) => {
    updateCart(updatedItem);
    setStatus("show");
  };

  const deleteItem = () => {
    const deletedItem: Item = {
      ...item,
      location: "list",
      onSale: false,
      onSalePrice: Math.abs(item.price),
    };
    const newList = items.filter((itemList) => itemList.id !== deletedItem.id);
    localStorage.setItem("items", JSON.stringify([deletedItem, ...newList]));
    setItems([deletedItem, ...newList]);
    Toast.fire({
      icon: "success",
      title: "¡Item devuelto a lista!",
    });
  };

  return (
    <>
      <div
        className={clsx(
          "flex items-center justify-around rounded-md border-2 border-opacity-50 border-border-list bg-bg-list p-1 shadow-xl shadow-shadow-list w-[330px]",
          {
            hidden: status === "edit" || status === "onsale",
          }
        )}
      >
        <div className="w-full min-w-full">
          <div className="flex flex-wrap justify-between pl-2 p-1 bg-blue-900 dark:bg-yellow-400 dark:text-black text-white ">
            <div className="flex ">
              <span
                className="p-1 text-lg cursor-pointer font-semibold"
                onClick={() => editValue("qty")}
              >
                {item.qty}
              </span>
              <span
                className="p-1 text-lg cursor-pointer capitalize font-semibold"
                onClick={() => editValue("name")}
              >
                {item.name}
              </span>
            </div>
            <div className="p-1 font-bold mb-1">
              <span className="p-1 px-2 bg-accent rounded-2xl shadow-md text-text" >{`$ ${total}`}</span>
              {item.onSalePrice < Math.abs(item.price) && (
                <span className="text-sm p-1 text-white bg-icon-form">
                  PROMO
                </span>
              )}
            </div>
          </div>
          <div className="flex justify-between w-full">
            <div className=" p-1 pl-2 flex justify-between items-center gap-2">
              <span
                className="cursor-pointer text-lg font-bold"
                onClick={() => editValue("price")}
              >
                {`$ ${Math.abs(item.price)} uni/Kg`}
              </span>
              <span>{`${item.boughtDate}`}</span>
            </div>

            <div className="flex gap-4 justify-end rounded-lg p-2 bg-secondary border border-primary">
              <button
                className="text-icon-list hover:text-hover-icon-list cursor-pointer transition-colors"
                onClick={deleteItem}
              >
                <RiDeleteBin6Line size={24} />
              </button>
              <button
                className={clsx(
                  "text-icon-list hover:text-hover-icon-list cursor-pointer transition-colors disabled:opacity-40 disabled:pointer-events-none",
                  {
                    "text-error-msg": Math.abs(item.price) !== item.onSalePrice,
                  }
                )}
                disabled={item.price === 0}
                onClick={() => {
                  if (Math.abs(item.price) > 0) setStatus("onsale");
                }}
              >
                <TbRosetteDiscountCheck size={24} />
              </button>
            </div>
          </div>
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
          " flex items-center rounded-md shadow-xl justify-around shadow-shadow-list bg-accent p-2 border border-border-list",
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

export default CartCard;
