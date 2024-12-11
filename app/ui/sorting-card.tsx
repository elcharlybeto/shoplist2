"use client";
import { FaSortDown, FaSortUp } from "react-icons/fa";
import { Category } from "../lib/definitions";
import { useMyContext } from "../lib/myContext";

const SortingCard = ({ category }: { category: Category }) => {
  const {  categories, setCategories } = useMyContext();

  const moveCategoryUp = (id:number) => {
    const newCategories = [...categories];
    const index = newCategories.findIndex((category) => category.id === id);
  
    if (index > 0) {
      [newCategories[index - 1], newCategories[index]] = [newCategories[index], newCategories[index - 1]];
    }
    localStorage.setItem("categories", JSON.stringify(newCategories));
    setCategories(newCategories);
  }

  const moveCategoryDown = (id:number) =>{
    const newCategories = [...categories];
    const index = newCategories.findIndex((category) => category.id === id);
  
    if (index !== -1 && index < newCategories.length - 1) { 
      [newCategories[index], newCategories[index + 1]] = [newCategories[index + 1], newCategories[index]];
    }
    localStorage.setItem("categories", JSON.stringify(newCategories));
    setCategories(newCategories);
  }
  
  return (
    <>
      <div className=" w-[300px] rounded-md border border-border-list bg-bg-list p-3 shadow-xl shadow-shadow-list">
        <div className="flex justify-between px-4 ">
          <button
            className="text-icon-list hover:text-hover-icon-list cursor-pointer transition-colors"
            onClick={()=>moveCategoryUp(category.id)}
          >
            <FaSortUp size={24} />
          </button>
          <div className="text-center w-56">{category.name}</div>
          <button
            className="text-icon-list hover:text-hover-icon-list cursor-pointer transition-colors"
            onClick={()=>moveCategoryDown(category.id)}
          >
            <FaSortDown size={24} />
          </button>
        </div>
      </div>
    </>
  );
};

export default SortingCard;
