import React from "react";
import { create } from "react-test-renderer";
import { BrowserRouter as Router } from "react-router-dom";
import withLanguage from "../../components/Language";
import Header from "../../components/Header";

const Parent = ({ children }) => <div>{children}</div>;
const ParentWithLanguage = withLanguage(Parent);

let component, instance;
beforeAll(() => {
  component = create(
    <Router>
      <ParentWithLanguage>
        <Header />
      </ParentWithLanguage>
    </Router>
  );
  instance = component.root;
});

it("matches snapshot", () => {
  expect(component.toJSON()).toMatchSnapshot();
});

it("has two images", () => {
  const images = instance.findAllByType("img");
  expect(images).toHaveLength(2);
});

it("has a header text", () => {
  const headerText = instance.findByType("h1");
  expect(headerText).toBeTruthy();
});
