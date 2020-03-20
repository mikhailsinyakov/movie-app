import React, { Fragment } from "react";
import styled from "styled-components";
import Header from "components/Header";
import NotFound from "components/NotFound";
import Footer from "components/Footer";

const Main = styled.main`
  position: relative;
  flex-grow: 1;
`;

const NotFoundPage = () => (
  <Fragment>
    <Header />
    <Main>
      <NotFound />
    </Main>
    <Footer />
  </Fragment>
);

export default NotFoundPage;
