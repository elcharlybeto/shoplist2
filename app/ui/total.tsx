import Link from "next/link";
import { Item } from "../lib/definitions";
import { roundToNDecimals } from "../lib/utils";

const Total = ({ items }: { items: Array<Item> }) => {
  const estimated = items.reduce(
    (acc, item) =>
      item.location === "list" ? acc + item.qty * item.price : acc + 0,
    0
  );
  const spent = items.reduce(
    (acc, item) =>
      item.location === "cart" ? acc + item.qty * item.onSalePrice : acc + 0,
    0
  );

  return (
    <div className="w-full h-14 flex border-text border-2">
      <Link
        href="/list"
        className="bg-secondary w-1/2  flex justify-center items-center font-bold"
      >
        <div>
          <span>{`Pendiente: $ `}</span><span className="text-xl">{`${roundToNDecimals(estimated,0)}`}</span>
        </div>
      </Link>
      <Link
        href="/cart"
        className="bg-accent w-1/2  flex justify-center items-center font-bold"
      >
        <div>
        <span>{`Facturado: $ `}</span><span className="text-xl">{`${roundToNDecimals(spent,0)}`}</span>
        </div>
      </Link>
    </div>
  );
};

export default Total;
