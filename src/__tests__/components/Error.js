import React from "react";
import Renderer from "react-test-renderer";
import { render, getByAltText } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import withLanguage from "components/Language";
import Error from "components/Error";

const Parent = ({ children }) => <div>{children}</div>;
const ParentWithLanguage = withLanguage(Parent);

describe("Snapshot", () => {
  let component;
  beforeEach(() => {
    component = Renderer.create(
      <ParentWithLanguage>
        <Error />
      </ParentWithLanguage>
    );
  });
  afterEach(() => {
    component.unmount();
  });
  it("matches snapshot", () => {
    expect(component.toJSON()).toMatchSnapshot();
  });
});

const renderComponent = () =>
  render(
    <ParentWithLanguage>
      <Error />
    </ParentWithLanguage>
  );

describe("Error", () => {
  it("renders error message and error image", () => {
    const { getByText, getByAltText } = renderComponent();
    expect(getByText(/oops/i)).toBeInTheDocument();
    expect(getByText(/something went wrong/i)).toBeInTheDocument();
    expect(getByText(/failed to fetch data/i)).toBeInTheDocument();
    expect(getByText(/try to come to the site later/i)).toBeInTheDocument();
    expect(getByAltText(/error/i)).toBeInTheDocument();
  });
});
