"use client";
import clsx from "clsx";
import { MultiBackend, TouchTransition } from "dnd-multi-backend";
import Link from "next/link";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { TouchBackend } from "react-dnd-touch-backend";
import { FaRegEye, FaRegStar, FaShoppingCart, FaStar } from "react-icons/fa";
import { FaFilter, FaFilterCircleXmark, FaPencil } from "react-icons/fa6";
import { MdFilterAltOff } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { TbRosetteDiscountCheck } from "react-icons/tb";
import { Item } from "../lib/definitions";
import { useMyContext } from "../lib/myContext";
import {
  isCategoryActive,
  roundToNDecimals,
  sortItemsByCategoryOrder,
} from "../lib/utils";
import Listcard from "../ui/list-card";
import Total from "../ui/total";

const multiBackendOptions = {
  backends: [
    {
      backend: HTML5Backend,
    },
    {
      backend: TouchBackend,
      options: { enableMouseEvents: true },
      preview: true,
      transition: TouchTransition,
    },
  ],
};

type DraggableListcardProps = {
  item: Item;
  index: number;
  items: Item[];
  setItems: Dispatch<SetStateAction<Item[]>>;
};

const DraggableListcard = ({
  item,
  index,
  items,
  setItems,
}: DraggableListcardProps) => {
  const [{ isDragging }, dragRef] = useDrag({
    type: "LISTCARD",
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, dropRef] = useDrop({
    accept: "LISTCARD",
    hover: (draggedItem: { index: number }) => {
      if (draggedItem.index !== index) {
        const reorderedItems = [...items];
        const [removed] = reorderedItems.splice(draggedItem.index, 1);
        reorderedItems.splice(index, 0, removed);
        setItems(reorderedItems);
        localStorage.setItem("items", JSON.stringify(reorderedItems));
        draggedItem.index = index;
      }
    },
  });

  return (
    <li
      ref={(node) => {
        dragRef(node);
        dropRef(node);
      }}
      style={{
        opacity: isDragging ? 0.5 : 1,
        cursor: "move",
      }}
    >
      <Listcard item={item} items={items} setItems={setItems} />
    </li>
  );
};

const Page = () => {
  const { items, setItems, categories, settings } = useMyContext();
  const [showHelp, setShowHelp] = useState(settings.helpActive);
  const [showMarked, setShowMarked] = useState(false);
  const [partial, setPartial] = useState(
    items
      .filter((item) => item.price < 0)
      .reduce((total, item) => total + item.qty * item.onSalePrice, 0)
  );
  const [qList, setQList] = useState(
    items.filter((item) => item.location === "list").length
  );

  const toggleShowMarked = () => {
    setShowMarked(!showMarked);
  };

  useEffect(() => {
    if (settings.sorting) {
      setItems((prevItems) => {
        const newItems = sortItemsByCategoryOrder(prevItems, categories);
        localStorage.setItem("items", JSON.stringify(newItems));
        return newItems;
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [settings, categories, qList]);

  useEffect(() => {
    setShowHelp(settings.helpActive);
  }, [settings]);

  useEffect(() => {
    setPartial(
      items
        .filter((item) => item.price < 0 && item.location === "list")
        .reduce((total, item) => total + item.qty * item.onSalePrice, 0)
    );
    if (
      items.filter((item) => item.price < 0 && item.location === "list")
        .length === 0
    )
      setShowMarked(false);
    setQList(items.filter((item) => item.location === "list").length);
  }, [items]);

  return (
    <DndProvider backend={MultiBackend} options={multiBackendOptions}>
      <div
        className={clsx(
          "pt-16 pb-4 pl-2 min-w-full min-h-screen flex flex-col items-start bg-background",
          {
            "items-center":
              items.filter((item) => item.location === "list").length === 0,
          }
        )}
      >
        <Link href={"/filters"}>
          <button className="fixed right-2 bottom-4 p-2 bg-floating text-text-floating border border-primary rounded-xl disabled:hidden ">
            <FaFilterCircleXmark size={32} />
          </button>
        </Link>

        <button
          className="fixed right-2 bottom-36 p-2 bg-floating text-text-floating border border-primary rounded-xl disabled:hidden "
          onClick={toggleShowMarked}
          disabled={
            items.filter((item) => item.price < 0 && item.location === "list")
              .length === 0
          }
        >
          {showMarked ? <FaRegStar size={32} /> : <FaStar size={32} />}
        </button>

        <Link href={"/compact"}>
          <button className="fixed right-2 bottom-20 p-2 bg-floating text-text-floating border border-primary rounded-xl disabled:hidden ">
            <FaRegEye size={32} />
          </button>
        </Link>

        <div className="min-w-full fixed left-0">
          <Total items={items} />
        </div>
        {items.filter((item) => item.location === "list").length === 0 ? (
          <div className="flex h-full items-center justify-center">
            <div className="flex items-center">
              {" "}
              <FaPencil size={150} />
            </div>
          </div>
        ) : (
          <>
            {showHelp && (
              <div className="mt-16 bg-secondary flex">
                <span className="p-4 italic text-justify">
                  Esta vista de la lista activa las acciones para cada producto.
                  Para volver a la lista compacta, presiona el botón flotante{" "}
                  <FaRegEye size={16} className="inline ml-2 align-baseline" />
                  {"."}
                  Por cada producto ves una tarjeta donde puedes editar su
                  nombre, cantidad, precio o categoría simplemente tocándolos.
                  Si presionas el botón{" "}
                  <FaFilter
                    size={16}
                    className="inline ml-2 align-baseline"
                  />{" "}
                  a la derecha de la categoría, sólo se mostrarán los productos
                  de esa categoría. Para volver a mostrar todos los productos,
                  desactiva el filtro tocando el mismo botón cuando muestra el
                  ícono
                  <MdFilterAltOff
                    size={16}
                    className="inline ml-2 align-baseline"
                  />{" "}
                  Se puede eliminar un producto de la lista (vuelve al
                  historial) tocando el botón{" "}
                  <RiDeleteBin6Line
                    size={16}
                    className="inline ml-2 align-baseline"
                  />{" "}
                  . Con el botón{" "}
                  <TbRosetteDiscountCheck
                    size={16}
                    className="inline ml-2 align-baseline"
                  />{" "}
                  se puede cargar un precio promocional para ese producto,
                  válido únicamente para la compra actual (si se devuelve al
                  historial o se incorpora en el futuro desde el historial, se
                  hará al precio normal). Finalmente, con el botón{" "}
                  <FaShoppingCart
                    size={16}
                    className="inline ml-2 align-baseline"
                  />{" "}
                  se registra la compra del producto (pasa al carrito).
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
            {showHelp && (
              <div className="mt-2 bg-secondary flex">
                <span className="p-4 italic text-justify">
                  Si queremos mostrar (activar) u ocultar (desactivar) más de
                  una categoría a la vez, podemos hacerlo tocando el botón
                  flotante
                  <FaFilterCircleXmark
                    size={16}
                    className="inline ml-2 align-baseline"
                  />
                  {"."}
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

            {showHelp && (
              <div className="mt-2 bg-secondary flex">
                <span className="p-4 italic text-justify">
                  Se pueden separar los productos en dos listas: una lista de
                  productos marcados y otra de no marcados. Para marcar o
                  desmarcar un producto debes tocar su botón estrella, cuando
                  está lleno significa que está marcado y será visible
                  únicamente pulsando el botón flotante
                  <FaStar size={16} className="inline ml-2 align-baseline" />
                  {", "}mientras que tocando el botón vacío{" "}
                  <FaRegStar size={16} className="inline ml-2 align-baseline" />
                  {", "} mostrará únicamente los productos no marcados. Cuando
                  se visualiza la sublista de marcados, se puede observar un
                  total parcial correspondiente a esos productos.
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

            {!showMarked ? (
              <ul
                className={clsx("flex flex-wrap gap-2 p-2 mt-14 items-center", {
                  "mt-2": showHelp,
                })}
              >
                {items
                  .filter((item) => item.price >= 0)
                  .map((item, index) =>
                    item.location === "list" &&
                    isCategoryActive(item.categoryId, categories) ? (
                      <DraggableListcard
                        key={item.id}
                        item={item}
                        index={index}
                        items={items}
                        setItems={setItems}
                      />
                    ) : null
                  )}
              </ul>
            ) : (
              <>
                <div
                  className={clsx(
                    "mt-16 bg-secondary w-1/2 flex flex-col justify-center items-center font-semibold border-text border-2 rounded-md shadow-md py-1 hover:scale-110 transition-transform self-center",
                    { "mt-4": showHelp }
                  )}
                >
                  <span className="capitalize">pendiente parcial</span>
                  <span>{`$ ${roundToNDecimals(partial, 0)}`}</span>
                </div>
                <ul
                  className={clsx("flex flex-wrap gap-2 p-2 mt-1 items-center", {
                    "mt-2": showHelp,
                  })}
                >
                  {items
                    .filter((item) => item.price < 0)
                    .map((item, index) =>
                      item.location === "list" &&
                      isCategoryActive(item.categoryId, categories) ? (
                        <DraggableListcard
                          key={item.id}
                          item={item}
                          index={index}
                          items={items}
                          setItems={setItems}
                        />
                      ) : null
                    )}
                </ul>
              </>
            )}
          </>
        )}
      </div>
    </DndProvider>
  );
};

export default Page;
