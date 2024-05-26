import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { TodoFormData } from "../../components/TodoForm/TodoSchema";
import { getTodoById, updateTodoById } from "../../services/todo-services";
import { schema } from "../../components/TodoForm/TodoSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import TodoForm from "../../components/TodoForm/TodoForm";

const UpdateTodoPage = () => {
  const navigate = useNavigate();
  const { id: idParam } = useParams();
  const todoId = Number(idParam);
  const [defaultValues, setDefaultValues] = useState<
    TodoFormData | undefined
  >();
  const [error, setError] = useState<Error | null>(null);
  const [fetchStatus, setFetchStatus] = useState<String>("LOADING");

  useEffect(() => {
    getTodoById(todoId)
      .then((data) => {
        setFetchStatus("SUCCESS");
        const newDefaultValues = {
          title: data.title,
          task: data.task,
          dueDate: data.dueDate,
          isComplete: data.isComplete,
          colourId: data.colour.id.toString(),
        };
        setDefaultValues(newDefaultValues);
        reset(newDefaultValues);
      })
      .catch((e: Error) => {
        setError(e);
        setFetchStatus("FAILED");
        console.error(e);
      });
  }, []);

  // indicates the shape of the form data
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TodoFormData>({
    defaultValues: defaultValues,
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<TodoFormData> = (data) => {
    if (isNaN(todoId)) {
      console.error("Invalid Id");
      //TASK: update with UI
      return;
    }

    updateTodoById(todoId, data)
      .then((data) => {
        console.log("Todo updated", data);
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
      <h1>Edit {defaultValues?.title}</h1>
      {/* TASK: Fix this to error message component */}
      {error && <p>Error: {error.message}</p>}
      <TodoForm
        handleFormSubmit={handleSubmit(onSubmit)}
        errors={errors}
        register={register}
        mode="Edit"
      />
    </div>
  );
};

export default UpdateTodoPage;
