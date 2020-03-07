import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Link } from "react-router-dom";

const HyperLink = ({ children, href, className }) => {
  if (href[0] === "/")
    return (
      <Link to={href} className={className}>
        {children}
      </Link>
    );
  else
    return (
      <a href={href} className={className}>
        {children}
      </a>
    );
};

const StyledHyperLink = styled(HyperLink)`
  height: var(--header-height);
  width: var(--header-height);
`;

const Logo = ({ filename, href, size, className }) => {
  const logoSrc = `img/${filename}`;
  const [name] = filename.split(".");
  return (
    <StyledHyperLink href={href}>
      <img src={logoSrc} alt={name} className={className} />
    </StyledHyperLink>
  );
};

Logo.propTypes = {
  filename: PropTypes.string.isRequired,
  href: PropTypes.string.isRequired,
  size: PropTypes.string
};

const StyledLogo = styled(Logo)`
  height: ${props => (props.size === "medium" ? "80%" : "50%")};
  margin: ${props => (props.size === "medium" ? "10%" : "25%")};
`;

export default StyledLogo;
