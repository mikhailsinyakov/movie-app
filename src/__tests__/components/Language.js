import React, { useContext } from "react";
import { act, create } from "react-test-renderer";
import withLanguage, { LanguageContext } from "components/Language";

const ChildComponent = () => {
  const { language, setLanguage } = useContext(LanguageContext);
  return <div className="child"></div>;
};

const ChildWithContext = () => {
  const { language, setLanguage } = useContext(LanguageContext);
  return <ChildComponent language={language} setLanguage={setLanguage} />;
};

const RootComponent = () => {
  return (
    <div className="root">
      <ChildWithContext />S
    </div>
  );
};

const RootWithLanguage = withLanguage(RootComponent);

const renderComponent = () => {
  const component = create(<RootWithLanguage />);
  return { component, instance: component.root };
};

it("matches snapshot", () => {
  const { component } = renderComponent();
  expect(component.toJSON()).toMatchSnapshot();
});

it("language should be 'ru' after calling setLanguage('ru')", () => {
  const { instance } = renderComponent();
  act(() => instance.findByType(ChildComponent).props.setLanguage("ru"));
  expect(instance.findByType(ChildComponent).props.language).toBe("ru");
  expect(localStorage.getItem("language")).toBe("ru");
});

it("language should be 'en' after calling setLanguage('en')", () => {
  const { instance } = renderComponent();
  act(() => instance.findByType(ChildComponent).props.setLanguage("en"));
  expect(instance.findByType(ChildComponent).props.language).toBe("en");
  expect(localStorage.getItem("language")).toBe("en");
});
