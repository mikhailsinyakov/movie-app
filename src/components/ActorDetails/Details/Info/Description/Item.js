import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { useTranslation } from "react-i18next";

const Name = styled.span`
  font-weight: bold;
`;

const Value = styled.span`
  font-style: italic;
`;

const Item = ({ name, value, className }) => {
  const { t } = useTranslation();
  return (
    value && (
      <p className={className}>
        <Name>{t(name)}: </Name> <Value>{value}</Value>
      </p>
    )
  );
}
  

Item.propTypes = {
  name: PropTypes.string,
  value: PropTypes.any
};

export default Item;
