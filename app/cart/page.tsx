"use client";

import { TiShoppingCart } from "react-icons/ti";
import { useMyContext } from "../lib/myContext";
import CartCard from "../ui/cart-card";
import Total from "../ui/total";

const Page = () => {
  const { items, setItems } = useMyContext();

    return (
      <div className="pt-16 pb-4 min-w-full min-h-screen flex flex-col items-center bg-background">
        <div className="min-w-full fixed">
          <Total items={items} />
        </div>
        { items.filter(item => item.location === 'cart').length === 0 ? 
        <div className="flex h-full items-center justify-center">
        <TiShoppingCart size={150} />
      </div> :
        <ul className="flex flex-col gap-2 p-2 mt-14 items-center">
            {items.map((item) =>
              item.location === "cart" ? (
                <CartCard
                  key={item.id}
                  item={item}
                  items={items}
                  setItems={setItems}
                />
              ) : null
            )}
          </ul>
      }
      </div>
  );
};

export default Page;