import { format } from "date-fns";

export function dateTodoFormater(date) {
  if (!date) {
    console.warn("dateTodoFormater is not expecting null value");
    return "";
  }
  return format(new Date(date), "dd.MMMM");
}
