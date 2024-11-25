"use client";
import { Dispatch, SetStateAction } from "react";
import { Item } from "../lib/definitions";
import { roundToNDecimals } from "../lib/utils";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { FiDelete } from "react-icons/fi";

const TicketCard = ({ row, rows, setRows }: { row: Item, rows: Item[], setRows: Dispatch<SetStateAction<Item[]>> }) => {
  const total = roundToNDecimals(row.qty * row.onSalePrice, 2);

 const toggleCheck = () =>{
  const newRow = { ...row, onSalePrice : -row.onSalePrice };
  const newRows = rows.filter(rowR => rowR.id !== row.id) 
  setRows([...newRows, newRow])
 }

  return (
    <>
      <div className="flex flex-wrap justify-between w-full min-w-full">
        <div className="flex gap-1">
          <span className="px-1 w-8">{roundToNDecimals(row.qty, 2)}</span>
          <span className="px-1 w-56 capitalize">{row.name}</span>
          {row.onSale ? (
            <span className="text-xs px-1 flex items-center w-14 rounded-lg text-white bg-icon-form">
              PROMO
            </span>
          ) : <span className="w-14"></span> }
        </div>
        <div className="px-1 ml-1 flex items-center font-bold">
          <span className="">{ total > 0 ? `$ ${total}`: `$ ${-total}`}</span>
        </div>
        <button onClick={toggleCheck}>{row.onSalePrice > 0 ? <IoMdCheckmarkCircleOutline size={24} /> : <FiDelete size={24} />}</button>
      </div>
    </>
  );
};

export default TicketCard;
