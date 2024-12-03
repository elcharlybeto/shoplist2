import React, { useState, ChangeEvent } from "react";
import { useMyContext } from "../lib/myContext";
import { Category } from "../lib/definitions";

const RadioForm = () => {
  const [selectedOption, setSelectedOption] = useState<string>("end");
  const { categories, setCategories } = useMyContext();

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setSelectedOption(event.target.value);
    setCategories(repositionCategory(categories, 0, event.target.value));
    localStorage.setItem("categories", JSON.stringify(categories));
  };

  function repositionCategory(
    categories: Category[],
    targetId: number,
    position: string
  ): Category[] {
    const index = categories.findIndex((category) => category.id === targetId);
    if (index === -1) return categories;

    const [category] = categories.splice(index, 1);

    if (position === "start") {
      categories.unshift(category);
    } else if (position === "end") {
      categories.push(category);
    }

    return categories;
  }

  return (
    <form className="p-4 my-4 border-2 border-black bg-bg-list">
      <h1 className="text-semibold mb-2">
        Los productos de la Categoría Misceláneos se situarán al
      </h1>
      <div>
        <label className="mb-2">
          <input
            type="radio"
            name="options"
            value="end"
            checked={selectedOption === "end"}
            onChange={handleChange}
          />
          <span className="ml-2">Final de la Lista</span>
        </label>
      </div>
      <div>
        <label>
          <input
            type="radio"
            name="options"
            value="start"
            checked={selectedOption === "start"}
            onChange={handleChange}
          />
          <span className="ml-2">Comienzo de la Lista</span>
        </label>
      </div>
    </form>
  );
};

export default RadioForm;
