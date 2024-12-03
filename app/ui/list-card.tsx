"use client";
import clsx from "clsx";
import { Dispatch, SetStateAction, useState } from "react";
import { FaCheckCircle, FaShoppingCart } from "react-icons/fa";
import { FaFilter } from "react-icons/fa6";
import { MdFilterAltOff } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { TbRosetteDiscountCheck } from "react-icons/tb";
import { Field, Item, Mode } from "../lib/definitions";
import { useMyContext } from "../lib/myContext";
import {
  activateAllCategories,
  countInactiveCategories,
  getCategoryNameById,
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
      onSale: false,
      onSalePrice: item.price
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

  const clearFilters = () => {
    const newCategories = activateAllCategories(categories);
    setCategories(newCategories);
    localStorage.setItem("categories", JSON.stringify(newCategories));
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
          "flex items-center justify-around rounded-md border-2 border-opacity-50 border-border-list bg-bg-list p-1 shadow-xl shadow-shadow-list w-[350px]",
          {
            hidden: status === "edit" || status === "onsale",
          }
        )}
      >
        <div className="w-full min-w-full">
          <div className="flex flex-wrap justify-between mb-1 pl-2 p-1  bg-blue-900 dark:bg-yellow-400 dark:text-black text-white ">
            <div className="flex">
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
           
            <span className="p-1 px-2 bg-tertiary rounded-2xl shadow-md cursor-pointer font-semibold text-text" onClick={() => editValue("price")} >{`$ ${item.price}` }</span>
          </div>

        

          <div className="flex justify-between">
            {editCategory ? (
             <div className="flex items-center">
               <select
                 id="category"
                 value={item.categoryId}
                 onChange={(e) => handleSelectCategory(e.target.value)}
                 className="p-1 mr-2 border border-primary rounded-lg bg-input-bg "
               >
                 {categories.map((category) => (
                   <option key={category.id} value={category.id} className="bg-tertiary">
                     {category.name}
                   </option>
                 ))}
               </select>
               <button   className="text-icon-list hover:text-hover-icon-list cursor-pointer transition-colors p-2 border border-primary bg-secondary rounded-lg" onClick={()=>setEditCategory(false)}><FaCheckCircle size={16} />
               </button>
             </div>
            ) : (
              <div className="flex gap-1">
                <span
                  className="rounded-lg p-2 bg-tertiary border border-primary cursor-pointer"
                  onClick={() => setEditCategory(true)}
                >
                  {getCategoryNameById(item.categoryId, categories)}
                </span>
                {countInactiveCategories(categories) > 0  ? 
                <button
                className="text-icon-list hover:text-hover-icon-list cursor-pointer transition-colors p-2 border border-primary bg-secondary rounded-lg"
                onClick={() => clearFilters() }
              >
                <MdFilterAltOff size={18} />
              </button>
                :
                <button
                  className="text-icon-list hover:text-hover-icon-list cursor-pointer transition-colors p-2 border border-primary bg-secondary rounded-lg"
                  onClick={() => filterByThisCategory(item.categoryId) }
                >
                  <FaFilter size={18} />
                </button>
                }
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
