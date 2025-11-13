import { getSearch } from "./search";

let local = "home";

document.addEventListener("DOMContentLoaded", () => {
  const search = document.getElementById("search");

  search.addEventListener("input", async (event) => {
    const result = await getSearch(event, local);
    print(result);
  })
})