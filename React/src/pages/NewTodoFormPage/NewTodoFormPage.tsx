import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { TodoFormData } from "../../components/TodoForm/TodoSchema";
import { createTodo } from "../../services/todo-services";
import { schema } from "../../components/TodoForm/TodoSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import NewTodoForm from "../../components/TodoForm/NewTodoForm";

const NewTodoFormPage = () => {
  const navigate = useNavigate();
  const [error, setError] = useState<Error | null>(null);

  // indicates the shape of the form data
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
  } = useForm<TodoFormData>({ resolver: zodResolver(schema) });

  const onSubmit: SubmitHandler<TodoFormData> = (data) => {
    createTodo(data)
      .then((data) => {
        console.log("Todo created", data);
        navigate("/");
      })
      .catch((e: Error) => {
        setError(e);
        console.warn(e);
      });
  };

  return (
    <div>
      <h1>Create a new Todo task</h1>
      {error && <p>Error: {error.message}</p>}
      <NewTodoForm
        handleFormSubmit={handleSubmit(onSubmit)}
        errors={errors}
        register={register}
        isSubmitSuccessful={isSubmitSuccessful}
      />
    </div>
  );
};

export default NewTodoFormPage;
