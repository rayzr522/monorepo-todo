import { api } from "../trpc";

export default function ListPosts() {
  const { data: posts } = api.blog.posts.list.useQuery();

  return (
    <>
      <h1>Posts</h1>
      <ul>
        {posts?.map((post) => (
          <li key={post.id}>
            <a href={`/posts/${post.id}`}>{post.title}</a>
          </li>
        ))}
      </ul>
    </>
  );
}
