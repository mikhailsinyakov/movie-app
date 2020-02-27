import React from "react";
import { create } from "react-test-renderer";
import { BrowserRouter as Router } from "react-router-dom";
import withLanguage from "../../components/Language";
import Footer from "../../components/Footer";

const Parent = ({ children }) => <div>{children}</div>;
const ParentWithLanguage = withLanguage(Parent);

let component, instance;
beforeAll(() => {
  component = create(
    <Router>
      <ParentWithLanguage>
        <Footer />
      </ParentWithLanguage>
    </Router>
  );
  instance = component.root;
});

it("matches snapshot", () => {
  expect(component.toJSON()).toMatchSnapshot();
});

it("has link and text", () => {
  const link = instance.findByType("a");
  const text = instance.findByType("span");
  expect(link).toBeTruthy();
  expect(text).toBeTruthy();
});
