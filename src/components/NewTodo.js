import React, { useState } from "react";
import { useDispatch } from "react-redux";
import ProjectsPicker from "./ProjectsPicker";
import { createTodo } from "../actions/todos";
import EditTodoInput from "./EditTodoInput";

const NewTodo = () => {
  const [opened, setOpened] = useState(false);

  const dispatch = useDispatch();

  const onConfirm = (todo) => {
    dispatch(createTodo(todo));
  };

  const onClose = () => {
    setOpened(false);
  };
  const onOpen = () => {
    setOpened(true);
  };

  return (
    <div>
      {opened ? (
        <EditTodoInput onRequestClose={onClose} onConfirm={onConfirm} />
      ) : (
        <div
          style={{
            cursor: "pointer",
            padding: "5px 15px",
            borderRadius: 20,
            display: "flex",
            marginLeft: -5,
          }}>
          <span
            style={{
              fontSize: 30,
              marginRight: 7,
              color: "red",
              fontWeight: 100,
            }}>
            +
          </span>
          <span onClick={onOpen} style={{ marginTop: 12 }}>
            Add Task
          </span>
        </div>
      )}
    </div>
  );
};

export default NewTodo;
