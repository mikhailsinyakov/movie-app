import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { getWishlist, addMovieToWishlist } from "api/wishlist";
import Genres from "shared/Genres";
import Item from "./Item";
import Button from "shared/Button";
import Actors from "./Actors";

const Overview = styled.p`
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

const StyledGenres = styled(Genres)`
  justify-content: flex-start;
`;

const StyledButton = styled(Button)`
  margin: 0 auto;
  display: block;
  background-color: ${({wasAdded}) => wasAdded ? "#27b754" : "#6e83bd"};
  padding: 0.5rem 1rem;
  border-radius: 0.3rem;
  text-transform: uppercase;
  font-weight: bold;
  cursor: ${({wasAdded}) => wasAdded ? "initial" : "pointer"};
  
  &:hover {
    background-color: ${({wasAdded}) => wasAdded ? "#27b754" : "#6b5294"};
  }
`;

const Description = ({
  overview,
  genres,
  rating,
  release,
  runtime,
  production,
  budget,
  revenue,
  actors
}) => {
  const { t } = useTranslation();
  const { id } = useParams();
  const [movieWasAdded, setMovieWasAdded] = useState(false);
  
  useEffect(() => {
    getWishlist(window.localStorage.getItem("authKey"))
      .then(wishlist => {
        if (wishlist.includes(id)) setMovieWasAdded(true);
      }).catch(console.error);
  }, [id]);
  
  const addMovie = async () => {
    if (movieWasAdded) return;
    try {
      await addMovieToWishlist(window.localStorage.getItem("authKey"), id);
      setMovieWasAdded(true);
    }
    catch(e) {
      console.error(e);
    }
  };
  
  return (
    <div>
      {overview && <Overview>{overview}</Overview>}
      <StyledGenres genres={genres} />
      <Item name="rating" value={rating} showOnSmallScreen={true} />
      <Item name="release" value={release} showOnSmallScreen={true} />
      <Item name="runtime" value={runtime} showOnSmallScreen={true} />
      <Item name="production" value={production} />
      <Item name="budget" value={budget} />
      <Item name="revenue" value={revenue} />
      <StyledButton onClick={addMovie} wasAdded={movieWasAdded}>
        {
          movieWasAdded ? t("movieWasAdded") : t("addMovie")
        }
      </StyledButton>
      <Actors actors={actors} />
    </div>
  );
}

Description.propTypes = {
  overview: PropTypes.string,
  genres: PropTypes.arrayOf(PropTypes.string).isRequired,
  rating: PropTypes.string,
  release: PropTypes.number.isRequired,
  runtime: PropTypes.string,
  production: PropTypes.string,
  budget: PropTypes.string,
  revenue: PropTypes.string,
  actors: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    profile_src: PropTypes.string,
    name: PropTypes.string
  })).isRequired
};

export default Description;
