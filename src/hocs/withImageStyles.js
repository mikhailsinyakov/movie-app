import styled from "styled-components";

export default Component => {
  return styled(Component)`
    align-self: flex-start;
    border-bottom-left-radius: 1rem;
    border-bottom-right-radius: 1rem;
    width: 150px;
    will-change: transform;
    transition: transform 2s;
    
    @media screen and (min-height: 400px) {
      width: 200px;
    }
    
    @media screen and (min-width: 700px) and (min-height: 500px) {
      width: 250px;
    }
  `;
};
