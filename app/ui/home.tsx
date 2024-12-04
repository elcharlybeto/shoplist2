"use client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { LiaHandPointRightSolid } from "react-icons/lia";
import { useMyContext } from "../lib/myContext";

export default function Home() {
  const { items } = useMyContext();

  const router = useRouter();

  const [emptyHistorial, setEmptyHistorial] = useState(true);

  useEffect(() => {
    if (items.filter((item) => item.location === "historial").length > 0)
      setEmptyHistorial(false);
    if (items.filter((item) => item.location === "list").length > 0)
      router.replace("/list");
  }, [items, router]);

  return (
    <div className="min-h-screen  flex flex-col items-center justify-center">
      <div className="w-[150px] h-[150px] rounded-full overflow-hidden relative">
        <Image
          src="/notas.png"
          alt="anotador"
          width={150}
          height={150}
          style={{ objectFit: "cover" }}
        />
      </div>
      <h1
        className="font-bold text-center m-8 text-5xl"
        style={{ fontFamily: "var(--font-sour-gummy)" }}
      >
        ¡No te olvides nada!
      </h1>
      <div className="flex flex-col items-center min-w-9/12 p-8">
        <span className="bg-secondary text-center font-bold border border-primary p-2 w-[150px] rounded-md">
          ¡Es fácil!
        </span>
        <div className="mt-6 w-full">
          <ul className="flex flex-col gap-4">

          <Link href="/categories">
              <li className=" bg-accent shadow-lg p-2 px-4 text-center flex gap-2 items-center rounded-xl">
                <LiaHandPointRightSolid size={18} />
                <span>Creá categorías para organizar tus productos...</span>
              </li>
            </Link>

            <Link href="/add">
              <li className="p-2 px-4 text-center flex items-center gap-2 rounded-xl bg-tertiary shadow-lg">
                <LiaHandPointRightSolid size={18} />
                <span>Agregá un producto <span className="italic text-error-msg font-semibold">nuevo</span> a la lista...</span>
              </li>
            </Link>
            
            {!emptyHistorial && (
              <Link href="/historial">
                <li className="p-2 px-4 text-center flex items-center gap-2 rounded-xl bg-accent shadow-lg">
                  <LiaHandPointRightSolid size={18} />
                  <span>Agregá un producto <span className="italic text-error-msg font-semibold">histórico</span> a la lista...</span>
                </li>
              </Link>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}
