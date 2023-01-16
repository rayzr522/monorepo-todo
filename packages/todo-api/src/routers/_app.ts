import { t } from "../trpc";
import { todosRouter } from "./todos";

export const appRouter = t.router({
  todos: todosRouter,
});

export type AppRouter = typeof appRouter;
