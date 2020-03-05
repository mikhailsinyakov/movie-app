import React from "react";
import Renderer from "react-test-renderer";
import {
  fireEvent,
  render,
  wait,
  waitForElementToBeRemoved
} from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import withLanguage from "../../components/Language";
import App from "../../components/App";

const Parent = ({ children }) => <div>{children}</div>;
const ParentWithLanguage = withLanguage(Parent);

describe("Snapshot", () => {
  let component;
  beforeEach(() => {
    component = Renderer.create(
      <ParentWithLanguage>
        <App />
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
      <App />
    </ParentWithLanguage>
  );

describe("Home page", () => {
  it("renders 'Loading...' text", () => {
    const { getByText } = renderComponent();
    expect(getByText(/loading/i)).toBeInTheDocument();
  });

  it("renders 20 images and 'More' button after a while", async () => {
    const { container, getByText } = renderComponent();
    await waitForElementToBeRemoved(() => getByText(/loading/i));
    expect(container.querySelectorAll("main img").length).toBe(20);
    expect(getByText(/more/i)).toBeInTheDocument();
  });

  it("renders 40 images after clicking 'More' button", async () => {
    const { container, getByText } = renderComponent();
    await waitForElementToBeRemoved(() => getByText(/loading/i));
    fireEvent.click(getByText(/more/i));
    await wait(() => expect(getByText(/loading/i)));
    await waitForElementToBeRemoved(() => getByText(/loading/i));
    expect(container.querySelectorAll("main img").length).toBe(40);
  });

  it("renders no 'More' button when has downloaded all movies", async () => {
    const { getByText, queryByText } = renderComponent();
    let moreButton;
    await waitForElementToBeRemoved(() => getByText(/loading/i));
    moreButton = queryByText(/more/i);
    while (moreButton) {
      fireEvent.click(moreButton);
      await wait(() => expect(getByText(/loading/i)));
      await waitForElementToBeRemoved(() => getByText(/loading/i));
      moreButton = queryByText(/more/i);
    }
    expect(moreButton).toBeNull();
  });
});
