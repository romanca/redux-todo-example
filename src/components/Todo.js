import React, { useState } from "react";
import IconButton, { ICON_BUTTON_TYPES } from "./IconButton";
import { useConfirmationDialog, useEditTodoDialog } from "../hooks";
import Checkbox from "./Checkbox";

const TODO_ITEM_MENU = [
  {
    label: "Remove",
    id: "REMOVE",
  },
  {
    label: "Edit",
    id: "EDIT",
  },
];

const Todo = ({ item, onTodoRemoved, onTodoEdited }) => {
  const showConfirmDialog = useConfirmationDialog();

  const showEditTodoDialog = useEditTodoDialog({
    onConfirm: (value) => {
      onTodoEdited(value);
    },
  });

  const [checked, toggleChecked] = useState(item.done);

  const toggleDone = () => {
    toggleChecked(!checked);
    setTimeout(() => {
      onTodoEdited({ ...item, done: !item.done });
    }, 500);
  };

  const handleMenuItemClick = ({ id }) => {
    switch (id) {
      case "REMOVE":
        showConfirmDialog({
          title: "Todo Removal",
          message: "Are you sure you want to remove this task?",
          onConfirm: () => {
            onTodoRemoved(item.id);
          },
        });
        break;
      case "EDIT":
        showEditTodoDialog({ initialValues: item });
        break;
      default:
        break;
    }
  };

  const contextMenuId = `TODO_CONTEXT_MENU_${item.id}`;

  return (
    <div
      style={{
        opacity: checked ? 0 : 1,
        transition: "opacity 0.5s",
        border: "0.2px solid black",
        padding: 10,
        borderRadius: 5,
        width: "100%",
        marginBottom: 10,
        boxShadow: "2px 2px 7px 0px rgba(0,0,0,0.49)",
        display: "flex",
      }}>
      <Checkbox checked={checked} onChange={toggleDone} />
      <div style={{ flex: 1, marginLeft: 5 }}>{item.title}</div>
      <div
        style={{
          width: 10,
          height: 10,
          cursor: "pointer",
          position: "relative",
        }}>
        <IconButton
          type={ICON_BUTTON_TYPES.CONTEXT_MENU}
          onClick={handleMenuItemClick}
          contextMenuId={contextMenuId}
          items={TODO_ITEM_MENU}
        />
      </div>
    </div>
  );
};

export default Todo;
