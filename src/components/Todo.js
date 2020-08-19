import React from "react";
import IconButton, { ICON_BUTTON_TYPES } from "./IconButton";
import { useConfirmationDialog, useEditTodoDialog } from "../hooks";

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

const Todo = ({ item, onTodoRemoved }) => {
  const showConfirmDialog = useConfirmationDialog();

  const showEditTodoDialog = useEditTodoDialog({
    onConfirm: (value) => {
      alert(JSON.stringify(value, null, 2));
    },
  });

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
        border: "0.2px solid black",
        padding: 10,
        borderRadius: 5,
        width: "100%",
        marginBottom: 10,
        boxShadow: "2px 2px 7px 0px rgba(0,0,0,0.49)",
        display: "flex",
      }}
    >
      <div style={{ flex: 1 }}>{item.title}</div>
      <div
        style={{
          backgroundColor: "red",
          width: 10,
          height: 10,
          position: "relative",
          cursor: "pointer",
        }}
      >
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
