"use client";

import { DndContext, closestCenter, DragEndEvent } from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Dispatch, SetStateAction } from "react";
import { Item } from "../lib/definitions";
import { useMyContext } from "../lib/myContext";
import Listcard from "../ui/list-card";
import Total from "../ui/total";
import { FaGripLines } from "react-icons/fa"; 

const Page = () => {
  const { items, setItems } = useMyContext();

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over !== null) {
      if (active.id !== over.id) {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);

        const reorderedItems = arrayMove(items, oldIndex, newIndex);
        setItems(reorderedItems);
        localStorage.setItem("items", JSON.stringify(reorderedItems));
      }
    }
  };

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <div className="pt-16 pb-4 min-w-full min-h-screen flex flex-col items-center bg-background">
        <div className="min-w-full fixed">
          <Total items={items} />
        </div>
        <SortableContext items={items} strategy={verticalListSortingStrategy}>
          <ul className="flex flex-col gap-2 p-2 mt-14 items-center">
            {items.map((item) =>
              item.location === "list" ? (
                <SortableListcard
                  key={item.id}
                  item={item}
                  items={items}
                  setItems={setItems}
                />
              ) : null
            )}
          </ul>
        </SortableContext>
      </div>
    </DndContext>
  );
};

export default Page;


const SortableListcard = ({
  item,
  items,
  setItems,
}: {
  item: Item;
  items: Item[];
  setItems: Dispatch<SetStateAction<Item[]>>;
}) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: item.id,
    });

    const style = {
      transform: CSS.Transform.toString({
        x: 0,
        y: transform?.y || 0, 
        scaleX: 1, 
        scaleY: 1, 
      }),
      transition,
    };

  return (
    <li ref={setNodeRef} style={style}>
      <div className="flex items-stretch">
       
        <div {...attributes} {...listeners} className="p-1 cursor-move rounded-md border border-border-list bg-icon-list shadow-xl shadow-shadow-list">
          <FaGripLines className="text-secondary" size={12} />
        </div>
        
        <Listcard item={item} items={items} setItems={setItems} />
      </div>
    </li>
  );
};
