"use client";
import clsx from "clsx";
import { MultiBackend, TouchTransition } from "dnd-multi-backend";
import Link from "next/link";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { TouchBackend } from "react-dnd-touch-backend";
import { BsEmojiSmile } from "react-icons/bs";
import { FaList, FaShoppingCart, FaStar } from "react-icons/fa";
import {
  FaFilter,
  FaFilterCircleXmark,
  FaPencil,
  FaTableList,
} from "react-icons/fa6";
import { MdFilterAltOff } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { TbRosetteDiscountCheck } from "react-icons/tb";
import { Category, Item } from "../lib/definitions";
import { useMyContext } from "../lib/myContext";
import { isCategoryActive, roundToNDecimals } from "../lib/utils";
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

  const sortItemsByCategoryOrder = (
    items: Item[],
    categories: Category[]
  ): Item[] => {
    const categoryOrder = new Map(
      categories.map((category, index) => [category.id, index])
    );

    return [...items].sort((a, b) => {
      const orderA = categoryOrder.get(a.categoryId) ?? Infinity;
      const orderB = categoryOrder.get(b.categoryId) ?? Infinity;
      return orderA - orderB;
    });
  };

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
          {showMarked ? <FaList size={32} /> : <FaStar size={32} />}
        </button>

        <Link href={"/compact"}>
          <button className="fixed right-2 bottom-20 p-2 bg-floating text-text-floating border border-primary rounded-xl disabled:hidden ">
            <FaTableList size={32} />
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
                  ¡Estos son los productos que necesitamos comprar!{" "}
                  <BsEmojiSmile size={16} className="inline align-baseline" />{" "}
                  Por cada producto puedes editar su nombre, cantidad, precio o
                  categoría simplemente tocándolos. Si se presiona el botón a la
                  derecha de la categoría, sólo se mostrarán los productos de
                  esa categoría cuando muestra el ícono
                  <FaFilter
                    size={16}
                    className="inline ml-2 align-baseline"
                  />{" "}
                  o todos los productos cuando muestra el ícono
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
            {!showMarked ? (
              <ul
                className={clsx("flex flex-col gap-2 p-2 mt-14 items-center", {
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
                  className={clsx("flex flex-col gap-2 p-2 mt-1 items-center", {
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
