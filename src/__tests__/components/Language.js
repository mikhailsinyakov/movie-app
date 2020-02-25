import React from "react";
import Renderer from "react-test-renderer";
import withLanguage, { withLanguageContext } from "../../components/Language";

const { act } = Renderer;

const ChildComponent = () => {
  return <div className="child"></div>;
};

const ChildWithContext = withLanguageContext(ChildComponent);

const RootComponent = () => {
  return (
    <div className="root">
      <ChildWithContext />
    </div>
  );
};

const RootWithLanguage = withLanguage(RootComponent);
const testRenderer = Renderer.create(<RootWithLanguage />);
const testInstance = testRenderer.root;

it("matches snapshot", () => {
  expect(testRenderer.toJSON()).toMatchSnapshot();
});

it("Child component has language and setLanguage props", () => {
  expect(testInstance.findByType(ChildComponent).props).toHaveProperty(
    "language"
  );

  expect(testInstance.findByType(ChildComponent).props).toHaveProperty(
    "setLanguage"
  );
});

it("language should be 'ru' after calling setLanguage('ru')", () => {
  act(() => testInstance.findByType(ChildComponent).props.setLanguage("ru"));
  expect(testInstance.findByType(ChildComponent).props.language).toBe("ru");
  expect(localStorage.getItem("language")).toBe("ru");
});

it("language should be 'en' after calling setLanguage('en')", () => {
  act(() => testInstance.findByType(ChildComponent).props.setLanguage("en"));
  expect(testInstance.findByType(ChildComponent).props.language).toBe("en");
  expect(localStorage.getItem("language")).toBe("en");
});
