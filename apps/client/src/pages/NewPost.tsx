import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { api } from "../trpc";

export default function NewPost() {
  const navigate = useNavigate();
  const addPost = api.blog.posts.add.useMutation({
    onSuccess: (newPost) => navigate(`/posts/${newPost.id}`),
  });
  const { register, handleSubmit } = useForm({
    defaultValues: { title: "", author: "", content: "" },
  });

  return (
    <>
      <h1>New Post</h1>
      <form
        onSubmit={handleSubmit((data) =>
          addPost.mutate({
            ...data,
            createdAt: Date.now(),
          })
        )}
      >
        <label htmlFor="title">
          Title
          <input
            type="text"
            placeholder="My amazing post"
            {...register("title", { required: true })}
          />
        </label>
        <label htmlFor="author" placeholder="Jane Doe">
          Author
          <input type="text" {...register("author", { required: true })} />
        </label>
        <label htmlFor="content" placeholder="I am so cool :3">
          Content
          <textarea {...register("content", { required: true })} />
        </label>
        <button type="submit">Save</button>
      </form>
    </>
  );
}
