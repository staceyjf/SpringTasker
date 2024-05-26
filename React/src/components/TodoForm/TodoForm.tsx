import { UseFormRegister, FieldErrors, useForm } from "react-hook-form";
import { useContext } from "react";
import { ColoursContext } from "../../context/ColourContextProvider";
import { TodoFormData } from "./TodoSchema";

interface TodoFormProps {
  handleFormSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>;
  errors: FieldErrors<TodoFormData>;
  register: UseFormRegister<TodoFormData>;
  mode: string;
}

const TodoForm = ({
  handleFormSubmit,
  errors,
  register,
  mode,
}: TodoFormProps) => {
  const { colours } = useContext(ColoursContext);

  return (
    <form onSubmit={handleFormSubmit}>
      <div>
        <label htmlFor="titleInput">Title</label>
        <input id="titleInput" type="text" {...register("title")} />
        <small>{errors?.title?.message ?? "\u00A0"}</small>
      </div>
      <div>
        <label htmlFor="taskInput">Task details</label>
        <textarea id="taskInput" {...register("task")}></textarea>
        <small>{errors?.task?.message ?? "\u00A0"}</small>
      </div>
      <div>
        <label htmlFor="dueDate">Due date</label>
        <input id="dueDate" type="date" {...register("dueDate")} />
        <small>{errors?.dueDate?.message ?? "\u00A0"}</small>
      </div>
      <div>
        <label htmlFor="isComplete">Task complete</label>
        <input id="isComplete" type="checkbox" {...register("isComplete")} />
        <small>{errors?.isComplete?.message ?? "\u00A0"}</small>
      </div>
      <div>
        <div>
          <label htmlFor="colourInput">Colour categorization</label>
          <select id="colourInput" {...register("colourId")}>
            {colours.map((colour) => (
              <option key={colour.id} value={colour.id}>
                {colour.name}
              </option>
            ))}
          </select>
          <small>{errors?.colourId?.message ?? "\u00A0"}</small>
        </div>
        <button type="submit">{mode} Todo</button>
      </div>
    </form>
  );
};

export default TodoForm;
