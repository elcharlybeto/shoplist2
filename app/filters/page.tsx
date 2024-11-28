"use client";
import { FaMinus, FaPlus } from "react-icons/fa";
import { useMyContext } from "../lib/myContext";
import {
  activateAllCategories,
  countActiveCategories,
  countInactiveCategories,
  inactivateAllCategories,
} from "../lib/utils";
import FilterCard from "../ui/filter-card";
import clsx from "clsx";
import { useEffect, useState } from "react";

const Page = () => {
  const { categories, setCategories } = useMyContext();
  const [allInactive, setAllInactive] = useState(
    countInactiveCategories(categories) === categories.length
  );
  const [allActive, setAllActive] = useState(
    countActiveCategories(categories) === categories.length
  );

  useEffect(() => {
    setAllInactive(countInactiveCategories(categories) === categories.length);
    setAllActive(countActiveCategories(categories) === categories.length);
  }, [categories]);

  const inactiveAll = () => {
    const newCategories = inactivateAllCategories(categories);
    setCategories(newCategories);
    localStorage.setItem("categories", JSON.stringify(newCategories));
  };

  const activeAll = () => {
    const newCategories = activateAllCategories(categories);
    setCategories(newCategories);
    localStorage.setItem("categories", JSON.stringify(newCategories));
  };

  return (
    <div className="pt-16 pb-4 w-full min-h-screen justify-around flex flex-col items-center">
      <div className=" flex flex-col w-11/12 items-center">
        <span className="font-semibold text-center text-lg uppercase border p-2 border-accent rounded-full bg-tertiary  mb-2">
          mostrar
        </span>

        <ul className="flex flex-wrap gap-2 p-2 items-center justify-center">
          {categories.map((category) => {
            if (category.active)
              return (
                <li key={category.id}>
                  <FilterCard category={category} />
                </li>
              );
          })}
        </ul>
        <div
          className={clsx(
            "flex justify-between gap-10 rounded-md border border-border-list pl-4 p-2 bg-secondary  shadow shadow-shadow-list cursor-pointer",
            { hidden: allInactive }
          )}
          onClick={inactiveAll}
        >
          <span className="font-bold text-sm w-11/12">OCULTAR TODAS</span>
          <span className="text-icon-list hover:text-hover-icon-list w-1/12 flex justify-center items-center">
            <FaMinus size={18} />
          </span>
        </div>
      </div>
      <div className=" flex flex-col w-11/12 items-center">
        <span className="font-semibold text-center text-lg uppercase border p-2 border-accent rounded-full bg-tertiary mb-2">
          ocultar
        </span>
        <ul className="flex flex-wrap gap-2 p-2 items-center justify-center">
          {categories.map((category) => {
            if (!category.active)
              return (
                <li key={category.id}>
                  <FilterCard category={category} />
                </li>
              );
          })}
        </ul>
        <div
          className={clsx(
            "flex justify-between gap-10 rounded-md border border-border-list pl-4 p-2 bg-bg-list shadow shadow-shadow-list cursor-pointer",
            { hidden: allActive }
          )}
          onClick={activeAll}
        >
          <span className="font-bold text-sm w-11/12">MOSTRAR TODAS</span>
          <span className="text-icon-list hover:text-hover-icon-list w-1/12 flex justify-center items-center">
            <FaPlus size={18} />
          </span>
        </div>
      </div>
    </div>
  );
};

export default Page;
