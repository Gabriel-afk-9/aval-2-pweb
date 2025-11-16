import { Genres } from "./genres.js";
import { GenreImages } from "./genreImages.js";
import { LoadContent } from "./loadContent.js";

export function renderCategories() {
  const container = document.querySelector(".categories-container");

  const movieGenres = Object.keys(Genres.movies);
  
  movieGenres.forEach(genre => {
    const item = document.createElement("genre-card");
    const name = document.createElement("h2");

    name.classList.add("genre-name");
    name.textContent = genre.replaceAll("_", " ");
    const attrValue = genre.replaceAll("_", "-");

    item.style.backgroundImage = `url(${GenreImages[genre]})`;
    item.setAttribute("genre-name", attrValue);
    item.appendChild(name);

    item.addEventListener("click", (e) => {
      const element = e.currentTarget;

      const genreFromAttr = element.getAttribute("genre-name");

      const homePage = document.querySelector("home-page");
      const categoryPage = document.querySelector("movies-by-category-page");

      categoryPage.setAttribute("genre-name", genreFromAttr);

      LoadContent.loadMoviesByCategory(genreFromAttr, 1);

      homePage.style.display = "none";
      categoryPage.style.display = "flex";
    });

    container.appendChild(item);
  })
}