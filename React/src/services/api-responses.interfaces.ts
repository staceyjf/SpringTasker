export interface ColourResponse {
  id: number;
  createdAt: string;
  name: string;
  hexCode: string;
  todos: TodoResponse[];
}

export interface TodoResponse {
  id: number;
  createdAt: string;
  dueDate: string;
  title: string;
  task: string;
  isComplete: boolean;
  colour: ColourResponse;
}
