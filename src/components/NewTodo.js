import React from "react";
import { useEditTodoDialog, useHover } from "../hooks";

const NewTodo = ({ onTodoCreated }) => {
  const { listeners, hovered } = useHover();

  const handleTodoCreation = (values) => {
    onTodoCreated(values);
  };

  const handleClick = useEditTodoDialog({ onConfirm: handleTodoCreation });

  const backgroundColor = hovered ? "lightGray" : "";

  return (
    <div
      onClick={handleClick}
      {...listeners}
      style={{
        cursor: "pointer",
        backgroundColor,
        padding: "5px 15px",
        borderRadius: 20,
      }}
    >
      <span style={{ fontWeight: "bold", fontSize: 20, marginRight: 10 }}>
        +
      </span>
      <span>Add ticket</span>
    </div>
  );
};

export default NewTodo;
