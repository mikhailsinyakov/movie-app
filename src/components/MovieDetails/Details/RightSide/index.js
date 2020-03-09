import React from "react";
import PropTypes from "prop-types";
import Title from "./Title";
import Description from "./Description";

const RightSide = ({
  title,
  original_title,
  vote_average,
  overview,
  release_date,
  production_countries,
  runtime
}) => (
  <div>
    <Title
      title={title}
      original_title={original_title}
      rating={vote_average}
    />
    <Description
      overview={overview}
      release={+release_date.split("-")[0]}
      production={production_countries}
      runtime={runtime && `${Math.floor(runtime / 60)}:${runtime % 60}`}
    />
  </div>
);

RightSide.propTypes = {
  title: PropTypes.string.isRequired,
  original_title: PropTypes.string.isRequired,
  vote_average: PropTypes.number.isRequired,
  overview: PropTypes.string,
  release_date: PropTypes.string.isRequired,
  production_countries: PropTypes.arrayOf(PropTypes.string).isRequired,
  runtime: PropTypes.number
};

export default RightSide;
