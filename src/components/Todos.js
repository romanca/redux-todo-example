import React from "react";
import Todo from "./Todo";
import NewTodo from "./NewTodo";
import { connect } from "react-redux";
import { createTodo, removeTodo, editTodo } from "../actions/todos";
import { useTodosForCurrentView } from "../selectors";
import TodosViewHeader from "./DataViewHeader";

const Todos = ({ onTodoCreated, onTodoRemoved, onTodoEdited }) => {
  const todos = useTodosForCurrentView();

  return (
    <div
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
      }}>
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
