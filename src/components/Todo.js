import React from "react";
import IconButton, { ICON_BUTTON_TYPES } from "./IconButton";
import { useConfirmationDialog, useEditTodoDialog, useHover } from "../hooks";

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
  const { listeners, hovered } = useHover();

  const showEditTodoDialog = useEditTodoDialog({
    onConfirm: (value) => {
      onTodoEdited(value)
    },
  });

  const handleMenuItemClick = ({ id }) => {
    switch (id) {
      case "REMOVE":
        showConfirmDialog({
          title: "Todo Removal",
          message: "Are you sure you want to remove this task?",
          onConfirm: () => {
            onTodoRemoved(item);
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
      {...listeners}
      style={{
        border: "0.2px solid black",
        padding: 10,
        borderRadius: 5,
        marginBottom: 10,
        boxShadow: "2px 2px 7px 0px rgba(0,0,0,0.49)",
        display: "flex",
        cursor: "pointer",
      }}
    >
      <div style={{ flex: 1 }}>{item.title}</div>
      {hovered && (
        <div
          style={{
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
      )}
    </div>
  );
};

export default Todo;
