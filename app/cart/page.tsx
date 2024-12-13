"use client";
import clsx from "clsx";
import { TiShoppingCart } from "react-icons/ti";
import { useMyContext } from "../lib/myContext";
import CartCard from "../ui/cart-card";
import Total from "../ui/total";
import { useEffect, useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { TbRosetteDiscountCheck } from "react-icons/tb";

const Page = () => {
  const { items, setItems, settings } = useMyContext();

  const [showHelp, setShowHelp] = useState(settings.helpActive);

  useEffect(() => {
    setShowHelp(settings.helpActive);
  }, [settings]);

  return (
    <div className="pt-16 pb-4 min-w-full min-h-screen flex flex-col items-center bg-background">
      <div className="min-w-full fixed">
        <Total items={items} />
      </div>

      {items.filter((item) => item.location === "cart").length === 0 ? (
        <div className="flex h-full items-center justify-center">
          <TiShoppingCart size={150} />
        </div>
      ) : (
        <>
          {showHelp && (
            <div className="mt-16 bg-secondary flex">
              <span className="p-4 italic text-justify">
                Este es el contenido de tu carrito, se muestran los productos
                empezando por el más recientemente comprado. En cada producto
                puedes editar su nombre, cantidad o precio simplemente
                tocándolos. En la esquina superior derecha se muestra el monto
                total facturado para ese producto. El botón
                <RiDeleteBin6Line
                  size={16}
                  className="inline ml-2 align-baseline"
                />{" "}
                anula la compra de ese producto (lo devuelve a la lista). Con el
                botón{" "}
                <TbRosetteDiscountCheck
                  size={16}
                  className="inline ml-2 align-baseline"
                />{" "}
                se puede cargar un precio promocional para ese producto, válido
                únicamente para la compra actual (si se devuelve a la lista o se
                incorpora en el futuro desde el historial, se hará al precio
                normal).
              </span>
              <div className="flex justify-start mr-2">
                <button
                  className="h-2 w-2 p-2 opacity-50"
                  onClick={() => setShowHelp(false)}
                >
                  X
                </button>
              </div>
            </div>
          )}
          <ul
            className={clsx("flex flex-wrap-reverse gap-2 p-2 mt-14 items-center max-w-min", {
              "mt-2": showHelp,
            })}
          >
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
        </>
      )}
    </div>
  );
};

export default Page;
