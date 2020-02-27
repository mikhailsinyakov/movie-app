import React, { useState } from "react";
import PropTypes from "prop-types";

const Select = ({ options, initValue, handleChange }) => {
  const [value, setValue] = useState(initValue);

  const onChange = e => {
    setValue(e.target.value);
    handleChange(e.target.value);
  };

  return (
    <select value={value} onChange={onChange}>
      {options.map(({ value, name }) => (
        <option key={value} value={value}>
          {name}
        </option>
      ))}
    </select>
  );
};

Select.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired
    })
  ),
  initValue: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired
};

export default Select;
