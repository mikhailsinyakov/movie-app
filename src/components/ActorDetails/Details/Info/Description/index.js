import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Item from "./Item";

const Biography = styled.p`
  text-indent: 1rem;

  ${({ children }) =>
    children.match(/^[^\d]/) &&
    `
			&::first-letter {
				font-size: 2rem;
				text-shadow: 2px -2px 0px #715555;
			}
	`}
`;

const Description = ({ birthday, place_of_birth, biography }) => (
  <div>
    {biography && <Biography>{biography}</Biography>}
    <Item name="birthday" value={birthday} />
    <Item name="place_of_birth" value={place_of_birth} />
  </div>
);

Description.propTypes = {
  birthday: PropTypes.string,
  place_of_birth: PropTypes.string,
  biography: PropTypes.string.isRequired
};

export default Description;
