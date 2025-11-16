import "../pages/home.js";
import "../pages/moviesByCategory.js";
import { Config } from "./config.js";
import { Genres } from "./genres.js";
import { renderCards } from "./renderCards.js";

export async function loadMoviesByCategory(categoryName) {
  async function getMovies() {
    const res = await fetch(`${Config.API_HOST}/discover/movie?with_genres=${Genres.movies[categoryName]}&language=pt-BR&page=1`, {
      headers: {
        Authorization: `Bearer ${Config.TOKEN}`,
        "Content-Type": "application/json"
      }
    }).then(res => res.json());

    return res;
  }

  const movies = await getMovies();

  const homePage = document.querySelector("home-page");
  const moviesCategoryPage = document.querySelector("movies-by-category");
  
  const title = document.querySelector(".category-title");
  title.textContent = `${categoryName} movies`

  const moviesContainer = document.querySelector(".movies-container");

  renderCards(moviesContainer, movies.results);

  homePage.style.display = "none";
  moviesCategoryPage.style.display = "flex";
  document.getElementById('global-back-button').style.display = 'inline-flex';

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}