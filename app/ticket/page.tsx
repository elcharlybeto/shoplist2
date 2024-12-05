"use client";

import { useEffect, useState } from "react";
import { FaSortAlphaDown, FaSortNumericDown } from "react-icons/fa";
import { Item } from "../lib/definitions";
import { useMyContext } from "../lib/myContext";
import TicketCard from "../ui/ticket-card";
import TotalTicket from "../ui/total-ticket";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { FiDelete } from "react-icons/fi";

const Page = () => {
  const { items, settings } = useMyContext();
  const [rows, setRows] = useState<Item[]>([]);
  const [sortedByAmount, setSortedByAmount] = useState(false);

  const [showHelp, setShowHelp] = useState(settings.helpActive);

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
          .sort((a, b) => a.qty * a.onSalePrice - b.qty * b.onSalePrice)
      );
    } else {
      setRows(
        items
          .filter((item) => item.location === "cart")
          .sort((a, b) => a.name.localeCompare(b.name))
      );
    }
  }, [sortedByAmount, items]);

  useEffect(() => {
    setShowHelp(settings.helpActive);
  }, [settings]);

  return (
    <div className="pt-4 min-w-full min-h-screen flex flex-col items-center bg-background">
      <button
        className="fixed right-3 bottom-4 p-2 bg-floating border border-primary rounded-xl "
        onClick={() => setSortedByAmount((prev) => !prev)}
      >
        {sortedByAmount ? (
          <FaSortAlphaDown size={32} />
        ) : (
          <FaSortNumericDown size={32} />
        )}
      </button>
      {showHelp && (
        <div className="mt-12 bg-secondary flex mb-1">
          <span className="p-4 italic text-justify">
            Este ticket virtual te puede servir para verificar renglón a renglón
            el ticket real de compras. Para verificar un renglón, simplemente
            tocar su botón
            <IoMdCheckmarkCircleOutline
              size={16}
              className="inline ml-2 align-baseline"
            />{" "}
            o su botón{" "}
            <FiDelete size={16} className="inline ml-2 align-baseline" /> para
            marcarlo como no verificado. Los renglones del ticket virtual pueden
            ordenarse con el botón flotante alfabéticamente cuando muestra el
            ícono{" "}
            <FaSortAlphaDown size={16} className="inline ml-2 align-baseline" />{" "}
            o por monto de mayor a menor cuando muestra el ícono{" "}
            <FaSortNumericDown
              size={16}
              className="inline ml-2 align-baseline"
            />{" "}
            .
          </span>
          <div className="flex justify-start mr-2">
            <button
              className="h-2 w-2 p-2 opacity-50"
              onClick={() => setShowHelp(false)}
            >
              X
            </button>
          </div>
        </div>
      )}
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
