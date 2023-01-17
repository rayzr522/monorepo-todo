// wrap in a function to avoid actually executing the code
const apiRouter = async () => {
  const trpc = (await import("@trpc/server")).initTRPC.create({
    isServer: true,
  });

  return trpc.router({
    blog: (await import("blog-api")).appRouter,
    todo: (await import("todo-api")).appRouter,
  });
};

export type ApiRouter = Awaited<ReturnType<typeof apiRouter>>;

export const isValidApiBase = (
  base: string
): base is keyof typeof apiEndpoints => {
  return base in apiEndpoints;
};

export const apiEndpoints = {
  blog: "http://localhost:4001",
  todo: "http://localhost:4000",
} as const;
