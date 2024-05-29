import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { TodoFormData } from "../../components/TodoForm/TodoSchema";
import { createTodo } from "../../services/todo-services";
import { schema } from "../../components/TodoForm/TodoSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import TodoForm from "../../components/TodoForm/TodoForm";
import { Alert, Backdrop, Snackbar } from "@mui/material";

const AddTodoPage = () => {
  const navigate = useNavigate();
  const [error, setError] = useState<Error | null>(null);

  const defaultValues = {
    title: "Keep me short and sweet",
    task: "Add a task",
    dueDate: new Date().toISOString(), // convert to a string with the relevant format
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

  const onSubmit: SubmitHandler<TodoFormData> = async (data) => {
    try {
      console.log(data);
      const response = await createTodo(data);
      console.log("Todo created", response);
      navigate("/todo");
      reset(defaultValues);
      setError(null);
    } catch (e) {
      setError(new Error("Failed to submit your new todo. Please try again."));
      console.error(e);
    }
  };

  return (
    <div style={{ width: "80%" }}>
      <h1 style={{ margin: "0 0 0.5rem 0" }}>Create a new Todo task</h1>
      {error && (
        <Backdrop open={true} sx={{ color: "#fff", zIndex: 1 }}>
          <Snackbar
            open={true}
            autoHideDuration={6000}
            onClose={() => setError(null)}
          >
            <Alert
              severity="error"
              variant="filled"
              sx={{ width: "100%" }}
              aria-live="assertive"
            >
              {error?.message}
            </Alert>
          </Snackbar>
        </Backdrop>
      )}
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
