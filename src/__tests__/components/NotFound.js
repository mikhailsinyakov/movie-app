import React from "react";
import { MemoryRouter as Router } from "react-router-dom";
import Renderer from "react-test-renderer";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import withLanguage from "components/Language";
import NotFound from "components/NotFound";

const Parent = ({ children }) => <div>{children}</div>;
const ParentWithLanguage = withLanguage(Parent);

describe("Snapshot", () => {
  let component;
  beforeEach(() => {
    component = Renderer.create(
      <Router>
        <ParentWithLanguage>
          <NotFound />
        </ParentWithLanguage>
      </Router>
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
    <Router>
      <ParentWithLanguage>
        <NotFound />
      </ParentWithLanguage>
    </Router>
  );

describe("NotFound", () => {
  it("renders page-not-found image and link", () => {
    const { getByText, getByAltText } = renderComponent();
    expect(getByAltText(/page-not-found/i)).toBeInTheDocument();
    expect(getByText(/go to the main page/i)).toBeInTheDocument();
  });
});
