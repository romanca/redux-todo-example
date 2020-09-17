import React from "react";
import DatePickerRaw from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { PickerButton } from "../StyledComponents";
import { dateTodoFormater } from "../utils/date-formatters";

class DatePickerInput extends React.Component {
  render() {
    const { onClick, value, placeholderText } = this.props;
    const finalValue = value ? dateTodoFormater(value) : placeholderText;
    return <PickerButton onClick={onClick}>{finalValue}</PickerButton>;
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
