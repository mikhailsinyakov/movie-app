import React from "react";
import Renderer from "react-test-renderer";
import { render, getByText } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import withLanguage from "../../components/Language";
import Details from "../../components/MovieDetails/Details";

const Parent = ({ children }) => <div>{children}</div>;
const ParentWithLanguage = withLanguage(Parent);

const details = {
  budget: 1500,
  genres: ["Fantasy"],
  original_title: "Dragonheart: Vengeance original",
  overview:
    "Lukas, a young farmer whose family is killed by savage raiders in the countryside, sets out on an epic quest for revenge, forming an unlikely trio with a majestic dragon and a swashbuckling, sword-fighting mercenary, Darius.",
  poster_src: "https://image.tmdb.org/t/p/w342/qZ1KAgfdeNbzrNYKW4BIRHdEBJ9.jpg",
  production_countries: ["United States of America"],
  release_date: "2020-02-04",
  revenue: 1000,
  runtime: 97,
  title: "Dragonheart: Vengeance",
  vote_average: 6
};

describe("Snapshot", () => {
  let component;
  beforeEach(() => {
    component = Renderer.create(
      <ParentWithLanguage>
        <Details details={details} />
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
      <Details details={details} />
    </ParentWithLanguage>
  );

describe("Details", () => {
  it("renders an image", () => {
    const { getByAltText } = renderComponent();
    expect(getByAltText(details.title)).toBeInTheDocument();
  });

  it("renders title", () => {
    const { getByText } = renderComponent();
    expect(getByText(new RegExp(details.title))).toBeInTheDocument();
    expect(getByText(new RegExp(details.original_title))).toBeInTheDocument();
  });

  it("renders overview", () => {
    const { getByText } = renderComponent();
    expect(getByText(details.overview)).toBeInTheDocument();
  });

  it("renders release year", () => {
    const { getByText } = renderComponent();
    const release_year = details.release_date.split("-")[0];
    expect(getByText(new RegExp(release_year))).toBeInTheDocument();
  });

  it("renders rating", () => {
    const { getByText } = renderComponent();
    expect(getByText(details.vote_average.toFixed(1))).toBeInTheDocument();
  });

  it("renders production country", () => {
    const { getByText } = renderComponent();
    expect(
      getByText(new RegExp(details.production_countries[0]))
    ).toBeInTheDocument();
  });

  it("renders runtime", () => {
    const { getByText } = renderComponent();
    const runtime =
      Math.floor(details.runtime / 60) + ":" + (details.runtime % 60);
    expect(getByText(new RegExp(runtime))).toBeInTheDocument();
  });

  it("renders budget", () => {
    const { getByText } = renderComponent();
    expect(getByText(new RegExp(details.budget))).toBeInTheDocument();
  });

  it("renders revenue", () => {
    const { getByText } = renderComponent();
    expect(getByText(new RegExp(details.revenue))).toBeInTheDocument();
  });
});
