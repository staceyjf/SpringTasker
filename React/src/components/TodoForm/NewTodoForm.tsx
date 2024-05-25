import { UseFormRegister, FieldErrors } from "react-hook-form";
import { useContext } from "react";
import { ColoursContext } from "../../context/ColourContextProvider";

import { TodoFormData } from "./TodoSchema";
interface TodoFormProps {
  handleFormSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>;
  errors: FieldErrors<TodoFormData>;
  register: UseFormRegister<TodoFormData>;
  isSubmitSuccessful: boolean;
}

const NewTodoForm = ({
  handleFormSubmit,
  errors,
  register,
  isSubmitSuccessful,
}: TodoFormProps) => {
  const { colours } = useContext(ColoursContext);

  return (
    <form onSubmit={handleFormSubmit}>
      <div>
        <label htmlFor="titleInput">Title</label>
        <input id="titleInput" type="text" {...register("title")} />
      </div>
      <div>
        <label htmlFor="taskInput">Task details</label>
        <textarea id="taskInput" {...register("task")}></textarea>
      </div>
      <div>
        <label htmlFor="dueDate">Due date</label>
        <input id="dueDate" type="date" {...register("dueDate")} />
      </div>
      <div>
        <label htmlFor="isComplete">Task complete</label>
        <input id="isComplete" type="checkbox" {...register("isComplete")} />
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
        </div>
        <button type="submit">Create Todo</button>
      </div>
    </form>
  );
};

export default NewTodoForm;
