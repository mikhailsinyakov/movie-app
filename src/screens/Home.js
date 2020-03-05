import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";
import Header from "../components/Header";
import MoviesList from "../components/MoviesList";
import Footer from "../components/Footer";
import { isNull } from "../helpers/customPropCheckers";

const Home = ({ moviesData, getMoreMovies }) => {
  return (
    <Fragment>
      <Header />
      <MoviesList moviesData={moviesData} getMoreMovies={getMoreMovies} />
      <Footer />
    </Fragment>
  );
};

Home.propTypes = {
  moviesData: PropTypes.shape({
    list: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string.isRequired,
        id: PropTypes.number.isRequired,
        poster_src: PropTypes.oneOfType([PropTypes.string, isNull]),
        vote_average: PropTypes.number,
        genres: PropTypes.arrayOf(PropTypes.string)
      })
    ).isRequired,
    loading: PropTypes.bool.isRequired,
    completed: PropTypes.bool.isRequired
  })
};

export default Home;
