import cache from "../../../cache";

cache.set("movie", 15, "en", "some data");
cache.set("movies", "latest", "ru", { key: "value" });

it("should return true", () => {
  expect(cache.has("movie", 15, "en")).toBe(true);
  expect(cache.has("movies", "latest", "ru")).toBe(true);
});

it("should return false", () => {
  expect(cache.has("movie", 15, "ru")).toBe(false);
  expect(cache.has("movie", 12, "en")).toBe(false);
  expect(cache.has("movies", "popular", "ru")).toBe(false);
  expect(cache.has("movies", "latest", "en")).toBe(false);
});

it("should return null", () => {
  expect(cache.get("movie", 15, "ru")).toBeNull();
  expect(cache.get("movie", 12, "en")).toBeNull();
  expect(cache.get("movies", "popular", "ru")).toBeNull();
  expect(cache.get("movies", "latest", "en")).toBeNull();
});

it("should return data", () => {
  expect(cache.get("movie", 15, "en")).toBe("some data");
  expect(cache.get("movies", "latest", "ru").key).toBe("value");
});
