import React, { useState } from "react";
import { useEditTodoDialog } from "../hooks";

const NewTodo = () => {
  const [hovered, setHovered] = useState(false);

  const handleClick = useEditTodoDialog();

  const toggleHovered = () => {
    setHovered(!hovered);
  };

  const backgroundColor = hovered ? "lightGray" : "";

  return (
    <div
      onClick={handleClick}
      onMouseEnter={toggleHovered}
      onMouseLeave={toggleHovered}
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
