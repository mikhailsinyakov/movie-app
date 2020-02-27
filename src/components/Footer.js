import React from "react";
import { withLanguageContext } from "./Language";

const Footer = ({ getUIText }) => (
  <footer>
    <a href="https://github.com/mikhailsinyakov">Github</a>
    <span>{getUIText("tmdbAttribution")}</span>
  </footer>
);

export default withLanguageContext(Footer);
