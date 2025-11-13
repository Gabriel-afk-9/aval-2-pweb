
export const Format = {
  search(search) {
    if (typeof search === "string") {
      const newSearch = search.trim().replace(/\s+/g, "+");
      return newSearch;
    };
    return;
  }
}