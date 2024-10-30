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
    return <div className="text-sm text-red-700 dark:text-red-200 font-semibold h-4">{msg}</div>;
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
      <div className=" bg-secondary py-1 font-bold border border-border-list text-center">
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
              className="p-1 mr-2 border border-border-input bg-input-bg"
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
            className="text-icon-form hover:text-hover-icon-form cursor-pointer transition-colors"
            onClick={(e) => handleSubmit(e, "hide")}
          >
            <FaRegWindowClose size={24} />
          </span>
          <span
            className="text-icon-form hover:text-hover-icon-form cursor-pointer transition-colors"
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
