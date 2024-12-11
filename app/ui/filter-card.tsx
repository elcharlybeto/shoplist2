"use client";
import clsx from "clsx";
import { FaMinus, FaPlus } from "react-icons/fa";
import { Category } from "../lib/definitions";
import { useMyContext } from "../lib/myContext";

const FilterCard = ({ category }: { category: Category }) => {
  const { categories, setCategories } = useMyContext();

  const updateCategories = (category: Category) => {
    const newCategories = categories.map((savedCategory) =>
      savedCategory.id === category.id ? category : savedCategory
    );
    localStorage.setItem("categories", JSON.stringify(newCategories));
    setCategories(newCategories);
  };

  const toggleActiveStatus = () => {
    const updatedCategory: Category = {
      ...category,
      active: !category.active,
    };
    updateCategories(updatedCategory);
  };

  return (
    <>
      <div
        className={clsx(
          "flex justify-between gap-10 rounded-md border border-border-list pl-4 p-2 bg-bg-list shadow shadow-shadow-list",
          {
            "bg-secondary": !category.active,
          }
        )}
      >
        <span className="text-lg w-10/12">{category.name}</span>

        <button
          className="text-icon-list hover:text-hover-icon-list cursor-pointer transition-colors w-2/12 flex justify-center items-center"
          onClick={toggleActiveStatus}
        >
          {category.active ? <FaMinus size={18} /> : <FaPlus size={18} />}
        </button>
      </div>
    </>
  );
};

export default FilterCard;
