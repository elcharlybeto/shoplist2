"use client";
import clsx from "clsx";
import { Dispatch, SetStateAction, useState } from "react";
import { FaEdit, FaShoppingCart } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { TbRosetteDiscountCheck } from "react-icons/tb";
import { Field, Item, Mode } from "../lib/definitions";
import { useMyContext } from "../lib/myContext";
import {
  getCategoryNameById,
  roundToNDecimals,
  Toast,
  updateCategoryActiveState
} from "../lib/utils";
import EditForm from "./edit-form";
import OnSaleForm from "./on-sale-form";

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
  const [editCategory, setEditCategory] = useState(false);
  const total = roundToNDecimals(item.qty * item.price, 2);
  const { categories, setCategories } = useMyContext();

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
      location: "historial",
    };
    const newList = items.filter((itemList) => itemList.id !== deletedItem.id);
    localStorage.setItem("items", JSON.stringify([deletedItem, ...newList]));
    setItems([deletedItem, ...newList]);
    Toast.fire({
      icon: "success",
      title: "¡Item devuelto al historial!",
    });
  };

  const buyItem = () => {
    if (item.price !== 0 && item.onSalePrice !== 0) {
      const boughtItem: Item = {
        ...item,
        location: "cart",
      };
      const newList = items.filter((itemList) => itemList.id !== boughtItem.id);
      localStorage.setItem("items", JSON.stringify([boughtItem, ...newList]));
      setItems([boughtItem, ...newList]);
      Toast.fire({
        icon: "success",
        title: "¡Item agregado al carrito!",
      });
    }
  };

  const filterByThisCategory = (id: number) => {
    const newCategories = updateCategoryActiveState(id, categories);
    setCategories(newCategories);
    localStorage.setItem("categories",JSON.stringify(newCategories));
  };

  const handleSelectCategory = (categoryId: string) => {
    const updatedItem = {
      ...item,
      categoryId: Number(categoryId)
    }
    setEditCategory(false);
    updateList(updatedItem);
  };

  return (
    <>
      <div
        className={clsx(
          "flex items-center justify-around rounded-md border-2 border-opacity-50 border-border-list bg-bg-list p-3 shadow-xl shadow-shadow-list w-[350px]",
          {
            hidden: status === "edit" || status === "onsale",
          }
        )}
      >
        <div className="w-full min-w-full">
          <div className="flex flex-wrap justify-between">
            <div className="flex">
              <span
                className="p-1 text-lg cursor-pointer"
                onClick={() => editValue("qty")}
              >
                {item.qty}
              </span>
              <span
                className="p-1 text-lg cursor-pointer capitalize"
                onClick={() => editValue("name")}
              >
                {item.name}
              </span>
            </div>
            <span className="p-1 bg-accent rounded-2xl shadow-md">{`$ ${total} `}</span>
          </div>

          <div className="p-1 flex justify-between">
            <span
              className="cursor-pointer text-lg font-bold"
              onClick={() => editValue("price")}
            >{`$ ${item.price} uni/Kg`}</span>
            <span>{`${item.boughtDate}`}</span>
          </div>

          <div className="flex justify-between">
            {editCategory ? (
              <select
                id="category"
                value={item.categoryId}
                onChange={(e) => handleSelectCategory(e.target.value)}
                className="p-1 mr-2 mb-2 border border-primary rounded-lg bg-input-bg"
              >
                {categories.map((category) => (
                  <option key={category.id} value={category.id} className="bg-tertiary">
                    {category.name}
                  </option>
                ))}
              </select>
            ) : (
              <div className="flex gap-1">
                <span
                  className="rounded-lg p-2 bg-tertiary border border-primary cursor-pointer"
                  onClick={() => filterByThisCategory(item.categoryId)}
                >
                  {item.categoryId === 0
                    ? "misceláneos"
                    : getCategoryNameById(item.categoryId, categories)}{" "}
                </span>
                <button
                  className="text-icon-list hover:text-hover-icon-list cursor-pointer transition-colors p-2 border border-primary bg-secondary rounded-lg"
                  onClick={() => setEditCategory(true)}
                >
                  <FaEdit size={24} />
                </button>
              </div>
            )}

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
