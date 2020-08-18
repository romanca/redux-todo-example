import React from "react";
import Todo from "./Todo";
import NewTodo from "./NewTodo";
import { connect } from "react-redux";
import { createTodo, removeTodo } from "../actions/todos";

const Todos = ({ todos, onTodoCreated, onTodoRemoved }) => {
  return (
    <div style={{ flex: 1, paddingTop: 10 }}>
      {todos.map((item) => (
        <Todo key={item.id} item={item} onTodoRemoved={onTodoRemoved} />
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
       dispatch(removeTodo(id))
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Todos);
