import { ColourResponse } from "../../services/api-responses.interfaces";

// define the props
interface TodoCardProps {
  id: number;
  createdAt: string;
  dueDate?: string;
  title: string;
  task: string;
  isComplete: boolean;
  colour?: ColourResponse; // optional
}

const TodoCard = ({
  id,
  createdAt,
  dueDate,
  title,
  task,
  isComplete,
  colour,
}: TodoCardProps) => {
  return (
    <div>
      {id}
      {createdAt}
      {dueDate}
      {title}
      {task}
      {isComplete}
      {colour && colour.name}
    </div>
  );
};

export default TodoCard;
