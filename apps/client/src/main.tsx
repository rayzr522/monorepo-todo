import "@picocss/pico";
import { QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import HomePage from "./pages/HomePage";
import ListPosts from "./pages/ListPosts";
import NewPost from "./pages/NewPost";
import ViewPost from "./pages/ViewPost";
import { api, queryClient, trpcClient } from "./trpc";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<HomePage />} />
      <Route path="new-post" element={<NewPost />} />
      <Route path="posts">
        <Route index element={<ListPosts />} />
        <Route path=":id" element={<ViewPost />} />
      </Route>
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <api.Provider queryClient={queryClient} client={trpcClient}>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </api.Provider>
  </React.StrictMode>
);
