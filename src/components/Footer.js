import React from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";

const Footer = ({ className }) => {
  const { t } = useTranslation();
  return(
    <footer className={className}>
      <span>{t("tmdbAttribution")}</span>
    </footer>
  );
}

const StyledFooter = styled(Footer)`
  margin-top: auto;
  background-color: rgba(86, 177, 49, 0.8);
  padding: 1rem;
  border-radius: 0.5rem;
  text-align: center;
  font-size: 0.8rem;
`;

export default StyledFooter;
