import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@styles/globals.css";
import Header from "@components/header/Header";
import Sidebar from "@components/sidebar/Sidebar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Mainstack",
  description: "A mainstack dashboard",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <Header />
        <Sidebar />
        <div className="mt-16 flex flex-col items-center">{children}</div>
      </body>
    </html>
  );
}
