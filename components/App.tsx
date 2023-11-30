"use client";
import { QueryClient, QueryClientProvider } from "react-query";
import Header from "./header/Header";
import Sidebar from "./sidebar/Sidebar";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      cacheTime: 1000 * 60 * 60 * 24,
      staleTime: 5 * 60 * 1000,
    },
  },
});

const App = ({ children }: { children: React.ReactNode }) => {
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
};

export default App;
