export interface ColourResponse {
  id: number;
  createdAt: string;
  name: string;
  hexcode: string;
  todos: TodoResponse;
}

export interface TodoResponse {
  id: number;
  createdAt: string;
  dueDate: string;
  title: string;
  task: string;
  isComplete: boolean;
  colourId: number;
}
