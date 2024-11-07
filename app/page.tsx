import { TiShoppingCart } from "react-icons/ti";

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center ">
      <main className="flex flex-col gap-8 items-center">
        <TiShoppingCart size={150} />
        <h1 className="font-bold text-3xl">Don´t forget anything!</h1>
      </main>
    </div>
  );
}
