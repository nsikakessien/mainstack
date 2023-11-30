import "@styles/globals.css";
import { Metadata } from "next";
import App from "@components/App";

export const metadata: Metadata = {
  title: "Mainstack",
  description: "A mainstack dashboard",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <App>{children}</App>;
}
