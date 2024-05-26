import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";

// define the props
interface TodoCardProps {
  id: number | undefined;
  createdAt: string;
  dueDate?: string;
  title: string;
  task: string;
  isComplete: boolean;
  colourName?: string; // optional
  deleteOnClick: (id: number | undefined) => void;
  handleEdit: (id: number | undefined) => void;
}

const TodoCard = ({
  id,
  createdAt,
  dueDate,
  title,
  task,
  isComplete,
  colourName,
  deleteOnClick,
  handleEdit,
}: TodoCardProps) => {
  return (
    <div>
      {id}
      {createdAt}
      {dueDate}
      {title}
      {task}
      {isComplete}
      {colourName}
      <Button variant="outlined" onClick={() => handleEdit(id)}>
        Update
      </Button>
      <Button variant="outlined" onClick={() => deleteOnClick(id)}>
        <DeleteIcon />
      </Button>
    </div>
  );
};

export default TodoCard;
