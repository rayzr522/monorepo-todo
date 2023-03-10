import { TRPCError } from "@trpc/server";
import { randomUUID } from "crypto";
import { z } from "zod";
import { Todo } from "../data/todos";
import { t } from "../trpc";

const todos: Todo[] = [];

export const todosRouter = t.router({
  list: t.procedure.query(() => todos),
  add: t.procedure.input(z.string().min(1)).mutation(({ input }) => {
    const todo = {
      // TODO: this is because the typings are from @types/node which isn't necessarily a dep for consumers. how do we fix that?
      id: randomUUID() as string,
      name: input,
      complete: false,
    };
    todos.push(todo);
    return todo;
  }),
  toggle: t.procedure.input(z.string().uuid()).mutation(({ input }) => {
    const todo = todos.find((todo) => todo.id === input);
    if (!todo) {
      throw new TRPCError({ code: "NOT_FOUND", message: "Todo not found" });
    }
    todo.complete = !todo.complete;
    return todo;
  }),
});
