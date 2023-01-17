import { QueryClient } from "@tanstack/react-query";
import { createTRPCReact, httpBatchLink } from "@trpc/react-query";
import { apiEndpoints, ApiRouter, isValidApiBase } from "./router";

export const api = createTRPCReact<ApiRouter>();
export const trpcClient = api.createClient({
  links: [
    (runtime) => {
      return (ctx) => {
        const [base, ...path] = ctx.op.path.split(".");
        if (!base || !isValidApiBase(base)) {
          throw new Error(`Invalid procedure path: ${ctx.op.path}`);
        }

        return httpBatchLink({ url: apiEndpoints[base] })(runtime)({
          ...ctx,
          op: {
            ...ctx.op,
            path: path.join("."),
          },
        });
      };
    },
  ],
});

export const queryClient = new QueryClient();
