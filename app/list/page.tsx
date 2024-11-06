"use client";
import { useEffect, useState } from "react";
import Listcard from "../ui/list-card";
import Total from "../ui/total";
import { Item } from "../lib/definitions";
import { useMyContext } from "../lib/myContext";

const Page = () => {
  const {items, setItems } = useMyContext();
  const [listItems, setListItems] = useState<Item[]>([]);

  useEffect(() => {
    setListItems(items.filter((item) => item.location === "list"));
  }, [items]);

  return (
    <div className="pt-16 pb-4 min-w-full min-h-screen flex flex-col items-center bg-background">
      <div className="min-w-full fixed"><Total items={items} /></div>
      <ul className="flex flex-col gap-2 p-2 mt-14 items-center">
        {listItems.map((item) => (
          <li key={item.id}>
            <Listcard item={item} items={items} setItems={setItems} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Page;
