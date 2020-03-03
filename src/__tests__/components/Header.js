import React from "react";
import { create } from "react-test-renderer";
import { BrowserRouter as Router } from "react-router-dom";
import withLanguage from "../../components/Language";
import Header from "../../components/Header";

const Parent = ({ children }) => <div>{children}</div>;
const ParentWithLanguage = withLanguage(Parent);

const renderComponent = () => {
  const component = create(
    <Router>
      <ParentWithLanguage>
        <Header />
      </ParentWithLanguage>
    </Router>
  );
  return { component, instance: component.root };
};

it("matches snapshot", () => {
  const { component } = renderComponent();
  expect(component.toJSON()).toMatchSnapshot();
});

it("has two images", () => {
  const { instance } = renderComponent();
  const images = instance.findAllByType("img");
  expect(images).toHaveLength(2);
});

it("has a header text", () => {
  const { instance } = renderComponent();
  const headerText = instance.findByType("h1");
  expect(headerText).toBeTruthy();
});
