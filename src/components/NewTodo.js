import React, { useState } from "react";
import { useDispatch } from "react-redux";
import ProjectsPicker from "./ProjectsPicker";
import { createTodo } from "../actions/todos";

const NewTodo = () => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [projectId, setProjectId] = useState(null);

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    const newTodo = {
      title,
      projectId,
    };
    dispatch(createTodo(newTodo));
  };

  const handleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleOpenClose = () => {
    setOpen(!open);
  };

  const handleProjectChange = ({ id }) => {
    setProjectId(id);
  };

  return (
    <div>
      {!open ? (
        <div>
          <div
            style={{
              border: "0.2px solid black",
              height: 61,
              padding: 10,
              borderRadius: 5,
              marginBottom: 10,
              boxShadow: "2px 2px 7px 0px rgba(0,0,0,0.49)",
            }}>
            <input
              value={title}
              onChange={handleChange}
              style={{
                height: 20,
                width: "99%",
                outline: "none",
                fontSize: 17,
                fontFamily:
                  "-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen",
              }}
            />
            <ProjectsPicker value={projectId} onChange={handleProjectChange} />
          </div>
          <div>
            <button
              onClick={handleSubmit}
              style={{
                width: 80,
                height: 35,
                border: "0.2px solid black",
                backgroundColor: "tomato",
                fontWeight: 700,
                fontSize: "13px!important",
                lineHeight: "17px",
                borderRadius: 5,
                boxShadow: "2px 3px 7px 0px rgba(0,0,0,0.49)",
                outline: "none",
                cursor: "pointer",
              }}>
              Add Task
            </button>
            <button
              onClick={handleOpenClose}
              style={{
                background: "transparent",
                fontSize: "13px!important",
                outline: "none",
                border: "none",
                fontWeight: 700,
                marginLeft: 5,
                textShadow: "2px 2px 4px rgba(0,0,0,0.49)",
                cursor: "pointer",
              }}>
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div
          style={{
            cursor: "pointer",
            padding: "5px 15px",
            borderRadius: 20,
          }}>
          <span style={{ fontWeight: "bold", fontSize: 20, marginRight: 10 }}>
            +
          </span>
          <span onClick={handleOpenClose}>Add ticket</span>
        </div>
      )}
    </div>
  );
};

export default NewTodo;
