import { Item } from "../lib/definitions";
import { roundToNDecimals } from "../lib/utils";

const TotalTicket = ({rows , checked}: {rows: Item[], checked: boolean}) => {
  const spent = rows.reduce((total, row) => {
    if (checked && row.onSalePrice < 0) return total - row.onSalePrice * row.qty;
    if (!checked && row.onSalePrice > 0) return total - row.onSalePrice * row.qty;
    return total;
  }, 0);
  

  return (
    <div className="w-11/12 p-2 mt-4 h-10 flex items-center shadow-md shadow-shadow-list justify-between text-lg font-bold bg-accent">
      <span>{ checked ? 'Total Verificado' : `Total a Verificar`}</span>
      <span>{`$ ${roundToNDecimals(spent>0?spent:-spent, 0)}`}</span>
    </div>
  );
};

export default TotalTicket;
