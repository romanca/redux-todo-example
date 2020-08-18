import React from "react";
import Todo from "./Todo";
import NewTodo from "./NewTodo";

const TODOS = [
  {
    title: "Something",
    id: "asdsfsf1",
    label: "some label",
  },
  {
    title: "Some ",
    id: "asdsfsf2",
    label: "some label",
  },
  {
    title: " Thing",
    id: "asdsfsf3",
    label: "some label",
  },
  {
    title: " Meeting",
    id: "asdsfsf4",
    label: "some label",
  },
];

const Todos = () => {
  return (
    <div style={{ flex: 1, paddingTop: 10 }}>
      {TODOS.map((item) => (
        <Todo key={item.id} item={item} />
      ))}
      <NewTodo />
    </div>
  );
};

export default Todos;
