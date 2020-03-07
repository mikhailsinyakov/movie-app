import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Title = styled.p`
  position: relative;
  font-weight: bold;
  padding-right: 2rem;
`;

const Rating = styled.span`
  position: absolute;
  top: -0.2rem;
  right: 0;
  color: #d0c759;
  border-radius: 50%;
  border: 1px solid;
  padding: 0.2rem;
`;

const Genres = styled.p`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  font-size: 0.8rem;
`;

const Genre = styled.span`
  background-color: #335433;
  padding: 0.2rem;
  margin: 0.2rem;
  border-radius: 0.3rem;
`;

const capitalizeFirstLetter = word => word[0].toUpperCase() + word.slice(1);

const Info = ({ title, rating, genres, className }) => (
  <div className={className}>
    <Title>
      {title}
      {rating > 0 && <Rating>{rating.toFixed(1)}</Rating>}
    </Title>
    <Genres>
      {genres.map((genre, i) => (
        <Genre key={i}>{capitalizeFirstLetter(genre)}</Genre>
      ))}
    </Genres>
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
