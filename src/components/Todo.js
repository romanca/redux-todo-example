import React, { useState } from "react";

const Todo = ({ item }) => {
  const [hovered, setHovered] = useState(false);

  const toggleHovered = () => {
    setHovered(!hovered);
  };
  const onRemoveButtonClick = () => {
    alert(`remove button clicked: ${item.id}`) 
  };

  const backgroundColor = hovered ? "lightGray" : "transparent";

  return (
    <div
      onMouseEnter={toggleHovered}
      onMouseLeave={toggleHovered}
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
      <div style={{ float: "right", marginTop: -4 }}>
        <button
          style={{
            border: "none",
            fontSize: 20,
            cursor: "pointer",
            outline: "none",
            backgroundColor,
            borderRadius: 4,
          }}
          onClick={onRemoveButtonClick}
        >
          x
        </button>
      </div>
    </div>
  );
};

export default Todo;
