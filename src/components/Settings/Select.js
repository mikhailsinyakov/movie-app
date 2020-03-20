import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { HomeStateContext } from "components/HomeState";

const Select = ({ options, initValue, handleChange, showAlways, className }) => {
  const { isSearchActive } = useContext(HomeStateContext);
  const [value, setValue] = useState(initValue);
  const [show, setShow] = useState(!isSearchActive);
  
  useEffect(() => {
    if (!showAlways) {
      if (!isSearchActive) {
        setTimeout(() => {
          setShow(true);
        }, 500);
      } else setShow(false);
    }
  }, [showAlways, isSearchActive]);
  
  const style = {
    display: showAlways ? "inline" : show ? "inline" : "none"
  };

  const onChange = e => {
    setValue(e.target.value);
    handleChange(e.target.value);
  };

  return (
    <select 
      value={value} 
      onChange={onChange} 
      className={className}
      style={style}
    >
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
  handleChange: PropTypes.func.isRequired,
  showAlways: PropTypes.bool.isRequired
};



const StyledSelect = styled(Select)`
  background: #e6e6e8;
  height: 30px;
  border: 2px solid #739690;
  border-radius: 0.4rem;
  padding: 0 0.5rem;
  font-family: inherit;
  margin: 0.5rem 0.5rem;

  &:focus {
    outline: none;
  }
`;

export default StyledSelect;
