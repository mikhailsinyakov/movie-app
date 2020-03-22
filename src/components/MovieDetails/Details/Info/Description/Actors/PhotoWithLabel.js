import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Photo = styled.img`
  width: 100px;
  border-radius: 10px;
`;

const Label = styled.p`
  margin-top: 0;
`;

const PhotoWithLabel = ({id, name, photoSrc, className}) => (
  <div className={className}>
    <Photo 
      src={photoSrc || "img/photo-placeholder.jpg"} 
      alt={name} 
      onError={e => (e.target.src = "img/photo-placeholder.jpg")}
    />
    <Label>{name}</Label>
  </div>
);

PhotoWithLabel.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  photoSrc: PropTypes.string
};

const StyledPhotoWithLabel = styled(PhotoWithLabel)`
  width: 100px;
  margin: 0.5rem;
`;

export default StyledPhotoWithLabel;
