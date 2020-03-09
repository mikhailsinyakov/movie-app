import React from "react";
import Renderer from "react-test-renderer";
import { MemoryRouter as Router } from "react-router-dom";
import { fireEvent, render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import withLanguage from "../../components/Language";
import MoviesList from "../../components/MoviesList";

const Parent = ({ children }) => <div>{children}</div>;
const ParentWithLanguage = withLanguage(Parent);

let moviesData = {
  list: [
    {
      title: "Fight club",
      id: 555,
      poster_src: "poster.jpg",
      vote_average: 8.9,
      genres: ["Action", "Drama"]
    },
    {
      title: "Amiley",
      id: 123,
      poster_src: "poster2.jpg",
      vote_average: 7.5,
      genres: ["Drama"]
    },
    {
      title: "Armageddon",
      id: 588,
      poster_src: "poster3.jpg",
      vote_average: 8.4,
      genres: ["Action"]
    }
  ],
  loading: false,
  completed: false
};
const getMoreMovies = jest.fn();

it("matches snapshot", () => {
  const component = Renderer.create(
    <Router>
      <ParentWithLanguage>
        <MoviesList moviesData={moviesData} getMoreMovies={getMoreMovies} />
      </ParentWithLanguage>
    </Router>
  );
  expect(component.toJSON()).toMatchSnapshot();
});

const renderComponent = moviesData =>
  render(
    <Router>
      <ParentWithLanguage>
        <MoviesList moviesData={moviesData} getMoreMovies={getMoreMovies} />
      </ParentWithLanguage>
    </Router>
  );

describe("with loading = false and completed = false", () => {
  it("renders an element with 'More' text", () => {
    const { getByText } = renderComponent(moviesData);
    expect(getByText("More")).toBeInTheDocument();
  });

  it("renders no element with 'Loading' text", () => {
    const { queryByText } = renderComponent(moviesData);
    expect(queryByText("Loading...")).toBeNull();
  });

  it("renders 3 images", () => {
    const { container } = renderComponent(moviesData);
    expect(container.getElementsByTagName("img")).toHaveLength(3);
  });

  it("renders first movie image, title, rating, and genres", () => {
    const { getByText, getAllByText, getByAltText } = renderComponent(
      moviesData
    );
    const movieInfo = moviesData.list[0];
    expect(getByAltText(movieInfo.title)).toBeInTheDocument();
    expect(getByText(movieInfo.title)).toBeInTheDocument();
    expect(getByText(movieInfo.vote_average.toString())).toBeInTheDocument();
    expect(getAllByText(movieInfo.genres[0])).toBeTruthy();
  });

  it("calls getMoreMovies function when click 'More' button", () => {
    const { getByText } = renderComponent(moviesData);
    fireEvent.click(getByText("More"));
    expect(getMoreMovies).toHaveBeenCalled();
  });
});

describe("with loading = true and completed = false", () => {
  beforeAll(() => {
    moviesData.loading = true;
    moviesData.completed = false;
  });

  it("renders 'Loading...' text", () => {
    const { getByText } = renderComponent(moviesData);
    expect(getByText("Loading...")).toBeInTheDocument();
  });

  it("renders no button with 'More' text", () => {
    const { queryByText } = renderComponent(moviesData);
    expect(queryByText("More")).toBeNull();
  });
});

describe("with loading = false and completed = true", () => {
  beforeAll(() => {
    moviesData.loading = false;
    moviesData.completed = true;
  });

  it("renders no element with 'Loading...' text", () => {
    const { queryByText } = renderComponent(moviesData);
    expect(queryByText("Loading...")).toBeNull();
  });

  it("renders no button with 'More' text", () => {
    const { queryByText } = renderComponent(moviesData);
    expect(queryByText("More")).toBeNull();
  });
});
