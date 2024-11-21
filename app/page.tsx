import Link from "next/link";
import { LiaClipboardListSolid } from "react-icons/lia";


export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center ">
      <main className="flex flex-col gap-8 items-center">
      <LiaClipboardListSolid size={150} />
        <h1 className="font-bold text-center  text-3xl" style={{ fontFamily: 'var(--font-sour-gummy)' }}>¡No te olvides nada!</h1>
        <div className="flex flex-col min-w-9/12 p-8">
          <span className="bg-secondary text-center font-bold border border-primary p-2 rounded-md">¡Comenzá ahora!</span>
          <div className="mt-4 w-full">
          <ul className="flex flex-col gap-2">
            <Link href='/add' ><li className="bg-tertiary shadow-lg p-2 px-4 text-center rounded-xl">Agregá un producto a la lista...</li></Link>
            <Link href='/categories' ><li className="bg-tertiary shadow-lg p-2 px-4 text-center rounded-xl">Creá una categoría de productos...</li></Link>
          </ul>
          </div>
        </div>
      </main>
    </div>
  );
}
