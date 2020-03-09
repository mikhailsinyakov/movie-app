import React, { Fragment } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/Header";
import Settings from "../components/Settings";
import MovieDetails from "../components/MovieDetails";
import Footer from "../components/Footer";

const Movie = () => {
  const { id } = useParams();
  return (
    <Fragment>
      <Header />
      <main>
        <Settings />
        <MovieDetails id={+id} />
      </main>
      <Footer />
    </Fragment>
  );
};

export default Movie;
