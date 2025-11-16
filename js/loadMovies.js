import { Config } from "./config.js";
import { renderCards } from "./renderCards.js";

export async function loadMovies(page) {
  const res = await fetch(`${Config.API_HOST}/discover/movie?language=pt-BR&sort_by=primary_release_date.desc&page=${page}&include_adult=${Config.INCLUDE_ADULT}`, {
    headers: {
      Authorization: `Bearer ${Config.TOKEN}`
    }
  }).then(res => res.json());

  const movies = res.results;

  const moviesContainer = document.querySelector(".movies-page-container");
  renderCards(moviesContainer, movies);
}