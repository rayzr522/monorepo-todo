import { QueryClient } from "@tanstack/react-query";
import { createTRPCReact } from "@trpc/react-query";
import type { AppRouter } from "todo-api";

export const todoApi = createTRPCReact<AppRouter>();

export const queryClient = new QueryClient();