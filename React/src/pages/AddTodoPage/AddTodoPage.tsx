import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { TodoFormData } from "../../components/TodoForm/TodoSchema";
import { createTodo } from "../../services/todo-services";
import { schema } from "../../components/TodoForm/TodoSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import TodoForm from "../../components/TodoForm/TodoForm";

const AddTodoPage = () => {
  const navigate = useNavigate();
  const [error, setError] = useState<Error | null>(null);

  const defaultValues = {
    title: "Keep me short and sweet",
    task: "Add a task",
    dueDate: new Date().toISOString().split("T")[0], // get YYYY-MM-DD format for the date picker
    isComplete: false,
    colourId: "2",
  };

  // indicates the shape of the form data
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TodoFormData>({ defaultValues, resolver: zodResolver(schema) });

  const onSubmit: SubmitHandler<TodoFormData> = (data) => {
    createTodo(data)
      .then((data) => {
        console.log("Todo created", data);
        navigate("/todo");
        reset(defaultValues);
      })
      .catch((e: Error) => {
        setError(e);
        console.warn(e);
      });
  };

  return (
    <div>
      <h1>Create a new Todo task</h1>
      {/* TASK: Fix this to error message component */}
      {error && <p>Error: {error.message}</p>}
      <TodoForm
        handleFormSubmit={handleSubmit(onSubmit)}
        errors={errors}
        register={register}
        mode="Create"
      />
    </div>
  );
};

export default AddTodoPage;
