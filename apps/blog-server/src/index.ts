import { createHTTPServer } from "@trpc/server/adapters/standalone";
import { appRouter } from "blog-api";

const NODE_PORT = 4001;

createHTTPServer({
  router: appRouter,
  responseMeta() {
    return {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Request-Method": "*",
        "Access-Control-Allow-Methods": "OPTIONS, GET",
        "Access-Control-Allow-Headers": "*",
      },
      status: 200,
    };
  },
}).listen(NODE_PORT);

console.log(`listening on http://localhost:${NODE_PORT}`);
