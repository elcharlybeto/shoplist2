'use client'
import { useMyContext } from "../lib/myContext";
import { rancho } from "./fonts";

const CompactView = () => {
  const { items } = useMyContext();
  const filteredItems = items.filter((item) => item.location === "list");

  return (
    <div className={`${rancho.className} w-8/12 ml-10 flex flex-col gap-2 items-center text-4xl  dark:text-primary antialiased`}>
  
        {filteredItems.filter(item => item.price <0).map((item) => (
          <div  key={item.id}>
            <span className="p-2 text-center font-semibold capitalize ">
              {`${item.name} (${item.qty})`}
            </span>
          </div>
        ))}
        {filteredItems.filter(item => item.price <0).length > 0 &&
          <div className="h-1 opacity-50 bg-primary w-full"></div>}
        {filteredItems.filter(item => item.price  >= 0).map((item) => (
          <div key={item.id}>
          <span className=" p-2 text-center font-semibold capitalize">
            {`${item.name} (${item.qty})`}
          </span>
        </div>
        ))}
      
    </div>
  );
};

export default CompactView;