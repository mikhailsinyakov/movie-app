import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Title from "./Title";
import Genres from "../../../shared/Genres";

const Info = ({ title, rating, genres, className }) => (
  <div className={className}>
    <Title title={title} rating={rating.toFixed(1)} />
    <Genres genres={genres} />
  </div>
);

Info.propTypes = {
  title: PropTypes.string.isRequired,
  rating: PropTypes.number.isRequired,
  genres: PropTypes.arrayOf(PropTypes.string).isRequired
};

const StyledInfo = styled(Info)`
  padding: 0 0.5rem;
`;

export default StyledInfo;
