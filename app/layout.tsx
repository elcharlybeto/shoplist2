import { geistMono, geistSans } from "@/app/ui/fonts";
import "@/app/ui/global.css";
import type { Metadata } from "next";
import NavBar from "./ui/navbar";
import { MyContextProvider } from "./lib/myContext";

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
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <MyContextProvider>
        <div className="fixed top-0 left-0 w-full z-10"><NavBar /></div>
        <div className="flex justify-center">{children}</div>
        </MyContextProvider>
      </body>
    </html>
  );
}
