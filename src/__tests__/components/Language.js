import React from "react";
import { act, create } from "react-test-renderer";
import withLanguage, { withLanguageContext } from "../../components/Language";

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

let component, instance;
beforeAll(() => {
  component = create(<RootWithLanguage />);
  instance = component.root;
});

it("matches snapshot", () => {
  expect(component.toJSON()).toMatchSnapshot();
});

it("Child component has language and setLanguage props", () => {
  expect(instance.findByType(ChildComponent).props).toHaveProperty("language");

  expect(instance.findByType(ChildComponent).props).toHaveProperty(
    "setLanguage"
  );
});

it("language should be 'ru' after calling setLanguage('ru')", () => {
  act(() => instance.findByType(ChildComponent).props.setLanguage("ru"));
  expect(instance.findByType(ChildComponent).props.language).toBe("ru");
  expect(localStorage.getItem("language")).toBe("ru");
});

it("language should be 'en' after calling setLanguage('en')", () => {
  act(() => instance.findByType(ChildComponent).props.setLanguage("en"));
  expect(instance.findByType(ChildComponent).props.language).toBe("en");
  expect(localStorage.getItem("language")).toBe("en");
});
