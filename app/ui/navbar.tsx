"use client";

import clsx from "clsx";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { BiSolidHide } from "react-icons/bi";
import { CiLight } from "react-icons/ci";
import {
  FaBars,
  FaList,
  FaPlus,
  FaShoppingCart,
  FaTimes,
  FaToggleOff,
  FaToggleOn,
} from "react-icons/fa";
import { FaFilter } from "react-icons/fa6";
import { GoBook } from "react-icons/go";
import { LuHelpCircle } from "react-icons/lu";
import { MdDarkMode, MdFilterAltOff } from "react-icons/md";
import Swal from "sweetalert2";
import { useMyContext } from "../lib/myContext";
import { activateAllCategories, countInactiveCategories } from "../lib/utils";

const Navbar = () => {
  const {
    items,
    setItems,
    isOpen,
    setIsOpen,
    categories,
    setCategories,
    settings,
    updateSettings
  } = useMyContext();

  const [theme, setTheme] = useState<"dark" | "light">("light");
  const [qList, setQList] = useState(0);
  const [qCart, setQCart] = useState(0);
  const [qHistorial, setQHistorial] = useState(0);

  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as "dark" | "light";
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.classList.add(savedTheme);
    }
  }, []);

  useEffect(() => {
    setQList(items.filter((item) => item.location === "list").length);
    setQCart(items.filter((item) => item.location === "cart").length);
    setQHistorial(items.filter((item) => item.location === "historial").length);
  }, [items]);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);

    document.documentElement.classList.remove(theme);
    document.documentElement.classList.add(newTheme);
    setIsOpen(false);
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const clearList = () => {
    setIsOpen(false);
    Swal.fire({
      icon: "warning",
      title: "¿Estás seguro?",
      text: "Todos los items pasarán al historial...",
      showDenyButton: true,
      confirmButtonText: "Vaciar",
      denyButtonText: `Cancelar`,
    }).then((result) => {
      if (result.isConfirmed) {
        const newList = items.map((item) => {
          if (item.location === "list") {
            item.location = "historial";
            item.onSale = false;
            item.price = Math.abs(item.price);
            item.onSalePrice = Math.abs(item.price);
          }
          return item;
        });
        localStorage.setItem("items", JSON.stringify(newList));
        setItems(newList);
        Swal.fire("¡Lista vacía!", "", "success");
        router.replace("/list");
      }
    });
  };

  const clearCart = () => {
    setIsOpen(false);
    Swal.fire({
      icon: "warning",
      title: "¿Estás seguro?",
      text: "Todos los items pasarán al historial...",
      showDenyButton: true,
      confirmButtonText: "Vaciar",
      denyButtonText: `Cancelar`,
    }).then((result) => {
      if (result.isConfirmed) {
        const newList = items.map((item) => {
          if (item.location === "cart") {
            item.location = "historial";
            item.onSale = false;
            item.onSalePrice = item.price;
          }
          return item;
        });
        localStorage.setItem("items", JSON.stringify(newList));
        setItems(newList);
        Swal.fire("¡Carro vacío!", "", "success");
        router.replace("/list");
      }
    });
  };

  const clearHistorial = () => {
    setIsOpen(false);
    Swal.fire({
      icon: "warning",
      title: "¿Estás seguro?",
      text: "¡Todos los items se borrarán del historial!",
      showDenyButton: true,
      confirmButtonText: "Vaciar",
      denyButtonText: `Cancelar`,
    }).then((result) => {
      if (result.isConfirmed) {
        const newItems = items.filter((item) => item.location !== "historial");
        localStorage.setItem("items", JSON.stringify(newItems));
        setItems(newItems);
        Swal.fire("¡Historial vacío!", "", "success");
        router.replace("/list");
      }
    });
  };

  const unShop = () => {
    setIsOpen(false);
    Swal.fire({
      icon: "warning",
      title: "¿Estás seguro?",
      text: "¡Todos los items volverán a la lista!",
      showDenyButton: true,
      confirmButtonText: "Anular Compra",
      denyButtonText: `Cancelar`,
    }).then((result) => {
      if (result.isConfirmed) {
        const newList = items.map((item) => {
          if (item.location === "cart") {
            item.location = "list";
            item.onSale = false;
            item.onSalePrice = item.price;
          }
          return item;
        });
        localStorage.setItem("items", JSON.stringify(newList));
        setItems(newList);
        Swal.fire("¡Compra anulada!", "", "success");
        router.replace("/list");
      }
    });
  };

  const clearFilters = () => {
    const newCategories = activateAllCategories(categories);
    setCategories(newCategories);
    localStorage.setItem("categories", JSON.stringify(newCategories));
  };

  const editCategories = () => {
    setIsOpen(false);
    router.replace("/categories");
  };

  const showTicket = () => {
    setIsOpen(false);
    router.replace("/ticket");
  };

  const toggleHelp = () => {
    updateSettings({ helpActive: !settings.helpActive });
    setIsOpen(false);
  };

  const toggleSort = () => {
    updateSettings({ sorting: !settings.sorting });
    setIsOpen(false);
  };

  return (
    <nav className="bg-primary opacity-95 text-white p-4 flex items-center justify-between">
      <div className="flex items-center">
        <button onClick={toggleMenu} className="text-white focus:outline-none">
          <FaBars size={24} />
        </button>
      </div>

      <div className="flex" style={{ fontFamily: "var(--font-sour-gummy)" }}>
        <Link href="/">
          <span className="text-xl font-bold">ShopList</span>{" "}
          <span className="opacity-60 ml-1">v3.0</span>
        </Link>
      </div>

      <div
        className={`fixed top-0 left-0 h-full w-full  bg-blue-900 text-white transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 z-20 ease-in-out`}
      >
        <div className="flex justify-between p-4">
          <span className="p-2 font-semibold">ShopList</span>
          <button
            onClick={() => setIsOpen(false)}
            className="text-white focus:outline-none"
          >
            <FaTimes size={24} />
          </button>
        </div>

        <div className="flex justify-center">
          <ul className="p-4 border border-slate-300 border-opacity-20 w-3/4 ">
            <li className="flex items-center justify-between p-2 cursor-pointer">
              <button
                className="disabled:opacity-60 disabled:cursor-none"
                disabled={qList === 0}
                onClick={clearList}
              >
                Vaciar Lista
              </button>
              <Link href="/list" onClick={() => setIsOpen(false)}>
                <span className="bg-blue-600 border rounded-2xl text-center font-semibold border-white py-1 px-2">
                  {qList}
                </span>
              </Link>
            </li>
            <li className="flex items-center justify-between p-2 cursor-pointer">
              <button
                className="disabled:opacity-60 disabled:cursor-none"
                disabled={qCart === 0}
                onClick={clearCart}
              >
                Vaciar Carro
              </button>
              <Link href="/cart" onClick={() => setIsOpen(false)}>
                <span className="bg-red-600 border rounded-2xl text-center font-semibold border-white py-1 px-2">
                  {qCart}
                </span>
              </Link>
            </li>
            <li className="flex items-center justify-between p-2 cursor-pointer">
              <button
                className="disabled:opacity-60 disabled:cursor-none"
                disabled={qHistorial === 0}
                onClick={clearHistorial}
              >
                Vaciar Historial
              </button>
              <Link href="/historial" onClick={() => setIsOpen(false)}>
                <span className="bg-green-600 border rounded-2xl text-center font-semibold border-white py-1 px-2">
                  {qHistorial}
                </span>
              </Link>
            </li>

            <li className="flex items-center justify-between p-2 cursor-pointer">
              <button
                className=" disabled:opacity-60 disabled:cursor-none"
                disabled={qCart === 0}
                onClick={showTicket}
              >
                Controlar ticket
              </button>
            </li>

            <li className="p-2 cursor-pointer">
              <button
                className="disabled:opacity-60 disabled:cursor-none"
                disabled={qCart === 0}
                onClick={unShop}
              >
                Anular Compra
              </button>
            </li>

            <li
              className="flex items-center justify-between p-2 cursor-pointer"
              onClick={editCategories}
            >
              <span>Crear y Activar Categorías</span>
              <FaFilter className="cursor-pointer" size={20} />
            </li>

            <li className="cursor-pointer flex items-center justify-between p-2">
              <Link
                href="/sorting"
                onClick={() => setIsOpen(false)}
              >
                <span>Ordenar Categorías</span> </Link>
                <button onClick={toggleSort}>
                  {settings.sorting ? (
                    <FaToggleOn size={24}/>
                  ) : (
                    <FaToggleOff size={24} />
                  )}
                </button>
            </li>

            <li className="p-2 cursor-pointer" onClick={toggleHelp}>
              <div className="flex justify-between">
                <button onClick={toggleHelp}>
                  {settings.helpActive ? "Ocultar " : "Mostrar "} guías de ayuda
                </button>
                {settings.helpActive ? (
                  <BiSolidHide size={24} />
                ) : (
                  <LuHelpCircle size={24} />
                )}
              </div>
            </li>

            <li className="p-2 cursor-pointer" onClick={toggleTheme}>
              <div className="flex justify-between">
                <span>Cambiar tema</span>
                <div className="flex border w-20 border-white rounded-lg justify-around p-1">
                  <button
                    className="cursor-pointer disabled:opacity-40 disabled:cursor-none"
                    disabled={theme === "dark"}
                  >
                    <MdDarkMode size={24} />
                  </button>
                  <button
                    className="cursor-pointer font-extrabold disabled:opacity-40 disabled:cursor-none"
                    disabled={theme === "light"}
                  >
                    <CiLight size={24} />
                  </button>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>

      <div className="flex space-x-6">
        <Link
          href="/list"
          className={clsx("hover:text-secondary", {
            "text-secondary": pathname === "/list",
          })}
        >
          <FaList size={24} />
        </Link>
        <Link
          href="/cart"
          className={clsx("hover:text-secondary", {
            "text-secondary": pathname === "/cart",
          })}
        >
          <FaShoppingCart size={24} />
        </Link>
        <Link
          href="/historial"
          className={clsx("hover:text-secondary", {
            "text-secondary": pathname === "/historial",
          })}
        >
          <GoBook size={24} />
        </Link>
        <Link
          href="/add"
          className={clsx("hover:text-secondary", {
            "text-secondary": pathname === "/add",
          })}
        >
          <FaPlus size={24} />
        </Link>
        <span
          className={clsx("", {
            "text-primary bg-secondary p-1 rounded-md cursor-pointer hover:text-secondary":
              countInactiveCategories(categories) > 0,
          })}
          onClick={clearFilters}
        >
          <MdFilterAltOff
            size={countInactiveCategories(categories) > 0 ? 16 : 24}
          />
        </span>
      </div>
    </nav>
  );
};

export default Navbar;
