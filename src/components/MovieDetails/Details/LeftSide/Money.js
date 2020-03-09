import React from "react";
import PropTypes from "prop-types";
import { withLanguageContext } from "../../../Language";

const Money = ({ budget, revenue, getUIText }) => (
  <div>
    <span>
      {getUIText("budget")}: ${budget}
    </span>
    <span>
      {getUIText("revenue")}: ${revenue}
    </span>
  </div>
);

Money.propTypes = {
  budget: PropTypes.number.isRequired,
  revenue: PropTypes.number.isRequired,
  getUIText: PropTypes.func.isRequired
};

export default withLanguageContext(Money);
