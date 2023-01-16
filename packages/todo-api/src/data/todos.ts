import { z } from "zod";

export const Todo = z.object({
  id: z.string().uuid(),
  name: z.string().min(1),
  complete: z.boolean().default(false),
});
export type Todo = z.infer<typeof Todo>;
