import { useMyContext } from "../lib/myContext";
import { roundToNDecimals } from "../lib/utils";

const TotalTicket = () => {
  const { items } = useMyContext();
  const spent = items.reduce(
    (acc, item) =>
      item.location === "cart" ? acc + item.qty * item.onSalePrice : acc + 0,
    0
  );

  return (
    <div className="w-11/12 p-2 mt-4 h-10 flex items-center shadow-md shadow-shadow-list justify-between text-lg font-bold bg-accent">
      <span>{`Total`}</span>
      <span>{`$ ${roundToNDecimals(spent, 0)}`}</span>
    </div>
  );
};

export default TotalTicket;
