
export const Format = {
  search(search) {
    if (typeof search === "string") {
      const newSearch = search.trim().replace(" ", "+");
      return newSearch;
    };
    return;
  }
}