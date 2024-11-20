import "@/app/ui/global.css";
import type { Metadata } from "next";
import { MyContextProvider } from "./lib/myContext";
import NavBar from "./ui/navbar";

export const metadata: Metadata = {
  title: "ShopList",
  description: "Don´t forget anything!"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="es">
      <body>
        <MyContextProvider>
        <div className="fixed top-0 left-0 w-full z-10"><NavBar /></div>
        <div className="flex justify-center">{children}</div>
        </MyContextProvider>
      </body>
    </html>
  );
}
