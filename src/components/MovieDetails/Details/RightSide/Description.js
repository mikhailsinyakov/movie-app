import React from "react";
import PropTypes from "prop-types";
import { withLanguageContext } from "../../../Language";

const Description = ({ overview, release, production, runtime, getUIText }) => (
  <div>
    {overview && <p>{overview}</p>}
    <p>
      {getUIText("release")}: {release}
    </p>
    <p>
      {getUIText("production")}: {production}
    </p>
    {runtime && (
      <p>
        {getUIText("runtime")}: {runtime}
      </p>
    )}
  </div>
);

Description.propTypes = {
  overview: PropTypes.string,
  release: PropTypes.number.isRequired,
  production: PropTypes.arrayOf(PropTypes.string).isRequired,
  runtime: PropTypes.string,
  getUIText: PropTypes.func.isRequired
};

export default withLanguageContext(Description);
