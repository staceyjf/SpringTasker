import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();

  // get all todos
  useEffect(() => {
    getAllTodos()
      .then((data) => {
        setFetchStatus("SUCCESS");
        setTodos(data);
      })
      .catch((e: Error) => {
        setError(e);
        setFetchStatus("FAILED");
        console.error(e);
      });
  }, []);

  const handleTodoDelete = (id: number | undefined) => {
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
      console.error("Id is undefined for deleting a todo by id");
      // TASK: Add some user UX for issues
    }
  };

  const deleteTodoOnClick = (id: number | undefined) => {
    if (id !== undefined) {
      setTodoId(id);
      setOpenModal(true);
    } else {
      console.error("id is undefined");
      // TASK: ADD SOME ERROR MESSAGING
    }
  };

  const handleTodoEdit = (id: number | undefined) => {
    if (id !== undefined) {
      navigate(`/todo/edit/${id}`);
    } else {
      console.error("Id is undefined for updating a todo by id");
      // TASK: Add some user UX for issues
    }
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
            deleteOnClick={deleteTodoOnClick}
            handleEdit={handleTodoEdit}
          />
        ))}
      {openModal && (
        <DeleteConfirmationModel
          todoId={todoId}
          openModal={openModal}
          setOpenModal={setOpenModal}
          handleDelete={handleTodoDelete}
        />
      )}
    </main>
  );
};

export default TodoIndex;
