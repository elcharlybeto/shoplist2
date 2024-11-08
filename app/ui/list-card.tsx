"use client";
import { Dispatch, SetStateAction, useState } from "react";
import { Field, Item, Mode } from "../lib/definitions";
import { FaShoppingCart } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { TbRosetteDiscountCheck } from "react-icons/tb";
import clsx from "clsx";
import { roundToNDecimals, today } from "../lib/utils";
import OnSaleForm from "./on-sale-form";
import EditForm from "./edit-form";
import Swal from "sweetalert2";

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
  const total = roundToNDecimals(item.qty * item.price,2);

  const Toast = Swal.mixin({
    toast: true,
    position: "top-start",
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    },
  });

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
    Toast.fire({
      icon: "success",
      title: "Item devuelto al historial!",
    });
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
      Toast.fire({
        icon: "success",
        title: "Item agregado al carrito!",
      });
    }
  };

  return (
    <>
      <div
        className={clsx(
          "flex items-center justify-around rounded-md border border-border-list bg-bg-list p-3 shadow-xl shadow-shadow-list w-[370px]",
          {
            hidden: status === "edit" || status === "onsale",
          }
        )}
      >
        <div className="w-full min-w-full">
            <div className="flex flex-wrap">
              <div className="flex ">
                <span
                  className="p-1 text-lg cursor-pointer"
                  onClick={() => editValue("qty")}
                >
                  {item.qty}
                </span>
                <span
                  className="p-1 text-lg cursor-pointer"
                  onClick={() => editValue("name")}
                >
                  {item.name}
                </span>
              </div>
              <span className="p-1 text-lg font-bold">{` ( $ ${total} )`}</span>
            </div>

              <div className="p-1 flex justify-between  ">
                <span
                  className="cursor-pointer font-bold"
                  onClick={() => editValue("price")}
                >{`$ ${item.price} uni/Kg`}</span>
                <span>
                  { `${item.boughtDate}`}
                </span>
              </div>
          
          <div className="flex gap-4 justify-end rounded-lg p-2 bg-secondary border border-primary">
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
