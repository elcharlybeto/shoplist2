import Image from "next/image";


export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center ">
      <main className="flex flex-col gap-8 items-center">
        <Image src='/img/shopping-cart.svg' width={150} height={150} alt="carrito"/>
        <h1 className="font-bold text-3xl">Don´t U forget anything!</h1>
      </main>
    </div>
  );
}
