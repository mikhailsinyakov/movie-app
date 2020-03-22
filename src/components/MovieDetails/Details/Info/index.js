import React from "react";
import PropTypes from "prop-types";
import withInfoStyles from "hocs/withInfoStyles";
import Title from "./Title";
import Description from "./Description";

const formatTime = minOverall => {
  const hours = Math.floor(minOverall / 60);
  const minutes = (minOverall % 60).toString().padStart(2, "0");

  return `${hours}:${minutes}`;
};

const Info = ({
  title,
  original_title,
  vote_average,
  overview,
  genres,
  release_date,
  production_countries,
  runtime,
  budget,
  revenue,
  actors,
  className
}) => (
  <div className={className}>
    <Title title={title} original_title={original_title} />
    <Description
      overview={overview}
      genres={genres}
      rating={vote_average ? vote_average.toFixed(1) : null}
      release={+release_date.split("-")[0]}
      runtime={runtime ? formatTime(runtime) : ""}
      production={
        production_countries.length ? production_countries.join(", ") : ""
      }
      budget={budget ? "$" + (budget / 1000000).toFixed(1) + "M" : ""}
      revenue={revenue ? "$" + (revenue / 1000000).toFixed(1) + "M" : ""}
      actors={actors}
    />
  </div>
);

Info.propTypes = {
  title: PropTypes.string.isRequired,
  original_title: PropTypes.string.isRequired,
  vote_average: PropTypes.number.isRequired,
  overview: PropTypes.string,
  genres: PropTypes.arrayOf(PropTypes.string).isRequired,
  release_date: PropTypes.string.isRequired,
  production_countries: PropTypes.arrayOf(PropTypes.string).isRequired,
  runtime: PropTypes.number,
  budget: PropTypes.number,
  revenue: PropTypes.number,
  actors: PropTypes.array.isRequired
};

export default withInfoStyles(Info);
