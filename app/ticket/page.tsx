"use client";

import { useMyContext } from "../lib/myContext";
import TicketCard from "../ui/ticket-card";
import TotalTicket from "../ui/total-ticket";

const Page = () => {
  const { items } = useMyContext();
  const rows = items
    .filter((item) => item.location === "cart")
    .sort((a, b) => a.name.localeCompare(b.name));

  return (
    <div className="pt-4 min-w-full min-h-screen flex flex-col items-center bg-background">
      <ul className="flex flex-col gap-1 mt-14 items-center">
        {rows.map((row) => (
          <TicketCard key={row.id} row={row} />
        ))}
      </ul>
      <TotalTicket/>
    </div>
  );
};

export default Page;
