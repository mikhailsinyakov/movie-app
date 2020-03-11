import React from "react";
import { create } from "react-test-renderer";
import { BrowserRouter as Router } from "react-router-dom";
import withLanguage from "components/Language";
import Footer from "components/Footer";

const Parent = ({ children }) => <div>{children}</div>;
const ParentWithLanguage = withLanguage(Parent);

const renderComponent = () => {
  const component = create(
    <Router>
      <ParentWithLanguage>
        <Footer />
      </ParentWithLanguage>
    </Router>
  );
  return { component, instance: component.root };
};

it("matches snapshot", () => {
  const { component } = renderComponent();
  expect(component.toJSON()).toMatchSnapshot();
});

it("has text", () => {
  const { instance } = renderComponent();
  const text = instance.findByType("span");
  expect(text).toBeTruthy();
});
