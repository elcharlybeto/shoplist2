import { Item } from "../lib/definitions";
import { roundToTwoDecimals } from "../lib/utils";

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
    <div className="w-full h-10 flex border-text  border-2">
      <div className="bg-secondary w-1/2 text-xl flex justify-center items-center font-bold"><span>{`Pendiente: $ ${roundToTwoDecimals(
        estimated
      )}`}</span></div>
      <div className="bg-accent w-1/2 text-xl flex justify-center items-center font-bold"><span>{`Facturado: $ ${roundToTwoDecimals(
        spent
      )}`}</span></div>
    </div>
  );
};

export default Total;
