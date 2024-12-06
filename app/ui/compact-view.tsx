'use client'
import { useMyContext } from "../lib/myContext";

const CompactView = () => {
  const { items } = useMyContext();
  const filteredItems = items.filter((item) => item.location === "list");

  return (
    <table className="table-auto border-collapse border border-icon-list w-full">
      <thead >
        <tr className="bg-secondary">
          <th className="border border-icon-list p-1 text-center ">Cant</th>
          <th className="border border-icon-list p-1 text-center">Producto</th>
        </tr>
      </thead>
      <tbody>
        {filteredItems.filter(item => item.price <0).map((item) => (
          <tr key={item.id}>
            <td className="border border-icon-list p-1 text-center bg-accent">{item.qty}</td>
            <td className="border border-icon-list p-1 text-center bg-accent ">
              {item.name}
            </td>
          </tr>
        ))}
        {filteredItems.filter(item => item.price  >= 0).map((item) => (
          <tr key={item.id}>
            <td className="border border-icon-list p-1 text-center bg-tertiary">{item.qty}</td>
            <td className="border border-icon-list p-1 text-center bg-tertiary">
              {item.name}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default CompactView;