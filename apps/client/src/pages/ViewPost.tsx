import { useParams } from "react-router-dom";
import { api } from "../trpc";

export default function ViewPost() {
  const { id } = useParams();
  const { data: post } = api.blog.posts.find.useQuery(id!, { enabled: !!id });

  return !post ? (
    <>Loading...</>
  ) : (
    <>
      <h1>{post.title}</h1>
      <hr />
      <em>
        {post.author} - {new Date(post.createdAt).toLocaleDateString()}
      </em>
      <hr />

      <p>{post.content}</p>
    </>
  );
}
