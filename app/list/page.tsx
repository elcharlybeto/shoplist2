'use client'
import { useState } from "react";
import Listcard from "../ui/list-card";
import Total from "../ui/total";
import { Item } from "../lib/definitions";

const Page = () => {
  const items: Item[] = JSON.parse(localStorage.getItem('items') || '[]');
  const [listItems,setListItems] = useState( items.filter((item) => item.location === "list"));

  return (
    <div className="pt-16 pb-4 min-w-full min-h-screen flex flex-col items-center bg-slate-100">
      <Total items={listItems} type="l" />
      <ul className="flex flex-col gap-2 p-2  items-center">
        {listItems.map((item) => (
          <li key={item.id}>
            <Listcard item={item} setListItems={setListItems} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Page;
