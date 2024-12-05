"use client";
import { useEffect, useState } from "react";
import {
  FaArrowAltCircleRight,
  FaBars,
  FaRegCheckCircle,
  FaRegWindowClose,
} from "react-icons/fa";
import { FaToggleOff, FaToggleOn } from "react-icons/fa6";
import { Category } from "../lib/definitions";
import { useMyContext } from "../lib/myContext";
import {
  countInactiveCategories,
  formatString,
  inactivateAllCategories,
  isCategoryNameInArray,
  Toast,
} from "../lib/utils";
import CategoryCard from "../ui/category-card";
import { RiDeleteBin6Line } from "react-icons/ri";
import { MdFilterAltOff } from "react-icons/md";
import { BsEmojiSmile } from "react-icons/bs";
import { useRouter } from "next/navigation";

const Page = () => {
  const { categories, setCategories, settings, setIsOpen } = useMyContext();

  const [name, setName] = useState("");
  const [nameError, setNameError] = useState(false);
  const [showHelp, setShowHelp] = useState(settings.helpActive);

  const router = useRouter();

  const showErrorMsg = (msg: string) => {
    return (
      <div className="text-sm text-error-msg  font-semibold h-6">{msg}</div>
    );
  };

  const handleAddCategory = () => {
    if (formatString(name).length > 0) {
      if (!isCategoryNameInArray(categories, formatString(name))) {
        const newCategory: Category = {
          id: Date.now(),
          name: formatString(name),
          active: true,
        };
        const newCategories = [newCategory, ...categories].sort((a, b) =>
          a.name.localeCompare(b.name)
        );
        setCategories(newCategories);
        Toast.fire({
          icon: "success",
          title: "¡Categoría agregada!",
        });
        setName("");
        setNameError(false);

        localStorage.setItem("categories", JSON.stringify(newCategories));
      } else setNameError(true);
    } else setNameError(true);
  };

  const handleCancel = () => {
    setName("");
    setNameError(false);
  };

  const inactiveAll = () => {
    const newCategories = inactivateAllCategories(categories);
    setCategories(newCategories);
    localStorage.setItem("categories", JSON.stringify(newCategories));
  };

  useEffect(() => {
    setShowHelp(settings.helpActive);
  }, [settings]);

  return (
    <div className="pt-16 pb-4 w-full min-h-screen flex flex-col items-center">
      <button
        className="fixed right-3 bottom-4 p-2 bg-floating border border-primary rounded-xl disabled:hidden "
        onClick={inactiveAll}
        disabled={countInactiveCategories(categories) === categories.length}
      >
        <FaToggleOff size={32} />
      </button>
      {showHelp && (
        <div className="mt-1 bg-secondary flex">
          <span className="p-4 italic text-justify">
            Podemos crear categorías para ordenar y filtrar los productos en la
            lista. Simplemente ingresa un nombre que puede ser, por ejemplo, el
            de una sección del supermercado en el siguiente formulario y a
            continuación toca en
            <FaRegCheckCircle
              size={16}
              className="inline ml-2 align-baseline"
            />
            <span className="ml-1">.</span>
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

      <div className="flex w-[400px] shadow-lg mt-2 items-center justify-around py-2 px-4 bg-tertiary rounded-md shadow-shadow-list border border-primary">
        <div className="flex flex-col w-11/12 p-2">
          <label htmlFor="name" className="text-sm">
            Nueva Categoría
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="p-1 mr-2 mb-2 border border-border-input bg-input-bg"
            autoComplete="off"
            required
          />
          {nameError ? (
            showErrorMsg(
              formatString(name).length === 0
                ? "¡Se debe ingresar una descripción!"
                : "¡Categoría existente!"
            )
          ) : (
            <div className="min-h-6"></div>
          )}
        </div>

        <div className="flex flex-col w-1/12 h-full items-center justify-around">
          <span
            className="text-icon-form hover:text-hover-icon-form cursor-pointer transition-colors"
            onClick={handleAddCategory}
          >
            <FaRegCheckCircle size={24} />
          </span>
          <span
            className="text-icon-form hover:text-hover-icon-form cursor-pointer transition-colors"
            onClick={handleCancel}
          >
            <FaRegWindowClose size={24} />
          </span>
        </div>
      </div>

      {showHelp && (
        <div className="mt-2 bg-secondary flex">
          <span className="p-4 italic text-justify">
            Para modificar el nombre de una categoría, simplemente debes
            tocarlo. Elimina una categoría tocando sobre su botón
            <RiDeleteBin6Line
              size={16}
              className="inline ml-2 align-baseline"
            />
            <span className="ml-1">
              {" "}
              Desactivar una categoría implica ocultar los productos de la lista
              pertenecientes a esa categoría, se hace tocando sobre su botón
            </span>
            <FaToggleOff size={16} className="inline ml-2 align-baseline" />
            <span className="ml-1">
              , mientras que para hacerlos visibles nuevamente, debemos
              activarla tocando sobre
            </span>
            <FaToggleOn size={16} className="inline ml-2 align-baseline" />{" "}
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

      {showHelp && (
        <div className="mt-1 bg-secondary flex">
          <span className="p-4 italic text-justify">
            El botón flotante
            <FaToggleOff size={16} className="inline ml-2 align-baseline" />
            <span className="ml-1">
              , desactiva todas las categorías al mismo tiempo, mientras que con
              el ícono{" "}
            </span>
            <MdFilterAltOff size={16} className="inline ml-2 align-baseline" />
            <span className="ml-1">
              {" "}
              en la barra superior, se vuelven a activar todas.{" "}
            </span>
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

      <div>
        <ul className="flex flex-col gap-2 p-2 items-center">
          {categories.map((category) => (
            <li key={category.id}>
              <CategoryCard category={category} />
            </li>
          ))}
        </ul>
      </div>

      {showHelp && (
        <div className="mt-1 bg-secondary flex mb-4">
          <span className="p-4 italic text-justify">
            Ya dimos nuestro primer gran paso. Ahora para aprovechar las
            categorías que creamos, podemos ordenarlas y activar el ordenamiento
            automático de la lista, de modo que al incorporar un producto a la
            misma, se ubique según un orden prestablecido. Esto va a ahorrarnos
            tiempo para leer todos los productos de la misma sección juntos y si
            ordenamos las categorías en el orden que recorremos el supermercado,
            simplemente es cuestión de seguir la lista renglón a renglón.
            <BsEmojiSmile size={16} className="inline ml-2 align-baseline" />
            Para ordenar las categorías y activar el ordenamiento automático en
            la lista, podemos seleccionar la opción{" "}
            <span className="font-bold">Ordenar categorías </span>
            del menú hamburguesa{" "}
            <FaBars
              size={16}
              className="inline ml-2 align-baseline cursor-pointer"
              onClick={() => setIsOpen(true)}
            />{" "}
            o tocar acá{" "}
            <FaArrowAltCircleRight
              size={16}
              className="inline ml-2 align-baseline cursor-pointer"
              onClick={() => router.replace("/sorting")}
            />
            .
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
    </div>
  );
};

export default Page;
