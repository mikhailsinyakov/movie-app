import React, { useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Select = ({ options, initValue, handleChange, className }) => {
  const [value, setValue] = useState(initValue);

  const onChange = e => {
    setValue(e.target.value);
    handleChange(e.target.value);
  };

  return (
    <select value={value} onChange={onChange} className={className}>
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

const StyledSelect = styled(Select)`
  background: #e6e6e8;
  height: 30px;
  border: 2px solid #739690;
  border-radius: 0.4rem;
  padding: 0 0.5rem;
  font-family: inherit;

  &:focus {
    outline: none;
  }
`;

export default StyledSelect;
