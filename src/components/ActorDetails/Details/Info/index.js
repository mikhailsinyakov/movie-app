import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import withInfoStyles from "hocs/withInfoStyles";
import Description from "./Description";

const formatDate = (date, language) => {
  if (language === "en") return date;
  const [year, month, day] = date.split("-");
  return `${day}.${month}.${year}`;
}

const StyledName = styled.p`
  text-align: center;
  font-weight: bold;
`;

const Info = ({
  name,
  birthday,
  place_of_birth,
  biography,
  className
}) => {
  const { i18n : {language} } = useTranslation();
  
  return (
    <div className={className}>
      <StyledName>{name}</StyledName>
      <Description
        biography={biography}
        birthday={birthday && formatDate(birthday, language)}
        place_of_birth={place_of_birth}
      />
    </div>
  );
};

Info.propTypes = {
  name: PropTypes.string.isRequired,
  birthday: PropTypes.string,
  place_of_birth: PropTypes.string,
  biography: PropTypes.string.isRequired
};

export default withInfoStyles(Info);
