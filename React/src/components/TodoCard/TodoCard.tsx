import Button from "@mui/material/Button";

// define the props
interface TodoCardProps {
  id: number | undefined;
  createdAt: string;
  dueDate?: string;
  title: string;
  task: string;
  isComplete: boolean;
  colourName?: string; // optional
  setTodoId: (id: number) => void;
  setOpenModal: (open: boolean) => void;
}

const TodoCard = ({
  id,
  createdAt,
  dueDate,
  title,
  task,
  isComplete,
  colourName,
  setTodoId,
  setOpenModal,
}: TodoCardProps) => {
  const handleClick = () => {
    if (id !== undefined) {
      setTodoId(id);
      setOpenModal(true);
    } else {
      console.error("id is undefined");
      // TASK: ADD SOME ERROR MESSAGING
    }
  };

  return (
    <div>
      {id}
      {createdAt}
      {dueDate}
      {title}
      {task}
      {isComplete}
      {colourName}
      <Button variant="outlined" onClick={handleClick}>
        x
      </Button>
    </div>
  );
};

export default TodoCard;
