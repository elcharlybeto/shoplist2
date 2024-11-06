"use client";
import React, { useEffect, useState } from "react";
import { Action, Field, Item, Mode } from "../lib/definitions";
import { FaRegWindowClose, FaCheckCircle } from "react-icons/fa";
import { today } from "../lib/utils";

const EditForm = ({
  item,
  field,
  onSave,
  setStatus,
}: {
  item: Item;
  field: Field;
  onSave: (updatedItem: Item) => void;
  setStatus: (status: Mode) => void;
}) => {
  const [editValue, setEditValue] = useState(
    field === "name" ? item.name : field === "price" ? item.price : item.qty
  );
  const [editValueError, setEditValueError] = useState(false);

  const showErrorMsg = (msg: string) => {
    return (
      <div className="text-sm text-error-msg font-semibold h-4">
        {msg}
      </div>
    );
  };

  const handleEditValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (field === "price" || field === "qty") {
      const regex = /^[0-9]*\.?[0-9]*$/;
      if (regex.test(value) || value === "") {
        if (Number(value) > 0) {
          setEditValueError(false);
          
        } else setEditValueError(true);
        setEditValue(value);
      }
    } else {
      setEditValueError(false);
      setEditValue(value);
    }
  };

  const handleSubmit = (e: React.FormEvent, action: Action) => {
    e.preventDefault();

    if (action === "save") {
      if(editValue !== "" || Number(editValue)>0){
          const updatedItem: Item = item;
          if (field === "name") updatedItem.name = String(editValue);
          else if (field === "price") {
            if(item.price !== Number(editValue)) 
            {
            updatedItem.price = Number(editValue);
            updatedItem.boughtDate = today();
            }
          } else updatedItem.qty = Number(editValue);

          onSave(updatedItem);
          setStatus("show");
        }
    } else setStatus("show");
  };

  useEffect(() => {
    setEditValue(
      field === "name" ? item.name : field === "price" ? item.price : item.qty
    );
  }, [field, item.name, item.price, item.qty]);

  return (
    <div className="flex flex-col w-full p-1 ">
      <div className=" bg-secondary py-1 font-bold border border-border-list text-center">
        {`${item.name}`}
      </div>

      <div className="flex ">
        <div className="w-4/5 p-2">
          <form className="flex flex-col">
            <label htmlFor="editValue" className="text-sm">
              {field === "name"
                ? "Producto"
                : field === "price"
                ? "Precio"
                : "Cantidad"}
            </label>
            <input
              type="string"
              id="editValue"
              value={editValue}
              onChange={handleEditValueChange}
              className="p-1 mr-2 border border-border-input bg-input-bg"
              autoFocus={true}
              autoComplete="off"
              required
            />
            {editValueError ? (
              showErrorMsg("Valor no válido")
            ) : (
              <div className="min-h-4"></div>
            )}
          </form>
        </div>
        <div className="flex gap-2 w-1/5 items-center justify-around ">
          <span
            className="text-icon-form hover:text-hover-icon-form cursor-pointer transition-colors"
            onClick={(e) => handleSubmit(e, "hide")}
          >
            <FaRegWindowClose size={24} />
          </span>
          <span
            className="text-icon-form hover:text-hover-icon-form cursor-pointer transition-colors"
            onClick={(e) => handleSubmit(e, "save")}
          >
            <FaCheckCircle size={24} />
          </span>
        </div>
      </div>
    </div>
  );
};

export default EditForm;
