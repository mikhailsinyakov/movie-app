import React, { useContext } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { LanguageContext } from "components/Language";

const Name = styled.span`
  font-weight: bold;
`;

const Value = styled.span`
  font-style: italic;
`;

const Item = ({ name, value, className }) => {
  const { getUIText } = useContext(LanguageContext);
  return (
    value && (
      <p className={className}>
        <Name>{getUIText(name)}: </Name> <Value>{value}</Value>
      </p>
    )
  );
}
  

Item.propTypes = {
  name: PropTypes.string,
  value: PropTypes.any,
  showOnSmallScreen: PropTypes.bool
};

const StyledItem = styled(Item)`
  display: ${({ showOnSmallScreen }) => (showOnSmallScreen ? "block" : "none")};

  @media screen and (min-width: 600px) {
    & {
      display: block;
    }
  }
`;

export default StyledItem;
