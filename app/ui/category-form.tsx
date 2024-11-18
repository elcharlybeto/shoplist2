"use client";
import React, { useState } from "react";
import {
  FaRegCheckCircle,
  FaRegWindowClose
} from "react-icons/fa";
import { Action, Category, Mode } from "../lib/definitions";
import { formatString, isCategoryNameInArray } from "../lib/utils";
import { useMyContext } from "../lib/myContext";

const CategoryForm = ({
  category,
  onSave,
  setStatus,
}: {
  category: Category;
  onSave: (updatedCategory: Category) => void;
  setStatus: (status: Mode) => void;
}) => {
  const {categories} = useMyContext();
  const [name, setName] = useState(category.name);
  const [nameError, setNameError] = useState(false);
  


  const showErrorMsg = (msg: string) => {
    return (
      <div className="text-sm text-error-msg  font-semibold h-6">{msg}</div>
    );
  };

  const resetForm = () => {
    setName(category.name);
  };


  const handleSubmit = (e: React.FormEvent, action: Action) => {
    e.preventDefault();
   
      if (action === "save") {
        const newCategoryName = formatString(name);
        
          if (!isCategoryNameInArray(categories,newCategoryName)) {
            const updatedCategory: Category = {
                ...category,
                name:newCategoryName,
                };
             onSave(updatedCategory);
             setStatus("show");
              }
              else{
                setNameError(true);
              }
      } else {
        setNameError(false);
        setStatus("show");
        resetForm();
      }
    }
  

  return (
    <div className="flex w-full p-1 ">
      <div className="w-11/12 p-2">
        <form className="flex flex-col">
          <label htmlFor="name" className="text-sm">
            Categoría
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
            className="p-1 mr-2 mb-2 border border-border-input bg-input-bg"
            autoComplete="off"
            required
          />
          {nameError ? (
            formatString(name).length === 0 ?
            showErrorMsg("¡Se debe ingresar una descripción!"):showErrorMsg("¡Categoría existente!")
          ) : (
            <div className="min-h-6"></div>
          )}

       </form>
      </div>
      <div className="flex flex-col w-1/12 items-center justify-around ">
        <span
          className="text-icon-form hover:text-hover-icon-form cursor-pointer transition-colors"
          onClick={(e) => handleSubmit(e, "save")}
        >
          <FaRegCheckCircle size={24} />
        </span>
        <span
          className="text-icon-form hover:text-hover-icon-form cursor-pointer transition-colors"
          onClick={(e) => handleSubmit(e, "discard")}
        >
          <FaRegWindowClose size={24} />
        </span>
      </div>
    </div>
  );
};

export default CategoryForm;
