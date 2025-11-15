import { Genres } from "./genres.js";
import { GenreImages } from "./genreImages.js";

export function renderCategories() {
  const container = document.querySelector(".categories-container");

  const movieGenres = Object.keys(Genres.movies);
  
  movieGenres.forEach(genre => {
    const item = document.createElement("genre-card");
    const name = document.createElement("h2");

    name.classList.add("genre-name");
    name.textContent = genre.replaceAll("_", " ");

    item.style.backgroundImage = `url(${GenreImages[genre]})`;
    item.appendChild(name);

    container.appendChild(item);
  })
}