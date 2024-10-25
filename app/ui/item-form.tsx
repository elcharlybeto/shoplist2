"use client";
import React, { useState } from "react";
import { Action, Item, Mode } from "../lib/definitions";
import {
  FaRegCheckCircle,
  FaRegWindowClose,
  FaShoppingCart,
} from "react-icons/fa";
import { today } from "../lib/utils";

const ItemForm = ({
  item,
  onSave,
  onBuy,
  setStatus,
}: {
  item: Item;
  onSave: (updatedItem: Item) => void;
  onBuy: (updatedItem: Item) => void;
  setStatus: (status: Mode) => void;
}) => {
  const [name, setName] = useState(item.name);
  const [nameError, setNameError] = useState(false);
  const [qty, setQty] = useState(item.qty.toString());
  const [qtyError, setQtyError] = useState(false);
  const [price, setPrice] = useState(item.price.toString());
  const [priceError, setPriceError] = useState(false);

  const showErrorMsg = (msg: string) => {
    return <div className="text-sm text-red-700 font-semibold h-4">{msg}</div>;
  };

  const handleQtyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const regex = /^\d*\.?\d*$/; 

    if (regex.test(value)) {
      setQty(value);
      setQtyError(false);
    }else{
      setQtyError(true);
    }
  };
 
  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const regex = /^[0-9]*\.?[0-9]*$/;

    if (value === "" || regex.test(value)) {
      setPrice(value);
      setPriceError(false);
    }else{
      setPriceError(true);
    }
  };

  const handleSubmit = (e: React.FormEvent, action: Action) => {
    e.preventDefault();

    if (name.length === 0) {
      setNameError(true);
    } else if (Number(qty) <= 0) {
      setQtyError(true);
    } else if (Number(price) < 0) {
      setPriceError(true);
    } else {
      if (action === "save") {
        const updatedItem: Item = {
          ...item,
          name,
          qty: Number(qty),
          price: Number(price),
          onSalePrice : Number(price),
          boughtDate: today()
        };
        setStatus("show");
        onSave(updatedItem);
      } else if (action === "buy") {
        const updatedItem: Item = {
          ...item,
          name,
          qty: Number(qty),
          price: Number(price),
          onSalePrice : Number(price),
          location: "cart",
          boughtDate: today()
        };
        setStatus("show");
        onBuy(updatedItem);
      } else setStatus("show");
    }
  };

  return (
    <div className="flex w-full p-1 ">
      <div className="w-11/12 p-2">
        <form className="flex flex-col">
          <label htmlFor="name" className="text-sm">
            Producto
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => {
              if (e.target.value.length > 0) {
                setNameError(false);
              } else setNameError(true);
              setName(e.target.value);
            }}
            className="p-1 mr-2 mb-2  border border-gray-700"
            autoComplete="off"
            required
          />
          {nameError ? (
            showErrorMsg("Se debe ingresar un producto")
          ) : (
            <div className="min-h-4"></div>
          )}

          <label htmlFor="qty" className="text-sm">
            Cantidad
          </label>
          <input
            type="text"
            id="qty"
            value={qty}
            onChange={handleQtyChange}
            className="p-1 mr-2 mb-2  border border-gray-700"
            autoComplete="off"
            required
          />
          {qtyError ? (
            showErrorMsg("Cantidad no válida")
          ) : (
            <div className="min-h-4"></div>
          )}

          <label htmlFor="price" className="text-sm">
            Precio x un/kg
          </label>
          <input
            type="text"
            id="price"
            value={price}
            onChange={handlePriceChange}
            className="p-1 mr-2 mb-2  border border-gray-700"
            autoComplete="off"
            required
          />
          {priceError ? (
            showErrorMsg("Precio no válido")
          ) : (
            <div className="min-h-4"></div>
          )}
        </form>
      </div>
      <div className="flex flex-col w-1/12 items-center justify-around ">
        <span
          className="hover:text-gray-400 text-red-900"
          onClick={(e) => handleSubmit(e, "save")}
        >
          <FaRegCheckCircle size={24} />
        </span>
        <span
          className="hover:text-gray-400 text-red-900"
          onClick={() => setStatus("show")}
        >
          <FaRegWindowClose size={24} />
        </span>
        <span
          className="hover:text-gray-400 text-red-900"
          onClick={(e) => Number(price) > 0 ? handleSubmit(e, "buy") : setPriceError(true)}
        >
          <FaShoppingCart size={24} />
        </span>
      </div>
    </div>
  );
};

export default ItemForm;