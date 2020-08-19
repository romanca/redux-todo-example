import { useSelector } from "react-redux";

export const useTodoSelectorById = (id) =>
  useSelector((state) => state.todos.data.find((i) => i.id === id));
