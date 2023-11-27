"use client";
import { Inter } from "next/font/google";
import "@styles/globals.css";
import Header from "@components/header/Header";
import Sidebar from "@components/sidebar/Sidebar";
import { QueryClient, QueryClientProvider } from "react-query";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        cacheTime: 1000 * 60 * 60 * 24,
        staleTime: 5 * 60 * 1000,
      },
    },
  });
  return (
    <QueryClientProvider client={queryClient}>
      <html lang="en">
        <body className={`${inter.className} antialiased`}>
          <Header />
          <Sidebar />
          <div className="mt-16 flex flex-col">{children}</div>
        </body>
      </html>
    </QueryClientProvider>
  );
}
