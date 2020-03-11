import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { withLanguageContext } from "./Language";
import Select from "shared/Select";

const Settings = ({ language, setLanguage, className }) => {
  const languageOptions = [
    { value: "en", name: "EN" },
    { value: "ru", name: "RU" }
  ];

  return (
    <div className={className}>
      <Select
        options={languageOptions}
        initValue={language}
        handleChange={setLanguage}
      />
    </div>
  );
};

Settings.propTypes = {
  language: PropTypes.string.isRequired,
  setLanguage: PropTypes.func.isRequired
};

const StyledSettings = styled(Settings)`
  padding: 0.5rem 1rem;
`;

export default withLanguageContext(StyledSettings);
