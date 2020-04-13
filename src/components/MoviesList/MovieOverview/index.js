import React, { useContext, useState } from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { Times } from "@styled-icons/fa-solid/Times";
import { isNull } from "helpers/customPropCheckers";
import { deleteMovieFromWishlist } from "api/wishlist";
import Poster from "shared/Poster";
import Info from "./Info";
import { HomeStateContext } from "components/HomeState";

const ClearIcon = styled(Times)`
  position: absolute;
  right: 10px;
  top: 10px;
  color: #e8d3d3;
  width: 1.2rem;
  background-color: rgba(13, 12, 37, 0.7);
  padding: 0.2rem 0.4rem;
  border-radius: 1rem;
  
  @media (hover: hover) {
    display: none;
  }
  
  &:hover {
    color: #d65e5e;
  }
`;

const MovieOverview = ({ movie, className }) => {
  const history = useHistory();
  const [ show, setShow ] = useState(true);
  const { category } = useContext(HomeStateContext);
  
  const deleteMovie = async e => {
    e.stopPropagation();
    const authKey = window.localStorage.getItem("authKey");
    try {
      await deleteMovieFromWishlist(authKey, movie.id);
      setShow(false);
    } catch (e) {
      console.error(e);
    }
  };
  
  return (
    <div
      className={className}
      style={{display: show ? "block" : "none"}}
      onClick={() => history.push(`/movie/${movie.id}`)}
    >
      <Poster 
        source={movie.poster_src} 
        alt={movie.title} 
        key={movie.poster_src} 
       />
      <Info
        title={movie.title}
        rating={movie.vote_average}
        genres={movie.genres}
      />
      {
        category === "wishlist" && <ClearIcon onClick={deleteMovie} />
      }
    </div>
  );
};

MovieOverview.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    poster_src: PropTypes.oneOfType([PropTypes.string, isNull]),
    vote_average: PropTypes.number,
    genres: PropTypes.arrayOf(PropTypes.string)
  })
};

const StyledMovieOverview = styled(MovieOverview)`
  position: relative;
  width: var(--poster-width);
  margin: 1rem;
  border-radius: 1rem;
  background-color: #442c2c;
  color: #9a9a86;
  height: fit-content;
  cursor: pointer;
  transition: transform 0.5s;

  &:hover {
    transform: translateY(-1rem);
  }
  
  &:hover svg {
    display: block;
  }
`;

export default StyledMovieOverview;
