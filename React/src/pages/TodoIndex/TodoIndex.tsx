import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getAllTodos,
  deleteTodoById,
  updateTodoById,
} from "../../services/todo-services";
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

  console.log(todos);

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

  const handleTodoDelete = async (id: number | undefined) => {
    try {
      if (id !== undefined) {
        await deleteTodoById(id);
        setTodos(todos.filter((item) => item.id !== id));
        setOpenModal(false);
      } else {
        console.error("Id is undefined for deleting a todo by id");
        throw new Error(`Unable to delete todo with id: ${id}`);
        // TASK: Add some user UX for issues
      }
    } catch (e: any) {
      setError(e);
      console.error(e);
    }
  };

  const deleteTodoOnClick = (id: number | undefined) => {
    if (id !== undefined) {
      setTodoId(id);
      setOpenModal(true);
    } else {
      console.error("Id is undefined for deleting a todo by id");
      throw new Error(`Unable to find todo with: ${id}`);
      // TASK: Add some user UX for issues
    }
  };

  const handleTodoEdit = (id: number | undefined) => {
    if (id !== undefined) {
      navigate(`/todo/edit/${id}`);
    } else {
      console.error("Id is undefined for updating a todo by id");
      throw new Error(`Unable to update todo with id: ${id}`);
      // TASK: Add some user UX for issues
    }
  };

  // const handleIsComplete = async (id: number | undefined, data: TodoResponse) => {
  //   try {
  //     if (id !== undefined) {
  //       await updateTodoById(id, data);
  //       setTodos
  //     } else {
  //       console.error("Id is undefined for deleting a todo by id");
  //       throw new Error(`Unable to delete todo with id: ${id}`);
  //       // TASK: Add some user UX for issues
  //     }
  //   } catch (e: any) {
  //     setError(e);
  //     console.error(e);
  //   }
  // };

  return (
    <section style={{ width: "80%" }}>
      {fetchStatus === "LOADING" && <LoadingSpinner />}
      {fetchStatus === "FAILED" && (
        <StatusMessageBox severity="error" message={error?.message} />
      )}
      {fetchStatus === "SUCCESS" && (
        <>
          <h1 style={{ margin: "0 0 0.5rem 0", fontSize: "2em" }}>
            CURRENT TODOS
          </h1>
          {todos.map((todo: TodoResponse) => (
            <TodoCard
              key={todo.id}
              id={todo.id}
              createdAt={todo.createdAt}
              dueDate={todo.dueDate}
              title={todo.title}
              task={todo.task}
              isComplete={todo.isComplete}
              colourHexCode={todo.colour.hexCode}
              deleteOnClick={deleteTodoOnClick}
              handleEdit={handleTodoEdit}
            />
          ))}
        </>
      )}
      {openModal && (
        <DeleteConfirmationModel
          todoId={todoId}
          openModal={openModal}
          setOpenModal={setOpenModal}
          handleDelete={handleTodoDelete}
        />
      )}
    </section>
  );
};

export default TodoIndex;
