import React from "react";
import Todo from "./Todo";
import NewTodo from "./NewTodo";
import { connect } from "react-redux";
import { createTodo, removeTodo, editTodo } from "../actions/todos";
import { useTodosForCurrentView, useCurrentViewData } from "../selectors";
import IconButton, { ICON_BUTTON_TYPES } from "../components/IconButton.js";
import { getContextMenuOptions, contextMenuKeys } from "../utils/contextMenu";

const TodosViewHeader = () => {
  const data = useCurrentViewData();
  // const handleMenuItemClick =
  if (!data) {
    return null;
  }
};

const Todos = ({ todos, onTodoCreated, onTodoRemoved, onTodoEdited }) => {
  return (
    <div
      style={{
        marginBottom: 14,
        padding: "0 10px 0 5px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <div
        style={{
          fontSize: 20,
          fontWeight: "bold",
        }}
      >
        {data.label}
      </div>
      <div style={{ cursor: "pointer" }}>
        <IconButton
          items={getContextMenuOptions(contextMenuKeys.TODO_VIEW)}
          type={ICON_BUTTON_TYPES.CONTEXT_MENU}
          contextMenuId={`TODOS_VIEW_HEADER_${data.id}`}
        />
      </div>
    </div>
  );
};

const Todos = ({ onTodoCreated, onTodoRemoved, onTodoEdited }) => {
  const todos = useTodosForCurrentView();
  return (
    <div
      style={{
        flex: 1,
        paddingTop: 10,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <TodosViewHeader />
      {todos.map((item) => (
        <Todo
          key={item.id}
          item={item}
          onTodoRemoved={onTodoRemoved}
          onTodoEdited={onTodoEdited}
        />
      ))}
      <NewTodo onTodoCreated={onTodoCreated} />
    </div>
  );
};

function mapDispatchToProps(dispatch) {
  return {
    onTodoCreated: (values) => {
      dispatch(createTodo(values));
    },
    onTodoRemoved: (value) => {
      dispatch(removeTodo(value));
    },
    onTodoEdited: (item) => {
      dispatch(editTodo(item));
    },
  };
}

export default connect(null, mapDispatchToProps)(Todos);
