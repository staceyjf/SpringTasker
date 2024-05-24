import { useEffect, useState } from "react";

const TodoIndex = () => {
  const [todos, setTodos] = useState<TodoResponse[]>([]);
  const [errors, setErrors] = useState<Error[]>([]);

  useEffect(() => {
    getAllTodos()
      .then((data) => setTodos(data))
      .catch((e) => {
        setErrors(e);
        console.warn(e);
      });
  });
  return <div></div>;
};

export default TodoIndex;
