import React, { useContext } from "react";
import styled from "styled-components";
import { Times } from "@styled-icons/fa-solid/Times";
import { useTranslation } from "react-i18next";
import { HomeStateContext } from "components/HomeState";

const Wrapper = styled.div`
  position: relative;
  margin: 0.5rem 1rem 0.5rem auto;
  padding-right: 0.5rem;
  transition: width 0.5s;
`;

const ClearIcon = styled(Times)`
  position: absolute;
  right: 5px;
  top: 9px;
  cursor: default;
  color: red;
  width: 0.8rem;
  
  &:hover {
    color: black;
  }
`;

const Search = ({ className }) => {
  const { t } = useTranslation();
  const {
    searchQuery, setSearchQuery, isSearchActive, setIsSearchActive
  } = useContext(HomeStateContext);
  const wrapperStyle = {
    width: isSearchActive ? "60%" : "50px"
  };
  const inputStyle = {
    fontSize: isSearchActive ? "1.05rem" : "1rem"
  };
  const clearIconStyle = {
    display: searchQuery ? "inline" : "none"
  };
  
  return (
    <Wrapper style={wrapperStyle}>
      <input 
        value={searchQuery}
        onChange={e => setSearchQuery(e.target.value)}
        placeholder={isSearchActive ? t("typeMovieTitle") : t("search")}
        onFocus={() => (searchQuery === "" && setIsSearchActive(true))}
        onBlur={() => (searchQuery === "" && setIsSearchActive(false))}
        className={className}
        style={inputStyle}
      />
      <ClearIcon style={clearIconStyle} onClick={() => setSearchQuery("")}>
        X
      </ClearIcon>
    </Wrapper>
  )
};

const StyledSearch = styled(Search)`
  width: 100%;
  padding: 0.5rem;
  border-radius: 0.5rem;
  border: 0;
  font-family: initial;
  
  &:focus {
  outline: 0;
  }
`;

export default StyledSearch;
