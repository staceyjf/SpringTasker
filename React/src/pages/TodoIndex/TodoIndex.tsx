import { useEffect, useState } from "react";
import { getAllTodos, deleteTodoById } from "../../services/todo-services";
import { TodoResponse } from "../../services/api-responses.interfaces";

import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import StatusMessageBox from "../../components/StatusMessageBox/StatusMessageBox";
import TodoCard from "../../components/TodoCard/TodoCard";
import DeleteConfirmationModel from "../../components/DeleteConfirmationModal/DeleteConfirmationModel";

const TodoIndex = () => {
  const [todos, setTodos] = useState<TodoResponse[]>([]);
  const [error, setError] = useState<Error | null>(null);
  const [fetchStatus, setFetchStatus] = useState<String>("LOADING");
  const [openModal, setOpenModal] = useState(false);
  const [todoId, setTodoId] = useState<number | undefined>(undefined);

  // get all todos
  useEffect(() => {
    getAllTodos()
      .then((data) => {
        console.log(data);
        setFetchStatus("SUCCESS");
        setTodos(data);
      })
      .catch((e: Error) => {
        setError(e);
        setFetchStatus("FAILED");
        console.error(e);
      });
  }, []);

  const handleDelete = (id: number | undefined) => {
    if (id !== undefined) {
      deleteTodoById(id)
        .then(() => {
          setTodos(todos.filter((item) => item.id !== id));
        })
        .catch((e: Error) => {
          setError(e);
          console.error(e);
        });
      setOpenModal(false);
    } else {
      console.error("Id is undefined");
      // TASK: Add some user UX for issues
    }
  };

  const handleEdit = () => {
    alert("update me");
  };

  return (
    <main>
      {fetchStatus === "LOADING" && <LoadingSpinner />}
      {fetchStatus === "FAILED" && (
        <StatusMessageBox severity="error" message={error?.message} />
      )}
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
            colourName={todo.colour.name}
            setTodoId={setTodoId}
            setOpenModal={setOpenModal}
          />
        ))}
      {openModal && (
        <DeleteConfirmationModel
          todoId={todoId}
          openModal={openModal}
          setOpenModal={setOpenModal}
          handleDelete={handleDelete}
        />
      )}
    </main>
  );
};

export default TodoIndex;
