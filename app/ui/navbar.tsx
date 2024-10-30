"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  FaBars,
  FaList,
  FaShoppingCart,
  FaHourglass,
  FaPlus,
  FaTimes,
} from "react-icons/fa";
import clsx from "clsx";
import { Item } from "../lib/definitions";
import Swal from "sweetalert2";

const Navbar = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [theme, setTheme] = useState<"dark" | "light">("light");

  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    setItems(JSON.parse(localStorage.getItem("items") || "[]"));
    const savedTheme = localStorage.getItem("theme") as "dark" | "light";
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.classList.add(savedTheme);
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);

    document.documentElement.classList.remove(theme);
    document.documentElement.classList.add(newTheme);
  };

  // useEffect(() => {
  //   setItems(JSON.parse(localStorage.getItem("items") || "[]"));
  // }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
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
        items.map((item) => {
          if (item.location === "list") item.location = "historial";
        });
        localStorage.setItem("items", JSON.stringify(items));
        Swal.fire("¡Lista vacía!", "", "success");
        router.replace("/list");
      }
    });
  };

  return (
    <nav className="bg-primary text-white p-4 flex items-center justify-between">
      <div className="flex items-center">
        <button
          onClick={toggleMenu}
          className="text-white focus:outline-none lg:hidden"
        >
          <FaBars size={24} />
        </button>
      </div>

      <div className="ml-4 text-2xl font-bold">
        <Link href="/">ShopList v3.0</Link>
      </div>

      <div
        className={`fixed top-0 left-0 h-full w-64 bg-blue-900 text-white transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out`}
      >
        <div className="flex justify-between p-4">
          <span className="p-2 font-semibold">ShopList</span>
          <button onClick={closeMenu} className="text-white focus:outline-none">
            <FaTimes size={24} />
          </button>
        </div>

        <ul className="p-4">
          <li className="flex items-center justify-between p-2">
            <span className="hover:text-gray-400" onClick={clearList}>
              Vaciar Lista
            </span>
            <span className="bg-blue-600 border rounded-2xl text-center font-semibold border-white py-1 px-2">
              {items.filter((item) => item.location === "list").length}
            </span>
          </li>
          <li className="flex items-center justify-between p-2">
            <span className="hover:text-gray-400" onClick={closeMenu}>
              Vaciar Carro
            </span>
            <span className="bg-red-600 border rounded-2xl text-center font-semibold border-white py-1 px-2">
              {items.filter((item) => item.location === "cart").length}
            </span>
          </li>
          <li className="flex items-center justify-between p-2">
            <span className="hover:text-gray-400" onClick={closeMenu}>
              Vaciar Historial
            </span>
            <span className="bg-green-600 border rounded-2xl text-center font-semibold border-white py-1 px-2">
              {items.filter((item) => item.location === "historial").length}
            </span>
          </li>
          <li className="p-2">
            <a href="#" className="hover:text-gray-400" onClick={closeMenu}>
              Anular Compra
            </a>
          </li>
          <li className="p-2">
            <div className={clsx("app-container", { dark: theme === "dark" })}>
              <button
                onClick={toggleTheme}
                className={clsx(
                  "p-2 border rounded",
                  { "bg-gray-700 text-white": theme === "dark" },
                  { "bg-yellow-300 text-black": theme === "light" }
                )}
              >
                Cambiar a {theme === "light" ? "Oscuro" : "Claro"}
              </button>
              {/* Aquí iría el resto de tu app */}
            </div>
            {/* <a href="#" className="hover:text-gray-400" onClick={closeMenu}>
              Opción 5
            </a> */}
          </li>
        </ul>
      </div>

      <div className="flex space-x-6">
        <Link
          href="/list"
          className={clsx("hover:text-gray-400", {
            "text-blue-300 ": pathname === "/list",
          })}
        >
          <FaList size={24} />
        </Link>
        <Link
          href="/cart"
          className={clsx("hover:text-gray-400", {
            "text-blue-300": pathname === "/cart",
          })}
        >
          <FaShoppingCart size={24} />
        </Link>
        <Link
          href="/historial"
          className={clsx("hover:text-gray-400", {
            "text-blue-300": pathname === "/historial",
          })}
        >
          <FaHourglass size={24} />
        </Link>
        <Link
          href="/add"
          className={clsx("hover:text-gray-400", {
            "text-blue-300": pathname === "/add",
          })}
        >
          <FaPlus size={24} />
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
