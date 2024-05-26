import { TodoFormData } from "../components/TodoForm/TodoSchema";
import { baseUrl } from "./api-config";
import { TodoResponse } from "./api-responses.interfaces";

export const getAllTodos = async (): Promise<TodoResponse[]> => {
  const response: Response = await fetch(baseUrl + "/todos");
  if (!response.ok) {
    console.warn(response.status);
    throw new Error("Failed to fetch all Todos. Please try again later");
  }
  return await response.json();
};

export const getTodoById = async (id: number): Promise<TodoResponse> => {
  const response = await fetch(`${baseUrl}/todos/${id}`);

  if (!response.ok) {
    console.warn(response.status);
    throw new Error(
      `Failed to fetch Todo with id: ${id}. Please try again later`
    );
  }
  return await response.json();
};

export const createTodo = async (data: TodoFormData): Promise<TodoResponse> => {
  const response = await fetch(baseUrl + "/todos", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    console.warn(response.status);
    throw new Error(
      "Oops, something went wrong while trying to create a new Todo. Please try again."
    );
  }
  return await response.json();
};

// export const updateTodo = async (id: number, data:TodoResponse): Promise<TodoResponse> => {
//   const response = await fetch(`${baseUrl}/todos/${id}`, {
//     method: "PATCH",
//     body: JSON.stringify(data),
//     headers: {
//       "Content-Type": "application/json",
//     },
//   });
//   if (!response.ok) {
//     console.warn(response.status);
//     throw new Error(`Oops, something went wrong while trying to update Todo with id: ${id}. Please try again.`);
//   }
//   return await response.json();
// };

export const deleteTodoById = async (id: number) => {
  const response = await fetch(`${baseUrl}/todos/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (response.status !== 204) {
    // Spring is sending back a 204 No Content HTTP request
    console.warn(response.status);
    throw new Error(
      `Oops, something went wrong while trying to delete Todo with id: ${id}. Please try again.`
    );
  }
};
