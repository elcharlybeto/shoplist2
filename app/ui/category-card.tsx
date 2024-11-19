"use client";
import clsx from "clsx";
import { useState } from "react";
import { FaToggleOff, FaToggleOn } from "react-icons/fa6";
import { RiDeleteBin6Line } from "react-icons/ri";
import { Category, Mode } from "../lib/definitions";
import { useMyContext } from "../lib/myContext";
import { Toast } from "../lib/utils";
import CategoryForm from "./category-form";

const CategoryCard = ({ category }: { category: Category }) => {
  const [status, setStatus] = useState<Mode>("show");
  const { items, setItems, categories, setCategories } = useMyContext();
  const updateCategories = (category: Category) => {
    const newCategories = categories.map((savedCategory) =>
      savedCategory.id === category.id ? category : savedCategory
    );
    localStorage.setItem("categories", JSON.stringify(newCategories));
    setCategories(newCategories);
  };

  const handleSave = (updatedCategory: Category) => {
    updateCategories(updatedCategory);
    Toast.fire({
      icon: "success",
      title: `Categoría actualizada!`,
    });
    setStatus("show");
  };

  const deleteCategory = () => {
    const newItems = items.map((item) => {
      if (item.categoryId === category.id) 
        return item = { ...item, categoryId: 0 };
      else return item;
    });
    const newCategories = categories.filter(
      (savedCategory) => savedCategory.id !== category.id
    );
    localStorage.setItem("categories", JSON.stringify(newCategories));
    setItems(newItems);
    setCategories(newCategories);
  };

  const toggleActiveStatus = () => {
    const updatedCategory: Category = {
      ...category,
      active: !category.active,
    };
    updateCategories(updatedCategory);

    Toast.fire({
      icon: "success",
      title: `Categoría ${
        updatedCategory.active ? "activada" : "desactivada"
      } !`,
    });
    setStatus("show");
  };

  return (
    <>
      <div
        className={clsx(
          "flex categories-center justify-around rounded-md border border-border-list bg-bg-list p-3 shadow-xl shadow-shadow-list",
          {
            hidden: status === "edit",
            "opacity-50": !category.active,
            "bg-secondary": !category.active,
          }
        )}
      >
        <div className="flex flex-col px-4 ">
          <div className="flex flex-wrap w-60">
            <div className="flex ">
              <span
                className="py-2 px-1 text-lg cursor-pointer"
                onClick={() => setStatus("edit")}
              >
                {category.name}
              </span>
            </div>
          </div>
        </div>

        <div className="flex gap-4 mr-2">
          <button
            className="text-icon-list hover:text-hover-icon-list cursor-pointer transition-colors"
            onClick={deleteCategory}
          >
            <RiDeleteBin6Line size={24} />
          </button>
          <button
            className="text-icon-list hover:text-hover-icon-list cursor-pointer transition-colors"
            onClick={toggleActiveStatus}
          >
            {category.active ? <FaToggleOn /> : <FaToggleOff />}
          </button>
        </div>
      </div>
      <div
        className={clsx(
          "flex w-[400px] px-4 shadow-xl rounded-md categories-center justify-around bg-secondary shadow-shadow-list p-2",
          {
            hidden: status === "show",
          }
        )}
      >
        <CategoryForm
          category={category}
          onSave={handleSave}
          setStatus={setStatus}
        />
      </div>
    </>
  );
};

export default CategoryCard;
