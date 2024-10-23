import clsx from "clsx";
import { Item } from "../lib/definitions";
import { roundToTwoDecimals } from "../lib/utils";

const Total = ({ items, type }: { items: Array<Item>; type: "l" | "c" }) => {
  
  const total = items.reduce((acc, item) => {
    return type === 'l' ? acc + item.qty * item.price : acc + item.qty * item.onSalePrice;
  }, 0);
  
  return (
    <div
      className={clsx("w-full text-xl text-center font-bold border-2 p-2 mb-2", {
        "bg-yellow-200 text-slate-950 border-slate-950": type === "l",
        "bg-blue-300 text-blue-950 border-blue-950": type === "c",
      })}
    >{`Total ${type === "l" ? "estimado" : "facturado"}: $ ${roundToTwoDecimals(total)}`}</div>
  );
};

export default Total;
