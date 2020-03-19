import React, { useContext } from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import Select from "shared/Select";
import { CategoryContext } from "./Category";

const Settings = ({ className }) => {
  const { category, setCategory } = useContext(CategoryContext);
  const { t, i18n } = useTranslation();
  const languageOptions = [
    { value: "en", name: "EN" },
    { value: "ru", name: "RU" }
  ];
  const categoryOptions = [
    { value: "now_playing", name: t("nowPlaying") },
    { value: "popular", name: t("popular") },
    { value: "top_rated", name: t("topRated") }
  ];

  return (
    <div className={className}>
      <Select
        options={languageOptions}
        initValue={i18n.language}
        handleChange={val => i18n.changeLanguage(val)}
      />
      <Select
        options={categoryOptions}
        initValue={category}
        handleChange={val => setCategory(val)}
        showOnlyOhHomePage={true}
      />
    </div>
  );
};

const StyledSettings = styled(Settings)`
  padding: 0.5rem 1rem;
`;

export default StyledSettings;
