"use client";

import clsx from "clsx";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  FaBars,
  FaHourglass,
  FaList,
  FaPlus,
  FaShoppingCart,
  FaTimes,
} from "react-icons/fa";
import { CiLight } from "react-icons/ci";
import { MdDarkMode } from "react-icons/md";
import Swal from "sweetalert2";
import { useMyContext } from "../lib/myContext";

const Navbar = () => {
  const {items, setItems, isOpen, setIsOpen} = useMyContext();
  
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
  }, [items])
  

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
        items.map((item) => {
          if (item.location === "list") item.location = "historial";
        });
        localStorage.setItem("items", JSON.stringify(items));
        setItems(items);
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
        items.map((item) => {
          if (item.location === "cart") item.location = "historial";
        });
        localStorage.setItem("items", JSON.stringify(items));
        setItems(items);
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
      text: "Todos los items se borrarán del historial!",
      showDenyButton: true,
      confirmButtonText: "Vaciar",
      denyButtonText: `Cancelar`,
    }).then((result) => {
      if (result.isConfirmed) {
        const newItems = items.filter(item => item.location !== 'historial');
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
      text: "Todos los items volverán a la lista!",
      showDenyButton: true,
      confirmButtonText: "Anular Compra",
      denyButtonText: `Cancelar`,
    }).then((result) => {
      if (result.isConfirmed) {
        items.map((item) => {
          if (item.location === "cart") item.location = "list";
        });
        localStorage.setItem("items", JSON.stringify(items));
        setItems(items);
        Swal.fire("¡Compra anulada!", "", "success");
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
          <button onClick={()=>setIsOpen(false)} className="text-white focus:outline-none">
            <FaTimes size={24} />
          </button>
        </div>

        <ul className="p-4">
          <li className="flex items-center justify-between p-2">
            <button className="cursor-pointer disabled:opacity-60 disabled:cursor-none" disabled={qList === 0}  onClick={clearList}>
              Vaciar Lista
            </button>
            <span className="bg-blue-600 border rounded-2xl text-center font-semibold border-white py-1 px-2">
              {qList}
            </span>
          </li>
          <li className="flex items-center justify-between p-2">
            <button className="cursor-pointer disabled:opacity-60 disabled:cursor-none" disabled={qCart === 0} onClick={clearCart}>
              Vaciar Carro
            </button>
            <span className="bg-red-600 border rounded-2xl text-center font-semibold border-white py-1 px-2">
              {qCart}
            </span>
          </li>
          <li className="flex items-center justify-between p-2">
            <button className="cursor-pointer disabled:opacity-60 disabled:cursor-none" disabled={qHistorial === 0} onClick={clearHistorial}>
              Vaciar Historial
            </button>
            <span className="bg-green-600 border rounded-2xl text-center font-semibold border-white py-1 px-2">
              {qHistorial}
            </span>
          </li>
          <li className="p-2">
            <button className="cursor-pointer disabled:opacity-60 disabled:cursor-none" disabled={qCart === 0} onClick={unShop}>
              Anular Compra
            </button>
          </li>
          <li className="p-2">
            <div className="cursor-pointer flex justify-between">
              <button onClick={toggleTheme}>
                Cambiar tema 
              </button>
              <div className='flex border w-20 border-white rounded-lg justify-around p-1' onClick={toggleTheme}>
                <button className="cursor-pointer disabled:opacity-40 disabled:cursor-none" disabled={theme === "dark"}><MdDarkMode size={24} /></button> 
                <button className="cursor-pointer font-extrabold disabled:opacity-40 disabled:cursor-none" disabled={theme === "light"}><CiLight size={24}/></button></div>
            </div>
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
