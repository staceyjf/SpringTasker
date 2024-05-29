import { FieldErrors, Controller, Control } from "react-hook-form";
import { useContext } from "react";
import { ColoursContext } from "../../context/ColourContextProvider";
import { TodoFormData } from "./TodoSchema";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import {
  Button,
  Switch,
  MenuItem,
  Select,
  TextField,
  Box,
  FormLabel,
  FormControlLabel,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

interface TodoFormProps {
  handleFormSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>;
  errors: FieldErrors<TodoFormData>;
  control: Control<TodoFormData>;
  defaultValues: TodoFormData;
  mode: string;
}

const TodoForm = ({
  handleFormSubmit,
  errors,
  control,
  defaultValues,
  mode,
}: TodoFormProps) => {
  const { colours } = useContext(ColoursContext);

  return (
    <form onSubmit={handleFormSubmit}>
      <Box display="flex" flexDirection="column">
        <FormControl>
          <FormLabel htmlFor="titleInput">Title</FormLabel>
          <Controller
            name="title"
            control={control}
            defaultValue={defaultValues.title}
            render={({ field }) => (
              <TextField
                {...field}
                id="titleInput"
                multiline
                variant="standard"
                fullWidth
                onClick={() => field.onChange("")}
              />
            )}
          />
          <FormHelperText error>
            {errors?.title?.message ?? "\u00A0"}
          </FormHelperText>
        </FormControl>

        <FormControl>
          <FormLabel htmlFor="taskInput">Task details</FormLabel>
          <Controller
            name="task"
            control={control}
            defaultValue={defaultValues.task}
            render={({ field }) => (
              <TextField
                {...field}
                id="taskInput"
                multiline
                variant="standard"
                fullWidth
                onClick={() => field.onChange("")}
              />
            )}
          />
          <FormHelperText error>
            {errors?.task?.message ?? "\u00A0"}
          </FormHelperText>
        </FormControl>

        <FormControl>
          <FormLabel>Due date</FormLabel>
          <Controller
            name="dueDate"
            control={control}
            defaultValue={defaultValues.dueDate}
            render={({ field }) => (
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  // slotProps={{ textField: { variant: "outlined", size: "small" } }}
                  value={dayjs(field.value)}
                  onChange={(date) => {
                    field.onChange(dayjs(date).format("YYYY-MM-DD"));
                  }}
                />
              </LocalizationProvider>
            )}
          />
          <FormHelperText error>
            {errors?.dueDate?.message ?? "\u00A0"}
          </FormHelperText>
        </FormControl>

        <FormControl>
          <FormLabel htmlFor="isComplete">Task Status</FormLabel>
          <Controller
            name="isComplete"
            control={control}
            defaultValue={defaultValues.isComplete}
            render={({ field }) => (
              <FormControlLabel
                control={
                  <Switch
                    id="isComplete"
                    checked={field.value}
                    onChange={(e) => field.onChange(e.target.checked)}
                    disableRipple
                  />
                }
                label="Task Completed"
              />
            )}
          />
          <FormHelperText error>
            {errors?.isComplete?.message ?? "\u00A0"}
          </FormHelperText>
        </FormControl>

        <FormControl>
          <FormLabel>Colour categorization</FormLabel>
          <Controller
            name="colourId"
            control={control}
            defaultValue={defaultValues.colourId}
            render={({ field }) => (
              <Select
                id="colourInput"
                value={field.value || ""}
                onChange={field.onChange}
              >
                {colours.map((colour) => (
                  <MenuItem key={colour.id} value={colour.id}>
                    {colour.name}
                  </MenuItem>
                ))}
              </Select>
            )}
          />
          <FormHelperText error>
            {errors?.colourId?.message ?? "\u00A0"}
          </FormHelperText>
        </FormControl>

        <Button type="submit">{mode} Todo</Button>
      </Box>
    </form>
  );
};

export default TodoForm;
