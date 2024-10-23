"use client";
import React, { useState } from "react";
import { Action, Item, Mode } from "../lib/definitions";
import { FaRegWindowClose, FaShoppingCart } from "react-icons/fa";

const OnSaleForm = ({
  item,
  onSave,
  setStatus,
}: {
  item: Item;
  onSave: (updatedItem: Item) => void;
  setStatus: (status: Mode) => void;
}) => {
  const [onSalePrice, setOnSalePrice] = useState("");
  const [onSalePriceError, setOnSalePriceError] = useState(false);

  const showErrorMsg = (msg: string) => {
    return <div className="text-sm text-red-700 font-semibold h-4">{msg}</div>;
  };

  const handleOnSalePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const regex = /^[0-9]*\.?[0-9]*$/;
    if (regex.test(value)) {
      if (Number(value) > 0 && Number(value) < item.price) {
        setOnSalePriceError(false);
      } else setOnSalePriceError(true);
      setOnSalePrice(value);
    }
  };

  const handleSubmit = (e: React.FormEvent, action: Action) => {
    e.preventDefault();

    if (action === "buy") {
      const updatedItem: Item = {
        ...item,
        onSale: true,
        onSalePrice: Number(onSalePrice),
        location: "cart",
      };
      setStatus("show");
      onSave(updatedItem);
    } else setStatus("show");
  };

  return (
    <div className="flex flex-col w-full p-1 ">
      <div className=" bg-green-600 py-1 text-white font-bold text-center">
        {item.name}
      </div>

      <div className="flex ">
        <div className="w-4/5 p-2">
          <form className="flex flex-col">
            <label htmlFor="onSalePrice" className="text-sm">
              Precio PROMO x un/kg
            </label>
            <input
              type="string"
              id="onSalePrice"
              value={onSalePrice}
              onChange={handleOnSalePriceChange}
              className="p-1 mr-2   border border-gray-700"
              autoFocus={true}
              autoComplete="off"
              required
            />
            {onSalePriceError ? (
              showErrorMsg("Precio de Oferta no válido")
            ) : (
              <div className="min-h-4"></div>
            )}
          </form>
        </div>
        <div className="flex gap-2 w-1/5 items-center justify-around ">
          <span
            className="hover:text-gray-400 text-red-900"
            onClick={(e) => handleSubmit(e, "hide")}
          >
            <FaRegWindowClose size={24} />
          </span>
          <span
            className="hover:text-gray-400 text-red-900"
            onClick={(e) =>
              Number(onSalePrice) > 0 && Number(onSalePrice) < item.price
                ? handleSubmit(e, "buy")
                : setOnSalePriceError(true)
            }
          >
            <FaShoppingCart size={24} />
          </span>
        </div>
      </div>
    </div>
  );
};

export default OnSaleForm;
