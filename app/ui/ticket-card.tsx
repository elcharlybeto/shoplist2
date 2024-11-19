"use client";
import { Item } from "../lib/definitions";
import { roundToNDecimals } from "../lib/utils";

const TicketCard = ({ row }: { row: Item }) => {
  const total = roundToNDecimals(row.qty * row.onSalePrice, 2);

  return (
    <>
      <div className="flex flex-wrap justify-between w-full min-w-full">
        <div className="flex gap-1">
          <span className="px-1 w-8">{roundToNDecimals(row.qty, 2)}</span>
          <span className="px-1 w-56 capitalize">{row.name}</span>
          {row.onSalePrice < row.price && (
            <span className="text-xs px-1 flex items-center rounded-lg text-white bg-icon-form">
              PROMO
            </span>
          )}
        </div>
        <div className="px-1 ml-1 flex items-center font-bold">
          <span className="">{`$ ${total}`}</span>
        </div>
      </div>
    </>
  );
};

export default TicketCard;
