'use client'
import { useEffect, useState } from "react";
import Total from "../ui/total";
import { Item } from "../lib/definitions";
import CartCard from "../ui/cart-card";
import { useMyContext } from "../lib/myContext";

const Page = () => {
  const {items, setItems } = useMyContext();
  const [cartItems,setCartItems] = useState<Item[]>([]);


  useEffect(() => {
    setCartItems(items.filter((item) => item.location === "cart"));
  }, [items]);

  return (
    <div className="pt-16 pb-4 min-w-full min-h-screen flex flex-col items-center">
      <div className="min-w-full fixed"><Total items={items} /></div>
      <ul className="flex flex-col gap-2 p-2 mt-14 items-center">
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
