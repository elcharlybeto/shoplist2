"use client";

import { Dispatch, SetStateAction, useEffect } from "react";
import { Category, Item } from "../lib/definitions";
import { useMyContext } from "../lib/myContext";
import Listcard from "../ui/list-card";
import Total from "../ui/total";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { TouchBackend } from "react-dnd-touch-backend";
import { MultiBackend, TouchTransition } from "dnd-multi-backend";
import { isCategoryActive } from "../lib/utils";
import { FaFilterCircleXmark, FaPencil } from "react-icons/fa6";
import Link from "next/link";

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
  const { items, setItems, categories, sorting } = useMyContext();

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

  useEffect(() => {
    if (sorting) {
      setItems((prevItems) => {
        const newItems = sortItemsByCategoryOrder(prevItems, categories);
        localStorage.setItem("items", JSON.stringify(newItems));
        return newItems;
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sorting, categories]);
  
  return (
    <DndProvider backend={MultiBackend} options={multiBackendOptions}>
      <div className="pt-16 pb-4 min-w-full min-h-screen flex flex-col items-center bg-background">
        <Link href={"/filters"}>
          <span className="fixed right-3 bottom-4 p-2 bg-secondary border border-primary rounded-xl disabled:hidden ">
            <FaFilterCircleXmark size={32} />
          </span>
        </Link>
        <div className="min-w-full fixed">
          <Total items={items} />
        </div>
        {items.filter((item) => item.location === "list").length === 0 ? (
          <div className="flex h-full items-center justify-center">
            <FaPencil size={150} />
          </div>
        ) : (
          <ul className="flex flex-col gap-2 p-2 mt-14 items-center">
            {items.map((item, index) =>
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
        )}
      </div>
    </DndProvider>
  );
};

export default Page;
