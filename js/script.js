import { renderCards } from "./renderCards.js";
import { getSearch } from "./search.js";
import "../pages/home.js";
import "../pages/search.js";
import "../components/card.js";

let local = "home";

document.addEventListener("DOMContentLoaded", () => {
  const search = document.getElementById("search");

  const homePage = document.querySelector("home-page");
  const moviesPage = document.querySelector("movies-page");
  const tvSeriesPage = document.querySelector("tvSeries-page");
  const searchPage = document.querySelector("search-page");

  searchPage.style.display = "none";

  search.addEventListener("input", async (e) => {
    const value = e.target.value.trim();

    const isEmpty = value === "";
    homePage.style.display = isEmpty ? "flex" : "none";
    searchPage.style.display = isEmpty ? "none" : "flex";

    if (isEmpty) return;

    const result = await getSearch(value, local);

    const container = document.querySelector(".search-page .cards-container");

    renderCards(container, result.results);
  })
})