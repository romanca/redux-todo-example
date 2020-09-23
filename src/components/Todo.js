import React, { useState } from "react";
import { useConfirmationDialog, useHover } from "../hooks";
import EditTodoInput from "./EditTodoInput";
import CheckBox from "./Checkbox";
import "pretty-checkbox";
import IconButton, { ICON_BUTTON_TYPES } from "./IconButton";
import { get } from "lodash";
import { formatDateToTodoDate } from "../utils/date-formatters";
import Pane from "./Pane";
import TrashIcon from "./Icons/TrashIcon";

const TODO_ITEM_MENU = [
  {
    label: "Remove",
    id: "REMOVE",
    icon: (
      <div>
        <TrashIcon />
      </div>
    ),
  },
  {
    label: "Edit",
    id: "EDIT",
  },
];

const Todo = ({ item, onTodoRemoved, onTodoEdited }) => {
  const showConfirmDialog = useConfirmationDialog();
  const [editing, setEditing] = useState(true);
  const { listeners, hovered } = useHover();
  const [checked, toggleChecked] = useState(item.done);

  const toggleEditing = () => {
    setEditing(!editing);
  };

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
            onTodoRemoved(item);
          },
        });
        break;
      case "EDIT":
        toggleEditing();
        break;
      default:
        break;
    }
  };

  const onConfirm = (todo) => {
    onTodoEdited(todo);
  };

  const contextMenuId = `TODO_CONTEXT_MENU_${item.id}`;

  return (
    <div>
      {!editing ? (
        <EditTodoInput
          onRequestClose={toggleEditing}
          initialItem={item}
          onConfirm={onConfirm}
        />
      ) : (
        <Pane
          {...listeners}
          style={{
            opacity: checked ? 0 : 1,
            transition: "opacity 0.5s",
            border: "0.2px solid black",
            padding: 10,
            borderRadius: 5,
            width: "100%",
            marginBottom: 10,
            display: "flex",
            background: "white",
          }}>
          <div>
            <CheckBox
              color={get(item, "priority.color", "grey")}
              checked={checked}
              onChange={toggleDone}
            />
          </div>
          <div style={{ width: "100%" }}>
            <div
              style={{
                flex: 1,
                marginLeft: -5,
                fontWeight: "bold",
              }}>
              {item.title}
            </div>
            {item.date && (
              <div
                style={{
                  flex: 1,
                  marginLeft: -5,
                  marginTop: 5,
                  fontSize: 13,
                }}>
                {formatDateToTodoDate(item.date)}
              </div>
            )}
          </div>
          <div>
            <div
              style={{
                width: 10,
                height: 10,
                cursor: "pointer",
                position: "relative",
              }}>
              <div
                style={{
                  width: 10,
                  height: 10,
                  position: "relative",
                  cursor: "pointer",
                }}>
                <IconButton
                  type={ICON_BUTTON_TYPES.CONTEXT_MENU}
                  onClick={handleMenuItemClick}
                  contextMenuId={contextMenuId}
                  items={TODO_ITEM_MENU}
                  isVisible={hovered}
                />
              </div>
            </div>
          </div>
        </Pane>
      )}
    </div>
  );
};

export default Todo;
