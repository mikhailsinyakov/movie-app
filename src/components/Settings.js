import React, { useContext } from "react";
import styled from "styled-components";
import { LanguageContext } from "./Language";
import Select from "shared/Select";

const Settings = ({ className }) => {
  const { language, setLanguage } = useContext(LanguageContext);
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

const StyledSettings = styled(Settings)`
  padding: 0.5rem 1rem;
`;

export default StyledSettings;
