import { randomUUID } from "crypto";
import { z } from "zod";
import { Post } from "../data/posts";
import { t } from "../trpc";

const posts: Post[] = [];

export const postsRouter = t.router({
  list: t.procedure.query(() => posts),
  add: t.procedure.input(Post.omit({ id: true })).mutation(({ input }) => {
    const post = {
      // TODO: this is because the typings are from @types/node which isn't necessarily a dep for consumers. how do we fix that?
      id: randomUUID() as string,
      ...input,
    };
    posts.push(post);
    return post;
  }),
  find: t.procedure.input(z.string().uuid()).query(({ input }) => {
    return posts.find((post) => post.id === input);
  }),
});
