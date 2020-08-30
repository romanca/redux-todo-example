import React from "react";
import { useCurrentViewData } from "../selectors";
import { useTheme } from "../Theme/index.js";
import MenuItemRightButton from "./MenuItemRightButton";
import { MENU_ACTION_BUTTON_TYPES } from "../utils/Constants";

// Ffor now this component is rendering only view for main Todos view.
// In future this should be reusable View Header component. Hi will render header based on viewFilter

const TodosViewHeader = () => {
  const data = useCurrentViewData();
  const { sizes } = useTheme();
  if (!data) {
    return null;
  }
  return (
    <div
      style={{
        padding: "0 10px 15px",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "baseline",
      }}
    >
      <div
        style={{
          fontSize: sizes.todoViewTitleSize,
          fontWeight: "bold",
        }}
      >
        {data.label}
      </div>
      <div style={{ cursor: "pointer" }}>
        <MenuItemRightButton
          type={MENU_ACTION_BUTTON_TYPES.PROJECTS_HAMBURGER}
          itemId={data.id}
        />
      </div>
    </div>
  );
};

export default TodosViewHeader;
