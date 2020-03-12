import React, { Fragment } from "react";
import Header from "components/Header";
import Settings from "components/Settings";
import MoviesList from "components/MoviesList";
import Footer from "components/Footer";

const Home = () => (
  <Fragment>
    <Header />
    <main>
      <Settings />
      <MoviesList />
    </main>
    <Footer />
  </Fragment>
);

export default Home;
