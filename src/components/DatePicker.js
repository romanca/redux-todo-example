import React from "react";
import { Button } from "evergreen-ui";
import DatePickerRaw from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { formatDateToTodoDate } from "../utils/date-formatters";

class DatePickerInput extends React.Component {
  render() {
    const { onClick, value, placeholderText } = this.props;
    const finalValue = value ? formatDateToTodoDate(value) : placeholderText;
    return (
      <div onClick={onClick}>
        <Button
          style={{
            background: "transparent",
            outline: "none",
            border: "1px solid black",
            borderRadius: 7,
          }}>
          {finalValue}
        </Button>
      </div>
    );
  }
}

const DatePicker = ({ onChange, selected, placeholder }) => {
  return (
    <DatePickerRaw
      onChange={onChange}
      selected={selected}
      minDate={new Date()}
      customInput={<DatePickerInput placeholderText={placeholder} />}
    />
  );
};
export default DatePicker;
