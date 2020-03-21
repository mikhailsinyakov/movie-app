import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import PhotoWithLabel from "./PhotoWithLabel";

const Photos = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
`;

const Actors = ({actors, className}) => {
  const { t } = useTranslation();
  
  return (
    <div className={className}>
      <h3>{t("actors")}</h3>
      <Photos>
        {
        actors.map(({profile_src, name, id}) => 
          <PhotoWithLabel photoSrc={profile_src} name={name} id={id} key={id} />)
        }
      </Photos>
    </div>
  );
};

Actors.propTypes = {
  actors: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string
  })).isRequired
};

const StyledActors = styled(Actors)`
  text-align: center;
  padding: 0.5rem;
`;

export default StyledActors;
