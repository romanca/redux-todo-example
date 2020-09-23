import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createTodo } from "../actions/todos";
import EditTodoInput from "./EditTodoInput";
import PlusIcon from "./Icons/PlusIcon";

const NewTodo = () => {
  const [opened, setOpened] = useState(false);

  const dispatch = useDispatch();

  const onConfirm = (todo) => {
    dispatch(createTodo(todo));
    onClose();
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
          onClick={onOpen}
          style={{
            cursor: "pointer",
            padding: "5px 15px",
            borderRadius: 20,
            display: "flex",
            marginLeft: -5,
          }}>
          <PlusIcon
            style={{
              fontSize: 30,
              marginRight: 8,
              fontWeight: 500,
              marginTop: 12,
            }}></PlusIcon>
          <span style={{ marginTop: 12 }}>Add Task</span>
        </div>
      )}
    </div>
  );
};

export default NewTodo;
