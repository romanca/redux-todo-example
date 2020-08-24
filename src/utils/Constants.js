import React from "react";
import InboxIcon from "../components/Icons/InboxIcon";

export const MENU_ACTION_BUTTON_TYPES = {
  ADD_PROJECT: "ADD_PROJECT",
  ADD_LABEL: "ADD_LABEL",
  PROJECTS_HAMBURGER: "PROJECTS_HAMBURGER",
  LABEL_HAMBURGER: "LABEL_HAM",
};

export const staticMenuItems = [
  {
    label: "Inbox",
    id: "INBOX_TODOS",
    icon: (
      <div style={{ marginRight: 10, display: "flex", alignItems: "center" }}>
        <InboxIcon />
      </div>
    ),
    color: "grey",
  },
];
