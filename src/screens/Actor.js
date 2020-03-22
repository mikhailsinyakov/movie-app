import React, { Fragment } from "react";
import { useParams } from "react-router-dom";
import Header from "components/Header";
import ActorDetails from "components/ActorDetails";
import Footer from "components/Footer";

const Actor = () => {
  const { id } = useParams();
  return (
    <Fragment>
      <Header />
      <main>
        <ActorDetails id={+id} />
      </main>
      <Footer />
    </Fragment>
  );
};

export default Actor;
