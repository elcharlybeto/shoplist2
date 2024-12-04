import { ChangeEvent } from "react";
import { Category } from "../lib/definitions";
import { useMyContext } from "../lib/myContext";

const RadioForm = () => {
  const { categories, setCategories, settings, updateSettings } = useMyContext();

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setCategories(repositionCategory(categories, 0, event.target.value));
    localStorage.setItem("categories", JSON.stringify(categories));
    updateSettings({ miscPosition: event.target.value as "start" | "end" });

  };

  const repositionCategory = (
    categories: Category[],
    targetId: number,
    position: string
  ): Category[] => {
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
            checked={settings.miscPosition === "end"}
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
            checked={settings.miscPosition === "start"}
            onChange={handleChange}
          />
          <span className="ml-2">Comienzo de la Lista</span>
        </label>
      </div>
    </form>
  );
};

export default RadioForm;
