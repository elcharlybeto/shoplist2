'use client'
import { useEffect, useState } from "react";
import Total from "../ui/total";
import { Item } from "../lib/definitions";
import CartCard from "../ui/cart-card";

const Page = () => {

  const [cartItems,setCartItems] = useState<Item[]>([]);

  useEffect(() => {
    const items: Item[] = JSON.parse(localStorage.getItem("items") || "[]");
    setCartItems(items.filter((item) => item.location === "cart"));
  }, []);

  return (
    <div className="pt-16 pb-4 min-w-full min-h-screen flex flex-col items-center bg-cyan-100">
      <Total items={cartItems} type="c" />
      <ul className="flex flex-col gap-2 p-2 items-center">
        {cartItems.map((item) => (
          <li key={item.id}>
            <CartCard item={item} setCartItems={setCartItems} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Page;
