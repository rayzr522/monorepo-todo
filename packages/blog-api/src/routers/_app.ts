import { t } from "../trpc";
import { postsRouter } from "./posts";

export const appRouter = t.router({
  posts: postsRouter,
});

export type AppRouter = typeof appRouter;
