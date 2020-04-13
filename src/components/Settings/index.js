import React, { useContext } from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import Select from "./Select";
import Search from "./Search";
import { HomeStateContext } from "components/HomeState";

const Settings = ({ className }) => {
  const { t, i18n } = useTranslation();
  const { category, setCategory } = useContext(HomeStateContext);
  const languageOptions = [
    { value: "en", name: "EN" },
    { value: "ru", name: "RU" }
  ];
  const categoryOptions = [
    { value: "now_playing", name: t("nowPlaying") },
    { value: "popular", name: t("popular") },
    { value: "top_rated", name: t("topRated") },
    { value: "wishlist", name: t("wishlist")}
  ];

  return (
    <div className={className}>
      <Select
        options={languageOptions}
        initValue={i18n.language}
        handleChange={val => i18n.changeLanguage(val)}
        showAlways={true}
      />
      <Select
        options={categoryOptions}
        initValue={category}
        handleChange={setCategory}
        showAlways={false}
      />
      <Search />
    </div>
  );
};

const StyledSettings = styled(Settings)`
  display: flex;
  max-width: 1000px;
  height: 55px;
  margin: 0 auto;
  align-items: center;
`;

export default StyledSettings;
