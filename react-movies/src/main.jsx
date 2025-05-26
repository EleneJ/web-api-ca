import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { AuthProvider } from "./contexts/AuthContext";
import { BrowserRouter } from "react-router-dom";

const globalStyles = {
  margin: "0",
  padding: "0",
  backgroundColor: "black",
  color: "white",
  minHeight: "100vh",
  width: "100vw",
};

document.body.style = Object.entries(globalStyles)
  .map(([key, value]) => `${key}: ${value}`)
  .join("; ");

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 360000,
      refetchInterval: 360000,
      refetchOnWindowFocus: false,
    },
  },
});

const root = createRoot(document.getElementById("root"));
root.render(
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
    <ReactQueryDevtools initialIsOpen={false} />
  </QueryClientProvider>
);