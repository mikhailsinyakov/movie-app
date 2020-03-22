import React, { useRef, useEffect } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Poster from "shared/Poster";
import Info from "./Info";

const StyledPoster = styled(Poster)`
  align-self: flex-start;
  border-bottom-left-radius: 1rem;
  border-bottom-right-radius: 1rem;
  width: 150px;
  will-change: transform;
  transition: transform 0.2s;
  
  @media screen and (min-height: 400px) and (min-width: 550px) {
    width: 200px;
  }
  
  @media screen and (min-width: 700px) and (min-height: 500px) {
    width: 250px;
  }
`;

const Details = ({ details, className }) => {
  const posterEl = useRef();
  const initPosterPos = useRef(0);
  const timer = useRef(null);
  
  useEffect(() => {
    initPosterPos.current = posterEl.current.getBoundingClientRect().top;
    const handleScroll = () => {
      if (timer.current) {
        clearTimeout(timer.current);
      }
      timer.current = setTimeout(() => {
        if (window.innerWidth > 600) {
          const currScroll = window.scrollY;
          const diff = currScroll - initPosterPos.current + 10;
          posterEl.current.style.transform = 
            `translateY(${Math.max(10, diff) + "px"})`;
        } else {
          posterEl.current.style.transform = "translateY(0)";
        }
        timer.current = null;
      }, 100);
      
    };
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("orientationchange", handleScroll);
    window.addEventListener("resize", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("orientationchange", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  return (
    <div className={className}>
      <StyledPoster 
        source={details.poster_src} 
        title={details.title} 
        key={details.poster_src}
        ref={posterEl}
       />
      <Info {...details} />
    </div>
  );
}

Details.propTypes = {
  details: PropTypes.shape({
    title: PropTypes.string.isRequired,
    poster_src: PropTypes.string,
    budget: PropTypes.number.isRequired,
    revenue: PropTypes.number.isRequired,
    original_title: PropTypes.string.isRequired,
    vote_average: PropTypes.number.isRequired,
    overview: PropTypes.string,
    release_date: PropTypes.string.isRequired,
    production_countries: PropTypes.arrayOf(PropTypes.string).isRequired,
    runtime: PropTypes.number,
    genres: PropTypes.arrayOf(PropTypes.string).isRequired
  })
};

const StyledDetails = styled(Details)`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 1rem;
`;

export default StyledDetails;
