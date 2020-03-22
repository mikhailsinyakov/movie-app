import styled from "styled-components";

export default Component => {
  return styled(Component)`
    max-width: 330px;
    background-color: rgba(226, 243, 187, 0.7);
    padding: 1rem;
    margin: 1rem;
    border-radius: 0.5rem;

    @media screen and (min-width: 600px) {
      & {
        width: 250px;
        margin-top: 0;
        margin-left: 2rem;
        margin-right: 2rem;
        padding-left: 2rem;
        padding-right: 2rem;
      }
    }

    @media screen and (min-width: 800px) {
      & {
        width: 600px;
      }
    }
  `;
};
