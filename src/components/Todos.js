import React from "react";
import Todo from "./Todo";
import NewTodo from "./NewTodo";
import { connect } from "react-redux";
import { createTodo, removeTodo, editTodo } from "../actions/todos";

const Todos = ({ todos, onTodoCreated, onTodoRemoved, onTodoEdited }) => {
  return (
    <div style={{ flex: 1, paddingTop: 10 }}>
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

function mapStateToProps(state) {
  return {
    todos: state.todos.data,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onTodoCreated: (values) => {
      dispatch(createTodo(values));
    },
    onTodoRemoved: (id) => {
      dispatch(removeTodo(id));
    },
    onTodoEdited: (item) => {
      dispatch(editTodo(item));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Todos);
