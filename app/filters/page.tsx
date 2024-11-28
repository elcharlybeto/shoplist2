"use client";
import { useMyContext } from "../lib/myContext";
import FilterCard from "../ui/filter-card";

const Page = () => {
  const { categories } = useMyContext();

  return (
    <div className="pt-16 pb-4 w-full min-h-screen justify-around flex flex-col items-center">
        <div className=" flex flex-col w-11/12 items-center">
        <span className="font-semibold text-center text-lg uppercase border p-2 border-accent rounded-full bg-tertiary mb-2">mostrar</span>
        
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
        </div>
        <div className=" flex flex-col w-11/12 items-center">
        <span className="font-semibold text-center text-lg uppercase border p-2 border-accent rounded-full bg-tertiary mb-2">ocultar</span>
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
        </div>
    </div>
  );
};

export default Page;
