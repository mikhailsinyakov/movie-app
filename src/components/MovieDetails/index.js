import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { getMovieDetails } from "../../api/movieAPI";
import { withLanguageContext } from "../Language";
import Details from "./Details";

const MovieDetails = ({ id, language }) => {
  const [details, setDetails] = useState(null);
  useEffect(() => {
    const { cancel, promise } = getMovieDetails({
      language,
      movieId: id
    });
    (async () => {
      try {
        const details = await promise;
        setDetails(details);
      } catch (e) {
        console.error(e);
      }
    })();
    return () => cancel("Component has unmounted");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!details) return null;
  return <Details details={details} />;
};

MovieDetails.propTypes = {
  id: PropTypes.number.isRequired,
  language: PropTypes.string.isRequired
};

export default withLanguageContext(MovieDetails);
