"use client";

import { useEffect, useState } from "react";
import { FaSortAlphaDown, FaSortNumericDown } from "react-icons/fa";
import { Item } from "../lib/definitions";
import { useMyContext } from "../lib/myContext";
import TicketCard from "../ui/ticket-card";
import TotalTicket from "../ui/total-ticket";

const Page = () => {
  const { items } = useMyContext();
  const [rows, setRows] = useState<Item[]>([]);
  const [sortedByAmount, setSortedByAmount] = useState(false);

  useEffect(() => {
    setRows(
      items
        .filter((item) => item.location === "cart")
        .sort((a, b) => a.name.localeCompare(b.name))
    );
  }, [items]);

  useEffect(() => {
    if (sortedByAmount) {
      setRows(
        items
          .filter((item) => item.location === "cart")
          .sort((a, b) => a.onSalePrice - b.onSalePrice)
      );
    } else {
      setRows(
        items
          .filter((item) => item.location === "cart")
          .sort((a, b) => a.name.localeCompare(b.name))
      );
    }
  }, [sortedByAmount, items]);

  return (
    <div className="pt-4 min-w-full min-h-screen flex flex-col items-center bg-background">
       <button
        className="fixed right-3 bottom-4 p-2 bg-secondary border border-primary rounded-xl "
        onClick={() => setSortedByAmount((prev)=>!prev)}
      >
      {sortedByAmount ?  <FaSortNumericDown  size={24}/> : <FaSortAlphaDown size={24} />}
      </button>
      <ul className="flex flex-col gap-1 mt-14 items-center">
        {rows.map((row) => {
          if (row.onSalePrice > 0)
            return (
              <TicketCard
                key={row.id}
                row={row}
                rows={rows}
                setRows={setRows}
              />
            );
        })}
      </ul>
      <TotalTicket rows={rows} checked={false} />
      <ul className="flex flex-col gap-1 mt-14 items-center">
        {rows.map((row) => {
          if (row.onSalePrice < 0)
            return (
              <TicketCard
                key={row.id}
                row={row}
                rows={rows}
                setRows={setRows}
              />
            );
        })}
      </ul>
      <TotalTicket rows={rows} checked={true} />
    </div>
  );
};

export default Page;
