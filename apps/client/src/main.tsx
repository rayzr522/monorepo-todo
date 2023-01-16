import "@picocss/pico";
import { QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink } from "@trpc/client";
import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import HomePage from "./pages/HomePage";
import { queryClient, todoApi } from "./trpc";

const router = createBrowserRouter(
  createRoutesFromElements(<Route path="/" element={<HomePage />} />)
);

todoApi;

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <todoApi.Provider
      queryClient={queryClient}
      client={todoApi.createClient({
        links: [
          httpBatchLink({
            url: "http://localhost:4000",
          }),
        ],
      })}
    >
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </todoApi.Provider>
  </React.StrictMode>
);
