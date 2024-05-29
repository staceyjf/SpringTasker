import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { TodoFormData } from "../../components/TodoForm/TodoSchema";
import { createTodo } from "../../services/todo-services";
import { schema } from "../../components/TodoForm/TodoSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import TodoForm from "../../components/TodoForm/TodoForm";
import dayjs from "dayjs";

const AddTodoPage = () => {
  const navigate = useNavigate();
  const [error, setError] = useState<Error | null>(null);

  const defaultValues = {
    title: "Keep me short and sweet",
    task: "Add a task",
    dueDate: dayjs().toDate(), // Datepicker needs a dayjs obj but RHF needs a date obj
    isComplete: false,
    colourId: "",
  };

  // indicates the shape of the form data
  const {
    control,
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
    <div style={{ width: "80%" }}>
      <h1 style={{ margin: "0 0 0.5rem 0" }}>Create a new Todo task</h1>
      {/* TASK: Fix this to error message component */}
      {error && <p>Error: {error.message}</p>}
      <TodoForm
        handleFormSubmit={handleSubmit(onSubmit)}
        errors={errors}
        control={control}
        defaultValues={defaultValues}
        mode="Create"
      />
    </div>
  );
};

export default AddTodoPage;
