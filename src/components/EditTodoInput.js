import React, { useState } from "react";
import ProjectsPicker from "./ProjectsPicker";

const EditTodoInput = ({ onRequestClose, initialItem, onConfirm }) => {
  const [todo, setTodo] = useState(initialItem || { title: "", projectId: "" });

  const handleChangeTitle = (e) => {
    const title = e.target.value;
    setTodo((oldState) => ({ ...oldState, title }));
  };

  const handleSubmit = () => {
    onConfirm(todo);
  };

  const handleProjectPickerChange = ({ id }) => {
    setTodo((oldState) => ({ ...oldState, projectId: id }));
  };

  return (
    <div>
      <div
        style={{
          border: "0.2px solid black",
          height: 61,
          width: "100%",
          padding: 10,
          borderRadius: 5,
          marginBottom: 10,
          boxShadow: "2px 2px 7px 0px rgba(0,0,0,0.49)",
        }}>
        <input
          value={todo.title}
          onChange={handleChangeTitle}
          autoFocus
          placeholder='Add a task'
          type='text'
          style={{
            height: 20,
            width: "99%",
            outline: "none",
            fontSize: 17,
            border: "none",
            fontFamily:
              "-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen",
          }}
        />
        <div style={{ marginTop: 10 }}>
          <ProjectsPicker
            value={todo.projectId}
            onChange={handleProjectPickerChange}
          />
        </div>
      </div>
      <div>
        <button
          onClick={handleSubmit}
          style={{
            width: 80,
            height: 35,
            backgroundColor: "tomato",
            fontWeight: 700,
            fontSize: "13px!important",
            lineHeight: "17px",
            borderRadius: 5,
            outline: "none",
            border: "none",
            cursor: "pointer",
            marginBottom: 10,
          }}>
          Save
        </button>
        <button
          onClick={onRequestClose}
          style={{
            background: "transparent",
            fontSize: "13px!important",
            outline: "none",
            border: "none",
            marginLeft: 5,
            cursor: "pointer",
          }}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default EditTodoInput;
