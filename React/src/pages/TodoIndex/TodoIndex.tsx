import { useEffect, useState } from "react";
import { getAllTodos } from "../../services/todo-services";
import { TodoResponse } from "../../services/api-responses.interfaces";

import TodoCard from "../../components/TodoCard/TodoCard";

const TodoIndex = () => {
  const [todos, setTodos] = useState<TodoResponse[]>([]);
  const [error, setError] = useState<Error | null>(null);
  const [fetchStatus, setFetchStatus] = useState<String>("LOADING");

  useEffect(() => {
    getAllTodos()
      .then((data) => {
        setFetchStatus("SUCCESS");
        setTodos(data);
      })
      .catch((e: Error) => {
        setError(e);
        setFetchStatus("FAILED");
        console.warn(e);
      });
  }, []);
  return (
    <main>
      {/* {fetchStatus === "LOADING" && <LoadingSpinner />} */}
      {/* {fetchStatus === "FAILED" && (
        <StatusMessageBox severity="error" message={error?.message} />
      )} */}
      {fetchStatus === "SUCCESS" &&
        todos.map((todo: TodoResponse) => (
          <TodoCard
            key={todo.id}
            id={todo.id}
            createdAt={todo.createdAt}
            dueDate={todo.dueDate}
            title={todo.title}
            task={todo.task}
            isComplete={todo.isComplete}
            colour={todo.colour}
          />
        ))}
    </main>
  );
};

export default TodoIndex;
