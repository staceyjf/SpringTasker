import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { TodoFormData } from "../../components/TodoForm/TodoSchema";
import { getTodoById, updateTodoById } from "../../services/todo-services";
import { schema } from "../../components/TodoForm/TodoSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import TodoForm from "../../components/TodoForm/TodoForm";
import { Alert, Backdrop, Box, Skeleton, Snackbar } from "@mui/material";

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
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TodoFormData>({
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
    <Box width="100%">
      {fetchStatus === "LOADING" && (
        <>
          <Box
            display="flex"
            flexDirection="column"
            rowGap="0.5rem"
            justifyContent="center"
          >
            <Skeleton />
            <Skeleton width="60%" />
            <Skeleton variant="rounded" width="100%" height={60}></Skeleton>
            <Skeleton variant="rounded" width="100%" height={60}></Skeleton>
            <Skeleton variant="rounded" width="100%" height={60}></Skeleton>
          </Box>
        </>
      )}
      {fetchStatus === "FAILED" && (
        <Backdrop open={true} sx={{ color: "#fff", zIndex: 1 }}>
          <Snackbar open={true} autoHideDuration={3000}>
            <Alert severity="error" variant="filled" sx={{ width: "100%" }}>
              {error?.message}
            </Alert>
          </Snackbar>
        </Backdrop>
      )}
      {fetchStatus === "SUCCESS" && (
        <>
          <h2>Edit `{defaultValues?.title}` Todo</h2>
          {/* TASK: Fix this to error message component */}
          {error && <p>Error: {error.message}</p>}
          {defaultValues && (
            <TodoForm
              handleFormSubmit={handleSubmit(onSubmit)}
              errors={errors}
              control={control}
              defaultValues={defaultValues}
              mode="Edit"
            />
          )}
        </>
      )}
    </Box>
  );
};

export default UpdateTodoPage;
