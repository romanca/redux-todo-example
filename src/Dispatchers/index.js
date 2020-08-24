import { useDispatch } from "react-redux";
import { setCurrentView } from "../actions/uiState";

export function useCurrentViewUpdater() {
  const dispatch = useDispatch();
  return (filterType, itemId) => {
    dispatch(setCurrentView(filterType, itemId));
  };
}
