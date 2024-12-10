'use client'
import Link from "next/link";
import { TbHandFinger } from "react-icons/tb";
import CompactView from "../ui/compact-view";
import { BsEmojiSmile } from "react-icons/bs";
import { useEffect, useState } from "react";
import { useMyContext } from "../lib/myContext";
import clsx from "clsx";
import { sortItemsByCategoryOrder } from "../lib/utils";

const Page = () => {
  const { items, setItems, categories, settings } = useMyContext();

  const [showHelp, setShowHelp] = useState(settings.helpActive);

  const [qList, setQList] = useState(
    items.filter((item) => item.location === "list").length
  );

  useEffect(() => {
     setQList(items.filter((item) => item.location === "list").length);
  }, [items]);

  useEffect(() => {
    setShowHelp(settings.helpActive);
  }, [settings]);

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


  return (
    <div className=" bg-[url('/bckg.jpg')] bg-cover bg-fixed bg-center w-full min-h-screen flex flex-col justify-between" >
       {showHelp && (
              <div className="mt-16 bg-secondary flex">
                <span className="p-4 italic text-justify">
                  ¡Estos son los productos que necesitas comprar!{" "}
                  <BsEmojiSmile size={16} className="inline align-baseline" />{" "}
                  Es sólo una vista rápida. Para editar, comprar o activar más acciones, toca el botón flotante 
                  <TbHandFinger
                    size={16}
                    className="inline ml-2 align-baseline"
                  />{" ."}
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
    <div className={clsx("w-full flex justify-center border py-4",{'mt-40':!showHelp})}>
      <Link href={"/list"}>
        <button className="fixed right-2 bottom-4 p-2 bg-floating text-text-floating border border-primary rounded-xl disabled:hidden ">
          <TbHandFinger size={32} />
        </button>
      </Link>
     
      <CompactView />
    </div>
    </div>
  );
};

export default Page;
