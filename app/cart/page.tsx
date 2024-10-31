'use client'
import { useEffect, useState } from "react";
import Total from "../ui/total";
import { Item } from "../lib/definitions";
import CartCard from "../ui/cart-card";

const Page = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [cartItems,setCartItems] = useState<Item[]>([]);

  useEffect(() => {
    setItems(JSON.parse(localStorage.getItem("items") || "[]"));
  }, []);

  useEffect(() => {
    setCartItems(items.filter((item) => item.location === "cart"));
  }, [items]);

  return (
    <div className="pt-16 pb-4 min-w-full min-h-screen flex flex-col items-center">
      <Total items={items} />
      <ul className="flex flex-col gap-2 p-2 items-center">
        {cartItems.map((item) => (
          <li key={item.id}>
            <CartCard item={item} items={items} setItems={setItems} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Page;
