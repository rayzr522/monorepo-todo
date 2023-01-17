import { z } from "zod";

export const Post = z.object({
  id: z.string().uuid(),
  title: z.string().min(1),
  content: z.string().min(1),
  author: z.string().min(1),
  createdAt: z.number(),
});
export type Post = z.infer<typeof Post>;
