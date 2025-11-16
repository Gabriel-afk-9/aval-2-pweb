import { Config } from "./config.js";
import { renderCards } from "./renderCards.js";

export const LoadContent = {
  async loadMovies(page) {
    const res = await fetch(`${Config.API_HOST}/discover/movie?language=pt-BR&sort_by=primary_release_date.desc&page=${page}&include_adult=${Config.INCLUDE_ADULT}`, {
      headers: {
        Authorization: `Bearer ${Config.TOKEN}`
      }
    }).then(res => res.json());

    const movies = res.results;

    const moviesContainer = document.querySelector(".movies-page-container");
    renderCards(moviesContainer, movies);
  },

  async loadTvSeries(page) {
    const res = await fetch(`${Config.API_HOST}/discover/tv?language=pt-BR&sort_by=primary_release_date.desc&page=${page}&include_adult=${Config.INCLUDE_ADULT}`, {
      headers: {
        Authorization: `Bearer ${Config.TOKEN}`
      }
    }).then(res => res.json());

    const tvSeries = res.results;

    const tvSeriesContainer = document.querySelector(".tv-series-page-container");
    renderCards(tvSeriesContainer, tvSeries);
  },
}