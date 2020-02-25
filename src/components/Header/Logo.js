import React from "react";
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

export default Logo;
