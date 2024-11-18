"use client";
import { useState } from "react";
import { Category } from "../lib/definitions";
import { useMyContext } from "../lib/myContext";
import CategoryCard from "../ui/category-card";
import { formatString, isCategoryNameInArray, Toast } from "../lib/utils";
import { FaRegCheckCircle, FaRegWindowClose } from "react-icons/fa";

const Page = () => {
  const { categories, setCategories } = useMyContext();

  const [name, setName] = useState("");
  const [nameError, setNameError] = useState(false);

  const showErrorMsg = (msg: string) => {
    return (
      <div className="text-sm text-error-msg  font-semibold h-6">{msg}</div>
    );
  };

  const handleAddCategory = () => {
    if (formatString(name).length > 0) {
      if (!isCategoryNameInArray(categories,formatString(name))) {
        const newCategory: Category = {
          id: Date.now(),
          name: formatString(name),
          active: true,
        };
        setCategories([newCategory, ...categories]);
        Toast.fire({
          icon: "success",
          title: "¡Categoría agregada!",
          });
        setName("");
        setNameError(false);

        localStorage.setItem(
          "categories",
          JSON.stringify([newCategory, ...categories])
        );
      } else setNameError(true);
    } else setNameError(true);
  };

  const handleCancel = () => {
    setName("");
    setNameError(false);
  };

  return (
    <div className="pt-16 pb-4 w-full min-h-screen flex flex-col items-center">
      <div className="flex w-[400px] shadow-lg mt-4 items-center justify-around py-2 px-4 bg-tertiary rounded-md shadow-shadow-list">

       <div className="flex flex-col w-11/12 p-2">
         <label htmlFor="name" className="text-sm">Nueva Categoría</label>
         <input
           type="text"
           value={name}
           onChange={(e) => setName(e.target.value)}
           className="p-1 mr-2 mb-2 border border-border-input bg-input-bg"
           autoComplete="off"
           required
         />
          {nameError ? (
            showErrorMsg(formatString(name).length === 0 ?"¡Se debe ingresar una descripción!":"¡Categoría existente!")
          ) : (
            <div className="min-h-6"></div>
          )}
       </div>

        <div className="flex flex-col w-1/12 h-full items-center justify-around">
          <span
          className="text-icon-form hover:text-hover-icon-form cursor-pointer transition-colors" onClick={handleAddCategory}><FaRegCheckCircle size={24} /></span>
          <span
          className="text-icon-form hover:text-hover-icon-form cursor-pointer transition-colors" onClick={handleCancel}><FaRegWindowClose size={24} /></span>
        </div>

      </div>

      <div>
        <ul className="flex flex-col gap-2 p-2 categories-center">
          {categories.map((category) => (
            <li key={category.id}>
              <CategoryCard
                category={category}
                categories={categories}
                setCategories={setCategories}
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Page;
