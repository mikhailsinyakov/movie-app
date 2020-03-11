import React from "react";
import Renderer from "react-test-renderer";
import { MemoryRouter as Router, Route } from "react-router-dom";
import {
  fireEvent,
  render,
  wait,
  waitForElementToBeRemoved,
  waitForDomChange
} from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import withLanguage from "../../components/Language";
import App from "components/App";

const Parent = ({ children }) => <div>{children}</div>;
const ParentWithLanguage = withLanguage(Parent);

describe("Snapshot", () => {
  let component;
  beforeEach(() => {
    component = Renderer.create(
      <Router>
        <ParentWithLanguage>
          <App />
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
        <App />
      </ParentWithLanguage>
    </Router>
  );

describe("Home page", () => {
  let component;
  beforeEach(() => (component = renderComponent()));
  afterEach(() => component.unmount());

  it("renders 20 images and 'More' button after a while", async () => {
    const { container, getByText } = component;
    await waitForDomChange({ container });
    expect(container.querySelectorAll("main img").length).toBe(20);
    expect(getByText(/more/i)).toBeInTheDocument();
  });

  it("renders 40 images after clicking 'More' button", async () => {
    const { container, getByText, queryByText } = component;
    if (!queryByText(/more/i)) await waitForDomChange({ container });
    fireEvent.click(getByText(/more/i));
    await waitForDomChange({ container });
    expect(container.querySelectorAll("main img").length).toBe(40);
  });

  it("renders no 'More' button when has downloaded all movies", async () => {
    const { container, queryByText } = component;
    let moreButton;
    if (!queryByText(/more/i)) await waitForDomChange({ container });
    moreButton = queryByText(/more/i);
    while (moreButton) {
      fireEvent.click(moreButton);
      await waitForDomChange({ container });
      moreButton = queryByText(/more/i);
    }
    expect(moreButton).toBeNull();
  });
});

describe("Movie page", () => {
  let component;
  beforeEach(() => (component = renderComponent()));
  afterEach(() => component.unmount());

  it("renders movie details page when clicking on poster", async () => {
    const { container, getByAltText, queryByAltText } = component;
    const firstPoster = container.querySelector("main img");
    const movieTitle = firstPoster.alt;
    fireEvent.click(firstPoster);
    expect(queryByAltText(movieTitle)).toBeNull();
    await wait(() => expect(getByAltText(movieTitle)));
    expect(getByAltText(movieTitle)).toBeInTheDocument();
  });
});
