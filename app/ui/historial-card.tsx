"use client";
import clsx from "clsx";
import { Dispatch, SetStateAction, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { Field, Item, Mode } from "../lib/definitions";
import EditForm from "./edit-form";
import { Toast } from "../lib/utils";

const HistorialCard = ({
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
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [expanded, setExpanded] = useState(false);

  const editValue = (field: Field) => {
    setEditField(field);
    setStatus("edit");
  };

 

  const updateHistorial = (item: Item) => {
    const newHistorial = items.map((itemHistorial) =>
      itemHistorial.id === item.id ? item : itemHistorial
    );
    localStorage.setItem("items", JSON.stringify(newHistorial));
    setItems(newHistorial);
  };

  const handleSave = (updatedItem: Item) => {
    updateHistorial(updatedItem);
    setStatus("show");
  };

  const deleteItem = () => {
    const newItems = items.filter((itemList) => itemList.id !== item.id);
    localStorage.setItem("items", JSON.stringify(newItems));
    setItems(newItems);
  };

  const addItemToList = () => {
    const newListItem: Item = {
      ...item,
      categoryId: item?.categoryId ? item.categoryId : 0, 
      location: "list",
    };

    const newList = items.filter((itemList) => itemList.id !== newListItem.id);
    localStorage.setItem("items", JSON.stringify([newListItem, ...newList]));
    setItems([newListItem, ...newList]);

    Toast.fire({
      icon: "success",
      title: "¡Item agregado a lista!",
    });
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
      
        <div className="flex flex-col px-4 ">
          <div className="flex flex-wrap w-60">
            <div className="flex">
              <span
                className="py-2 px-1 text-lg cursor-pointer"
                onClick={() => editValue("qty")}
              >
                {item.qty}
              </span>
              <span
                className="py-2 px-1 text-lg cursor-pointer capitalize"
                onClick={() => editValue("name")}
              >
                {item.name}
              </span>
            </div>
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
            className="text-icon-list hover:text-hover-icon-list cursor-pointer transition-colors"
            onClick={addItemToList}
          >
            <FaPlus size={24} />
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
          setExpanded={setExpanded}
        />
      </div>
    </>
  );
};

export default HistorialCard;
