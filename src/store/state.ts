// interface for todos
export type TodoItem = {
  id: number;
  text: string;
  subtitle: string;
  completed: boolean;
};

export type State = {
  loading: boolean;
  items: TodoItem[];
};
