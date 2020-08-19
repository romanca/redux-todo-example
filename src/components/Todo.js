import React from "react";
import IconButton, { ICON_BUTTON_TYPES } from "./IconButton";
 

const Todo = ({ item, onTodoRemoved }) => {

  const handleTodoRemove = () => {
    onTodoRemoved(item.id);
  }

  return (
    <div
      style={{
        border: "0.2px solid black",
        padding: 5,
        borderRadius: 5,
        width: "100%",
        marginBottom: 10,
        boxShadow: "2px 2px 7px 0px rgba(0,0,0,0.49)",
      }}
    >
      {item.title}
      <IconButton type={ICON_BUTTON_TYPES.CLOSE} onClick={handleTodoRemove} />
    </div>
  );
};

export default Todo;
