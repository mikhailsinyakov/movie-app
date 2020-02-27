import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const HyperLink = ({ children, href }) => {
  if (href[0] === "/") return <Link to={href}>{children}</Link>;
  else return <a href={href}>{children}</a>;
};

const Logo = ({ filename, href, size = "medium" }) => {
  const logoSrc = `img/${filename}`;
  const [name] = filename.split(".");
  return (
    <HyperLink href={href}>
      <img src={logoSrc} alt={name} />
    </HyperLink>
  );
};

Logo.propTypes = {
  filename: PropTypes.string.isRequired,
  href: PropTypes.string.isRequired,
  size: PropTypes.string
};

export default Logo;
