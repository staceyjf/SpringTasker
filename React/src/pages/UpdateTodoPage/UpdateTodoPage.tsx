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
  const [openSnackbar, setOpenSnackbar] = useState(false);

  useEffect(() => {
    getTodoById(todoId)
      .then((data) => {
        setFetchStatus("SUCCESS");
        const newDefaultValues = {
          title: data.title,
          task: data.task,
          dueDate: data.dueDate.toISOString(), // convert to the relevant DatePicker format
          isComplete: data.isComplete,
          colourId: data.colour.id.toString(),
        };
        setDefaultValues(newDefaultValues);
        reset(newDefaultValues);
      })
      .catch((e: Error) => {
        setError(new Error("Failed to update your todo. Please try again."));
        setOpenSnackbar(true);
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
      throw new Error("");
    }

    updateTodoById(todoId, data)
      .then((data) => {
        navigate("/todo");
        reset(defaultValues);
      })
      .catch((e: Error) => {
        setError(
          new Error("Failed to submit your edited todo. Please try again.")
        );
        setOpenSnackbar(true);
        console.error();
        e;
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
        <Backdrop open={openSnackbar} sx={{ color: "#fff", zIndex: 1 }}>
          <Snackbar
            open={openSnackbar}
            autoHideDuration={6000}
            onClose={() => {
              setError(null);
              setOpenSnackbar(false);
            }}
          >
            <Alert severity="error" variant="filled" sx={{ width: "100%" }}>
              {error?.message}
            </Alert>
          </Snackbar>
        </Backdrop>
      )}
      {fetchStatus === "SUCCESS" && (
        <>
          <h1>Edit `{defaultValues?.title}` Todo</h1>
          {error && (
            <Backdrop open={true} sx={{ color: "#fff", zIndex: 1 }}>
              <Snackbar open={true} autoHideDuration={6000}>
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
