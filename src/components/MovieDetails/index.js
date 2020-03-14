import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { getMovieDetails } from "api/movieAPI";
import Error from "components/Error";
import { withLanguageContext } from "../Language";
import Details from "./Details";

const MovieDetails = ({ id, language, getUIText }) => {
	const [details, setDetails] = useState(null);
	const [error, setError] = useState(null);

  useEffect(() => {
    let ignore = false;
    getMovieDetails({ language, movieId: id })
      .then(details => !ignore && setDetails(details))
      .catch(setError);

    return () => (ignore = true);
  }, [id, language]);
  
  useEffect(() => {
    if (details) {
      window.document.title = `${details.title} | ${getUIText("appName")}`;
    }
  }, [details, getUIText]);

	if (error) return <Error />;
	if (!details) return null;
  return <Details details={details} />;
};

MovieDetails.propTypes = {
  id: PropTypes.number.isRequired,
  language: PropTypes.string.isRequired
};

export default withLanguageContext(MovieDetails);
