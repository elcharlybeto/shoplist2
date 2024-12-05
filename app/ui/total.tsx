import Link from "next/link";
import { Item } from "../lib/definitions";
import { roundToNDecimals } from "../lib/utils";
import { useMyContext } from "../lib/myContext";

const Total = ({ items }: { items: Array<Item> }) => {

const { marked} = useMyContext(); 

  const estimated = items.reduce(
    (acc, item) =>
      item.location === "list" ? acc + item.qty * item.price : acc + 0,
    0
  )+marked.reduce((total, item) => total + item.qty * item.onSalePrice, 0);
  
  const spent = items.reduce(
    (acc, item) =>
      item.location === "cart" ? acc + item.qty * item.onSalePrice : acc + 0,
    0
  );

  return (
    <div className="w-full h-14 flex px-2 gap-2">
      {spent > 0 ? (
        <>
          <Link
            href="/list"
            className="bg-tertiary w-1/2 flex flex-col justify-center items-center font-semibold border-text border-2 rounded-md shadow-md py-1 hover:scale-110 transition-transform"
          >
              <span className="uppercase text-sm">pendiente</span>
              <span className="text-xl">{`$ ${roundToNDecimals(
                estimated,
                0
              )}`}</span>
          </Link>
          <Link
            href="/cart"
            className="bg-accent w-1/2 flex flex-col justify-center items-center font-semibold border-text border-2 rounded-md shadow-md py-1 hover:scale-110 transition-transform  "
          >
              <span className="uppercase text-sm">Facturado</span>
              <span className="text-xl">{`$ ${roundToNDecimals(spent, 0)}`}</span>
          </Link>
        </>
      ) : (
        <Link
          href="/list"
          className="bg-secondary w-full  flex justify-center items-center font-semibold border-text border-2 rounded-md shadow-md"
        >
          <div>
            <span>{`Gasto Total Estimado: $ `}</span>
            <span className="text-xl">{`${roundToNDecimals(
              estimated,
              0
            )}`}</span>
          </div>
        </Link>
      )}
    </div>
  );
};

export default Total;
