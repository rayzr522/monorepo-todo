import { useForm } from "react-hook-form";
import { api } from "../trpc";

export default function HomePage() {
  const ctx = api.useContext();
  const { data: todos } = api.todo.todos.list.useQuery();
  const addTodo = api.todo.todos.add.useMutation({
    onSuccess: (newTodo) => {
      ctx.todo.todos.list.setData(undefined, (todos) =>
        todos ? [...todos, newTodo] : [newTodo]
      );
      return ctx.todo.todos.list.invalidate();
    },
  });
  const toggleTodo = api.todo.todos.toggle.useMutation({
    onSuccess: (newTodo) => {
      ctx.todo.todos.list.setData(undefined, (todos) =>
        todos
          ? todos.map((todo) => (todo.id === newTodo.id ? newTodo : todo))
          : [newTodo]
      );
      return ctx.todo.todos.list.invalidate();
    },
  });

  const { register, handleSubmit, reset } = useForm({
    defaultValues: { name: "" },
  });

  const onSubmit = useMemo(
    () =>
      handleSubmit(async (data) => {
        reset();
        addTodo.mutate(data.name);
      }),
    []
  );

  return (
    <>
      <h1>Home</h1>
      <p>Welcome to the home page.</p>
      <form onSubmit={onSubmit}>
        <input type="text" {...register("name")} />
        <button
          type="submit"
          aria-busy={addTodo.isLoading}
          disabled={addTodo.isLoading}
        >
          Add
        </button>
      </form>
      <ul
        style={{
          padding: "0",
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
        }}
      >
        {todos?.map((todo) => (
          <li
            key={todo.id}
            style={{
              listStyle: "none",
              borderBottom: "1px solid rgba(255, 255, 255, 0.25)",
              paddingBlock: "0.5rem",
            }}
          >
            <b>{todo.name}</b>
            <label htmlFor="complete">
              Complete{" "}
              <input
                type="checkbox"
                role="switch"
                name="complete"
                checked={todo.complete}
                onChange={() => toggleTodo.mutate(todo.id)}
              />
            </label>
          </li>
        ))}
      </ul>
    </>
  );
}
