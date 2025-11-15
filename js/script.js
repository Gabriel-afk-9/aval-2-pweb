import { renderCards } from "./renderCards.js";
import { getSearch } from "./search.js";
import { getSearchId } from "./searchById.js";
import { renderICardsDetails } from "./renderICardsDetails.js";
import "../pages/home.js";
import "../pages/search.js";
import "../pages/moviesByCategory.js";
import "../components/card.js";
import "../components/loadingSpinner.js";
import { LoadPopular } from "./loadPopular.js";
import { renderCategories } from "./renderCategories.js";
import { loadMoviesByCategory } from "./loadMoviesByCategory.js";

let local = "home";

document.addEventListener("DOMContentLoaded", () => {
  const loadingSpinner = document.querySelector("loading-spinner");
  loadingSpinner.style.display = "none";
  
  const searchPage = document.querySelector("search-page");
  searchPage.style.display = "none";

  const moviesByCategory = document.querySelector("movies-by-category");
  moviesByCategory.style.display = "none";
  
  const homePage = document.querySelector("home-page");
  
  const search = document.getElementById("search");
  search.addEventListener("input", async (e) => {
    const value = e.target.value.trim();

    const isEmpty = value === "";
    homePage.style.display = isEmpty ? "flex" : "none";
    searchPage.style.display = isEmpty ? "none" : "flex";
    moviesByCategory.style.display = "none";

    if (isEmpty) return;

    const result = await getSearch(value, local);

    const container = document.querySelector(".search-page .cards-details-container");

    renderCards(container, result.results);

    container.childNodes.forEach(element => {
      element.addEventListener('click', async () => {
        const id = element.getAttribute('id')
        const media_type = element.getAttribute('media_type')
        const data = await getSearchId(id, media_type)
        const searchPage = document.querySelector("search-page");
        const container = document.querySelector(".search-page .cards-details-container");
        
        renderICardsDetails(container, data)
        searchPage.style.display = "flex"
        console.log(data)
      })
    })
  });

  LoadPopular.movies();

})

customElements.whenDefined("home-page").then(() => {
  renderCategories();
});
