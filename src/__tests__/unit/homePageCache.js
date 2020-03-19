import * as cache from "homePageCache";

cache.set("en", "now-playing", "some data");

it("should return true", () => {
  expect(cache.has("en", "now-playing")).toBe(true);
});

it("should return false", () => {
  expect(cache.has("ru", "now-playing")).toBe(false);
  expect(cache.has("en", "popular")).toBe(false);
});

it("should return null", () => {
  expect(cache.get("ru", "now-playing")).toBeNull();
  expect(cache.has("en", "popular")).toBeNull;
});

it("should return data", () => {
  expect(cache.get("en", "now-playing")).toBe("some data");
});

it("should return false", () => {
  cache.clear();
  expect(cache.has("en", "now-playing")).toBe(false);
})
