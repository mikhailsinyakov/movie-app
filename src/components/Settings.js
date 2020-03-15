import React from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import Select from "shared/Select";

const Settings = ({ className }) => {
  const { i18n } = useTranslation();
  const languageOptions = [
    { value: "en", name: "EN" },
    { value: "ru", name: "RU" }
  ];

  return (
    <div className={className}>
      <Select
        options={languageOptions}
        initValue={i18n.language}
        handleChange={val => i18n.changeLanguage(val)}
      />
    </div>
  );
};

const StyledSettings = styled(Settings)`
  padding: 0.5rem 1rem;
`;

export default StyledSettings;
