import "@/app/ui/global.css";
import type { Metadata, Viewport } from "next";
import { MyContextProvider } from "./lib/myContext";
import NavBar from "./ui/navbar";

export const metadata: Metadata = {
  title: "ShopList",
  description: "Don´t forget anything",
  manifest: "/manifest.json",
};

export const viewport: Viewport = {
  themeColor: "#140374",
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
