import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { getMovieDetails } from "api/movieAPI";
import Error from "components/Error";
import Details from "./Details";

const MovieDetails = ({ id }) => {
  const { t, i18n: { language } } = useTranslation();
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
      window.document.title = `${details.title} | ${t("appName")}`;
    }
  }, [details, t]);

	if (error) return <Error />;
	if (!details) return null;
  return <Details details={details} />;
};

MovieDetails.propTypes = {
  id: PropTypes.number.isRequired
};

export default MovieDetails;
