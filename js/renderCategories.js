import { Genres } from "./genres.js";
import { GenreImages } from "./genreImages.js";
import { loadMoviesByCategory } from "./loadMoviesByCategory.js";

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
      loadMoviesByCategory(genreFromAttr);
    })

    container.appendChild(item);
  })
}