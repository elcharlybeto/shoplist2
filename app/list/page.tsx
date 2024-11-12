"use client";

import { Dispatch, SetStateAction, useCallback } from "react";
import { Item } from "../lib/definitions";
import { useMyContext } from "../lib/myContext";
import Listcard from "../ui/list-card";
import Total from "../ui/total";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

type DraggableListcardProps = {
  item: Item;
  index: number;
  items: Item[];
  setItems: Dispatch<SetStateAction<Item[]>>;
};

const DraggableListcard = ({ item, index, items, setItems }: DraggableListcardProps) => {
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
      ref={(node) => dragRef(dropRef(node))}
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
  const { items, setItems } = useMyContext();

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="pt-16 pb-4 min-w-full min-h-screen flex flex-col items-center bg-background">
        <div className="min-w-full fixed">
          <Total items={items} />
        </div>
        <ul className="flex flex-col gap-2 p-2 mt-14 items-center">
          {items.map((item, index) =>
            item.location === "list" ? (
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
      </div>
    </DndProvider>
  );
};

export default Page;


