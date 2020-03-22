import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
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
  actors: PropTypes.array.isRequired,
};

const StyledInfo = styled(Info)`
  max-width: 330px;
  background-color: rgba(226, 243, 187, 0.7);
  padding: 1rem;
  margin: 1rem;
  border-radius: 0.5rem;

  @media screen and (min-width: 550px) {
    & {
      width: 250px;
      margin-top: 0;
      margin-left: 2rem;
      margin-right: 2rem;
      padding-left: 2rem;
      padding-right: 2rem;
    }
  }

  @media screen and (min-width: 800px) {
    & {
      width: 600px;
    }
  }
`;

export default StyledInfo;
